import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Enjoy your order!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={props.cancelBtnClicked}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continueBtnClicked}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
