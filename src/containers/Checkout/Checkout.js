import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from 'react-redux'
class Checkout extends Component {


  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };
  continueCheckoutHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let summary = (<Redirect to="/" />)
    if (this.props.ingredients) {

      summary = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            continueBtnClicked={this.continueCheckoutHandler}
            cancelBtnClicked={this.cancelCheckoutHandler} />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData} />
        </div>
      )
    }
    return summary
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ing.ingredients,
  }
}

export default connect(mapStateToProps, null)(Checkout)