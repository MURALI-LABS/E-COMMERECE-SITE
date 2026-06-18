import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from "../hooks/useCart";
import './Checkout.css'

export default function Checkout() {
  const navigate = useNavigate()
  const { grandTotal, emptyCart, isEmpty } = useCart()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    NAME: '', EMAIL: '', PHONE: '',
    ADDRESS: '', CITY: '', PINCODE: '',
    PAYMENT: 'cod'
  })

  if (isEmpty && !submitted) { navigate('/shop'); return null }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit() {
    if (!form.NAME || !form.EMAIL || !form.ADDRESS) {
      alert('Please fill all required fields.')
      return
    }
    emptyCart()
    setSubmitted(true)
  }

  if (submitted) return (
    <div className="checkout-success">
      <div className="checkout-success__icon">✅</div>
      <h2>Order Placed Successfully!</h2>
      <p>Thank you, {form.NAME}! Your order will be delivered to {form.CITY}.</p>
      <button className="btn btn--primary" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  )

  return (
    <div className="checkout">
      <h1>CHECKOUT</h1>
      <div className="checkout__layout">
        <div className="checkout__form">
          <h3>DELIVERY DETAILS</h3>
          <div className="form-group">
            <label>FULL NAME *</label>
            <input name="NAME" value={form.NAME} onChange={handleChange} placeholder="John Doe" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>EMAIL*</label>
              <input name="EMAIL" type="email" value={form.EMAIL} onChange={handleChange} placeholder="john@email.com" />
            </div>
            <div className="form-group">
              <label>PHONE</label>
              <input name="PHONE" value={form.PHONE} onChange={handleChange} placeholder="9876543210" />
            </div>
          </div>
          <div className="form-group">
            <label>ADDRESS *</label>
            <textarea name="ADDRESS" value={form.ADDRESS} onChange={handleChange} placeholder="Street, Area" rows={3} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>CITY</label>
              <input name="CITY" value={form.CITY} onChange={handleChange} placeholder="Chennai" />
            </div>
            <div className="form-group">
              <label>PINCODE</label>
              <input name="PINCODE" value={form.PINCODE} onChange={handleChange} placeholder="600001" />
            </div>
          </div>

          <h3 style={{ marginTop: 'var(--space-lg)' }}>PAYMENT METHOD</h3>
          <div className="payment-options">
            {[
              { value: 'cod',  label: '💵 CASH ON DELIVERY' },
              { value: 'upi',  label: '📱 UPI' },
              { value: 'card', label: '💳 CREDIT / DEBIT CARD' },
            ].map(opt => (
              <label key={opt.value} className={`payment-option ${form.PAYMENT === opt.value ? 'active' : ''}`}>
                <input type="radio" name="PAYMENT" value={opt.value}
                  checked={form.PAYMENT === opt.value} onChange={handleChange} />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        <div className="checkout__summary">
          <h3>ORDER TOTAL</h3>
          <p className="checkout__total">₹{grandTotal}</p>
          <button className="btn btn--primary" style={{ width: '100%' }} onClick={handleSubmit}>
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  )
}