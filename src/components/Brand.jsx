import { Link } from 'react-router-dom'

export default function Brand({ light = false }) {
  return (
    <Link to="/" className={`brand ${light ? 'brand-light' : ''}`} aria-label="TokoRupa beranda">
      <img src="/logo-bird.png" alt="" width="256" height="256" />
      <span>TokoRupa</span>
    </Link>
  )
}
