import CartItem from "./CartItem";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { emptyCart } from "../../store/cart";
import { selectCartItemsWithProduceInfo } from "../../store/cart";

function Cart() {
  const cartItems = useSelector(selectCartItemsWithProduceInfo);

  const dispatch = useDispatch();

  if (!cartItems || !cartItems.length)
    return (
      <div className="cart">
        No items in the cart. Start selecting items to purchase.
      </div>
    );

  const onSubmit = (e) => {
    e.preventDefault();
    window.alert(
      "Purchased the following:\n" +
        `${cartItems.map((item) => `${item.count} of ${item.name}`).join("\n")}`
    );

    // Empty the cart after purchase
    dispatch(emptyCart());
  };

  return (
    <div className="cart">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <hr />
      <form onSubmit={onSubmit}>
        <button type="submit">Purchase</button>
      </form>
    </div>
  );
}

export default Cart;
