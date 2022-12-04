import { useContext } from "react";
import CartContext from "../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const ctx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  const onAddToCart = (amount) => {
    const item = {
      id: props.id,
      name: props.name,
      amount: amount,
      price: price,
    };
    ctx.addItem(item);
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={onAddToCart}></MealItemForm>
      </div>
    </li>
  );
};

export default MealItem;
