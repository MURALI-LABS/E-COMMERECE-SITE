import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from "../hooks/useCart";
import './ProductPage.css'

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <p className="loading">Loading product...</p>
  }

  if (!product) {
    return <p className="loading">Product not found.</p>
  }

  return (
    <div className="product-page">
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="product-detail">
        <div className="product-detail__image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product-detail__info">
          <h1>{product.title}</h1>

          <div className="product-detail__rating">
            ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
          </div>

          <p className="product-detail__price">
            ₹{product.price}
          </p>

          <p className="product-detail__category">
            Category: {product.category}
          </p>

          <p className="product-detail__description">
            {product.description}
          </p>

          <button
            className="add-cart-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}