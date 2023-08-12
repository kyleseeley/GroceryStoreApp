import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItemCount } from "../../store/cart";

function CartItem({ item }) {
  const [count, setCount] = useState(item.count);
  const dispatch = useDispatch();

  useEffect(() => {
    setCount(item.count);
  }, [item.count]);

  const handleIncrement = () => {
    setCount(count + 1);
    dispatch(updateCartItemCount(item.id, count + 1));
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
      dispatch(updateCartItemCount(item.id, count - 1));
    } else {
      dispatch(removeFromCart(item.id)); // Remove cart item when count reaches 0
    }
  };

  const handleCountChange = (event) => {
    const newCount = event.target.value;
    setCount(newCount);
  };

  const handleCountBlur = () => {
    const newCountInt = parseInt(count, 10);
    dispatch(updateCartItemCount(item.id, newCountInt));
  };

  const handleRemoveClick = () => {
    dispatch(removeFromCart(item.id)); // Dispatch the action to remove the item
  };

  useEffect(() => {
    setCount(item.count);
  }, [item.count]);

  return (
    <li className="cart-item">
      <div className="cart-item-header">{item.name}</div>
      <div className="cart-item-menu">
        <input
          type="number"
          value={count}
          onChange={handleCountChange}
          onBlur={handleCountBlur}
        ></input>
        <button className="cart-item-button" onClick={handleIncrement}>
          +
        </button>
        <button className="cart-item-button" onClick={handleDecrement}>
          -
        </button>
        <button className="cart-item-button" onClick={handleRemoveClick}>
          Remove
        </button>
      </div>
    </li>
  );
}

export default CartItem;
