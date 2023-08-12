import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCartItemCount } from "../../store/cart";
import { toggleLiked } from "../../store/produce";
import { useState } from "react";

function ProduceDetails({ produce }) {
  const [count, setCount] = useState(produce.count);
  const cartItem = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (cartItem[produce.id]) {
      setCount(count + 1);
      dispatch(updateCartItemCount(produce.id, cartItem[produce.id].count + 1));
    } else {
      dispatch(addToCart(produce.id));
    }
  };

  const handleToggleLiked = () => {
    dispatch(toggleLiked(produce.id));
  };

  return (
    <li className="produce-details">
      <span>{produce.name}</span>
      <span>
        <button
          className={"like-button" + (produce.liked ? " selected" : "")}
          onClick={handleToggleLiked}
        >
          <i className={"fas fa-heart"} />
        </button>
        <button
          className={"plus-button" + (cartItem[produce.id] ? " selected" : "")}
          onClick={handleAddToCart}
        >
          <i className="fas fa-plus" />
        </button>
      </span>
    </li>
  );
}

export default ProduceDetails;
