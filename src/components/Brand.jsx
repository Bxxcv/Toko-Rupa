import { Link } from 'react-router-dom'

export default function Brand({ light = false }) {
  return (
    <Link to="/" className={`brand ${light ? 'brand-light' : ''}`} aria-label="TokoRupa beranda">
      <img src="/logo-mark.svg" alt="" />
      <span>TokoRupa</span>
    </Link>
  )
}
