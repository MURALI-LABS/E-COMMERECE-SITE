import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard'
import './Shop.css'

export default function Shop() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState('')
  const [sortBy, setSortBy]     = useState('default')
  const [searchParams]          = useSearchParams()
  const category                = searchParams.get('category')

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false) })
  }, [])

  useEffect(() => {
    let result = [...products]
    if (category)
      result = result.filter(p => p.category.toLowerCase().includes(category.toLowerCase()))
    if (search)
      result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    if (sortBy === 'price-asc')  result.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price)
    if (sortBy === 'rating')     result.sort((a, b) => b.rating.rate - a.rating.rate)
    setFiltered(result)
  }, [products, search, sortBy, category])

  if (loading) return <p className="loading">Loading products...</p>

  return (
    <div className="shop">
      <div className="shop__filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="shop__search"
        />
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
        <span className="shop__count">{filtered.length} products</span>
      </div>

      {filtered.length === 0 ? (
        <p className="shop__empty">No products found.</p>
      ) : (
        <div className="shop__grid">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}