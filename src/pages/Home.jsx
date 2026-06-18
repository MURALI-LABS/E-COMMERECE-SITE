import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__content">
          <h1>FRESH ARRIVALS,<br />Big Deals</h1>
          <p>Shop the latest collection with free shipping over ₹500</p>
          <button className="btn btn--primary" onClick={() => navigate('/shop')}>
            Shop Now
          </button>
        </div>
      </section>

      <section className="categories">
        <h2>SHOP BY CATEGORIES</h2>
        <div className="categories__grid">
          {[ 'ELECTRONICS',"MEN'S FASHION", "WOMEN'S FASHION" ].map(cat => (
            <div
              key={cat}
              className="category-card"
              onClick={() => navigate(`/shop?category=${cat.toLowerCase()}`)}
            >
              <span>{cat}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
