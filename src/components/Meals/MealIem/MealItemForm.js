import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  const [isAmountValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const value = +enteredAmount;

    if (enteredAmount.trim().length === 0 || value < 1 || value > 5) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(value);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "4",
          step: "1",
          defaultValue: "1",
        }}
      />

      <button>+ Add</button>
      {!isAmountValid && <p>Please Enter a valid Amount</p>}
    </form>
  );
};

export default MealItemForm;
