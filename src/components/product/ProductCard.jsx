import { useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const {
  addToCart,
  removeFromCart,
  isInCart,
  incrementItem
} = useCart()
  const inCart = isInCart(product.id)

  return (
    <div className="product-card">
      <div
        className="product-card__image"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img src={product.image} alt={product.title} />
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">{product.title}</h3>

        <div className="product-card__rating">
          ⭐ {product.rating?.rate} ({product.rating?.count})
        </div>

        <div className="product-card__footer">
          <span className="product-card__price">₹{product.price}</span>

          {inCart ? (
  <>
    <button
      className="product-card__btn product-card__btn--added"
      onClick={() => incrementItem(product.id)}
    >
      + Add More
    </button>

    <button
      className="product-card__btn remove-btn"
      onClick={() => removeFromCart(product.id)}
    >
      Remove
    </button>
  </>
) : (
  <button
    className="product-card__btn"
    onClick={() => addToCart(product)}
  >
    Add to Cart
  </button>
)}
        </div>
      </div>
    </div>
  )
}