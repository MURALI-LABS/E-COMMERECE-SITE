import {
  addItem, removeItem, updateQuantity, clearCart,
  selectCartItems, selectCartTotal, selectCartCount,
} from '../store/cartSlice'
import { useDispatch, useSelector } from "react-redux";
export function useCart() {
  const dispatch = useDispatch()
  const items    = useSelector(selectCartItems)
  const total    = useSelector(selectCartTotal)
  const count    = useSelector(selectCartCount)

  function addToCart(product) { dispatch(addItem(product)) }

  function removeFromCart(productId) { dispatch(removeItem(productId)) }

  function changeQuantity(productId, quantity) {
    if (quantity < 1) dispatch(removeItem(productId))
    else dispatch(updateQuantity({ id: productId, quantity }))
  }

  function incrementItem(productId) {
    const item = items.find(i => i.id === productId)
    if (item) dispatch(updateQuantity({ id: productId, quantity: item.quantity + 1 }))
  }

  function decrementItem(productId) {
    const item = items.find(i => i.id === productId)
    if (!item) return
    if (item.quantity === 1) dispatch(removeItem(productId))
    else dispatch(updateQuantity({ id: productId, quantity: item.quantity - 1 }))
  }

  function isInCart(productId) { return items.some(i => i.id === productId) }

  function getItemQuantity(productId) {
    return items.find(i => i.id === productId)?.quantity ?? 0
  }

  function emptyCart() { dispatch(clearCart()) }

  const tax         = parseFloat((total * 0.18).toFixed(2))
  const shippingFee = total > 500 ? 0 : 49
  const grandTotal  = parseFloat((total + tax + shippingFee).toFixed(2))

  return {
    items, count, total, tax, shippingFee, grandTotal,
    isEmpty: items.length === 0,
    addToCart, removeFromCart, changeQuantity,
    incrementItem, decrementItem, isInCart, getItemQuantity, emptyCart,
  }
}