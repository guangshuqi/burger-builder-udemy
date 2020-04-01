import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

export default class Checkout extends Component {
  state = {
    ingredients: {
      salad: 3,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      // ['salad', '1]
      ingredients[param[0]] = parseInt(param[1]);
    }
    this.setState({
      ingredients: ingredients
    });
  }
  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };
  continueCheckoutHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        {console.log(this.state)}
        <CheckoutSummary
          ingredients={this.state.ingredients}
          continueBtnClicked={this.continueCheckoutHandler}
          cancelBtnClicked={this.cancelCheckoutHandler}
        />
      </div>
    );
  }
}
