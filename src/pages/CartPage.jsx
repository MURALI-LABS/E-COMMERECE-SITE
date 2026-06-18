import { useNavigate } from 'react-router-dom'
import { useCart } from "../hooks/useCart";
import './CartPage.css'

export default function CartPage() {
  const navigate = useNavigate()
  const {
    items, total, tax, shippingFee, grandTotal,
    incrementItem, decrementItem, removeFromCart, emptyCart, isEmpty
  } = useCart()

  if (isEmpty) return (
    <div className="cart-empty">
      <p>🛒 Your cart is empty.</p>
      <button className="btn btn--primary" onClick={() => navigate('/shop')}>
        Continue Shopping
      </button>
    </div>
  )

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-page__layout">
        <div className="cart-items">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div className="cart-item__info">
                <h4>{item.title}</h4>
                <span className="cart-item__price">₹{item.price}</span>
              </div>
              <div className="cart-item__qty">
                <button onClick={() => decrementItem(item.id)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => incrementItem(item.id)}>+</button>
              </div>
              <span className="cart-item__subtotal">
                ₹{(item.price * item.quantity).toFixed(2)}
              </span>
              <button className="cart-item__remove" onClick={() => removeFromCart(item.id)}>✕</button>
            </div>
          ))}
          <button className="cart-clear" onClick={emptyCart}>Clear Cart</button>
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="cart-summary__row"><span>Subtotal</span><span>₹{total.toFixed(2)}</span></div>
          <div className="cart-summary__row"><span>Tax (18%)</span><span>₹{tax}</span></div>
          <div className="cart-summary__row">
            <span>Shipping</span>
            <span>{shippingFee === 0 ? '🎉 Free' : `₹${shippingFee}`}</span>
          </div>
          <hr />
          <div className="cart-summary__row cart-summary__total">
            <span>Grand Total</span><span>₹{grandTotal}</span>
          </div>
          <button
            className="btn btn--primary"
            style={{ width: '100%', marginTop: 'var(--space-lg)' }}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
          <button className="cart-summary__continue" onClick={() => navigate('/shop')}>
            ← Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}