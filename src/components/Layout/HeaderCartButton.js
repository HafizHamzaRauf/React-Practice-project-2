import { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);
  console.log(ctx);
  const numberOfCartItems = ctx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  return (
    <button onClick={props.onClick} className={classes.button}>
      <span className={classes.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Cart</span>

      <span className={classes.badge}> {numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
