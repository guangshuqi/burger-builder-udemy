import React from "react";
import Aux from "../../../hoc/Auxilliary/Auxiliary";
import Button from "../../../components/UI/Button/Button";

const orderSummary = props => {
  // useEffect(() => {
  //   console.log("Order Summary rendered");
  // });

  const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <div>
      <Aux>
        <h3>Your Order</h3>
        <p>A Delicious burger with the following ingredients: </p>
        <ul>{ingredientsSummary}</ul>
        <p>
          <strong>Total Price: {props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={props.purchaseContinued}>
          CONTINUE
        </Button>
      </Aux>
    </div>
  );
};

export default orderSummary;
