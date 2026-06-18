import { useCart } from '../../hooks/useCart'
import './Navbar.css'
import { Link,useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate()
  const count = 0;

  return (
    <nav className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">✦ E CART </Link>
        <div className="navbar__links">
          <Link to="/">HOME</Link>
          <Link to="/shop">SHOP</Link>
        </div>
        <button className="navbar__cart" onClick={() => navigate('/cart')}>
          MY ORDERS
          {count > 0 && <span className="badge">{count}</span>}
        </button>
      </div>
    </nav>
  )
}