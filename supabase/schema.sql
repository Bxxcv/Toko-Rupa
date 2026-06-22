-- TokoRupa MVP schema. Jalankan sekali melalui Supabase SQL Editor.
create extension if not exists pgcrypto;

create type public.business_type as enum ('coffee', 'fashion', 'digital');
create type public.order_status as enum ('pending', 'confirmed', 'processing', 'completed', 'cancelled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

create table public.stores (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null check (char_length(name) between 2 and 80),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  business_type public.business_type not null,
  tagline text check (char_length(tagline) <= 160),
  whatsapp text,
  logo_url text,
  cover_url text,
  theme jsonb not null default '{"accent":"#0c5b45","template":"editorial"}'::jsonb,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  name text not null check (char_length(name) between 2 and 120),
  description text check (char_length(description) <= 1000),
  category text,
  price bigint not null check (price >= 0),
  stock integer check (stock is null or stock >= 0),
  image_url text,
  variants jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create sequence public.order_number_seq start 1001;

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete restrict,
  order_number text not null unique default ('TR-' || nextval('public.order_number_seq')),
  customer_name text not null,
  customer_phone text not null,
  customer_note text check (char_length(customer_note) <= 500),
  status public.order_status not null default 'pending',
  payment_method text not null default 'manual_qris',
  payment_proof_url text,
  subtotal bigint not null check (subtotal >= 0),
  total bigint not null check (total >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  unit_price bigint not null check (unit_price >= 0),
  quantity integer not null check (quantity between 1 and 100),
  selected_variant jsonb not null default '{}'::jsonb
);

create index products_store_id_idx on public.products(store_id);
create index orders_store_id_created_at_idx on public.orders(store_id, created_at desc);
create index order_items_order_id_idx on public.order_items(order_id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.owns_store(target_store uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.stores
    where id = target_store and owner_id = auth.uid()
  );
$$;

alter table public.profiles enable row level security;
alter table public.stores enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "profile read own" on public.profiles for select using (id = auth.uid());
create policy "profile update own" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

create policy "published stores are public" on public.stores for select using (is_published or owner_id = auth.uid());
create policy "owner creates store" on public.stores for insert with check (owner_id = auth.uid());
create policy "owner updates store" on public.stores for update using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "owner deletes store" on public.stores for delete using (owner_id = auth.uid());

create policy "active products are public" on public.products for select using (
  (is_active and exists (select 1 from public.stores s where s.id = store_id and s.is_published))
  or public.owns_store(store_id)
);
create policy "owner creates product" on public.products for insert with check (public.owns_store(store_id));
create policy "owner updates product" on public.products for update using (public.owns_store(store_id)) with check (public.owns_store(store_id));
create policy "owner deletes product" on public.products for delete using (public.owns_store(store_id));

create policy "owner reads orders" on public.orders for select using (public.owns_store(store_id));
create policy "owner updates orders" on public.orders for update using (public.owns_store(store_id)) with check (public.owns_store(store_id));
create policy "owner reads order items" on public.order_items for select using (
  exists (select 1 from public.orders o where o.id = order_id and public.owns_store(o.store_id))
);

-- Checkout publik memakai RPC ini. Harga selalu diambil dari database,
-- sehingga browser tidak dapat mengubah total pembayaran sendiri.
create or replace function public.create_public_order(
  target_store uuid,
  customer_name text,
  customer_phone text,
  customer_note text,
  items jsonb
)
returns table(order_id uuid, order_number text, total bigint)
language plpgsql security definer set search_path = '' as $$
declare
  new_order_id uuid;
  calculated_total bigint;
begin
  if char_length(trim(customer_name)) < 2 or char_length(trim(customer_phone)) < 8 then
    raise exception 'Data pelanggan tidak lengkap';
  end if;
  if jsonb_typeof(items) <> 'array' or jsonb_array_length(items) = 0 or jsonb_array_length(items) > 50 then
    raise exception 'Item pesanan tidak valid';
  end if;
  if not exists (select 1 from public.stores where id = target_store and is_published) then
    raise exception 'Toko tidak tersedia';
  end if;

  select sum(p.price * greatest(1, least(100, (item->>'quantity')::integer)))::bigint
  into calculated_total
  from jsonb_array_elements(items) item
  join public.products p on p.id = (item->>'product_id')::uuid
  where p.store_id = target_store and p.is_active;

  if calculated_total is null then raise exception 'Produk tidak valid'; end if;

  insert into public.orders (store_id, customer_name, customer_phone, customer_note, subtotal, total)
  values (target_store, trim(customer_name), trim(customer_phone), nullif(trim(customer_note), ''), calculated_total, calculated_total)
  returning id into new_order_id;

  insert into public.order_items (order_id, product_id, product_name, unit_price, quantity)
  select new_order_id, p.id, p.name, p.price, greatest(1, least(100, (item->>'quantity')::integer))
  from jsonb_array_elements(items) item
  join public.products p on p.id = (item->>'product_id')::uuid
  where p.store_id = target_store and p.is_active;

  return query select o.id, o.order_number, o.total from public.orders o where o.id = new_order_id;
end;
$$;

revoke all on function public.create_public_order(uuid, text, text, text, jsonb) from public;
grant execute on function public.create_public_order(uuid, text, text, text, jsonb) to anon, authenticated;
grant usage on schema public to anon, authenticated;

-- Storage bucket publik hanya untuk gambar toko/produk. Batasi ukuran/MIME juga
-- melalui Dashboard Supabase: image/jpeg, image/png, image/webp; maksimum 5 MB.
insert into storage.buckets (id, name, public) values ('store-assets', 'store-assets', true)
on conflict (id) do nothing;

create policy "public reads store assets" on storage.objects for select using (bucket_id = 'store-assets');
create policy "user uploads own store assets" on storage.objects for insert to authenticated
with check (bucket_id = 'store-assets' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "user updates own store assets" on storage.objects for update to authenticated
using (bucket_id = 'store-assets' and owner_id = auth.uid()::text)
with check (bucket_id = 'store-assets' and owner_id = auth.uid()::text);
create policy "user deletes own store assets" on storage.objects for delete to authenticated
using (bucket_id = 'store-assets' and owner_id = auth.uid()::text);
