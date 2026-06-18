import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../../store/cartSlice';

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <span>{item.name}</span>
      <input
        type="number"
        min="1"
        value={item.quantity}
        onChange={e => dispatch(updateQuantity({ id: item.id, quantity: +e.target.value }))}
      />
      <span>${(item.price * item.quantity).toFixed(2)}</span>
      <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
    </div>
  );
}