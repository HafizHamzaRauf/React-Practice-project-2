import { useReducer } from "react";
import CartContext from "./cart-context";
const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const itemPrice = +action.item.price.slice(1);
    const updatedAmount = state.totalAmount + itemPrice * action.item.amount;
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    if (existingItemIndex !== -1) {
      const updatedItems = [...state.items];
      updatedItems[existingItemIndex].amount += +action.item.amount;
      console.log(updatedItems);
      return { items: updatedItems, totalAmount: updatedAmount };
    } else {
      const updatedItems = state.items.concat(action.item);
      return { items: updatedItems, totalAmount: updatedAmount };
    }
  }
  if (action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    const price = +existingItem.price.slice(1);
    const updatedAmount = state.totalAmount - price;

    if (existingItem.amount === 1) {
      const updatedItems = state.items.filter((item) => item.id !== action.id);
      return { items: updatedItems, totalAmount: updatedAmount };
    } else {
      const updatedItems = [...state.items];
      updatedItems[existingItemIndex].amount -= 1;
      return { items: updatedItems, totalAmount: updatedAmount };
    }
  }

  return defaultCartState;
};
const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCart({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
