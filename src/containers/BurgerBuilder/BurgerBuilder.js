import React, { Component } from "react";
import {connect} from 'react-redux';
import Aux from "../../hoc/Auxilliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionType from '../../store/actionTypes'


class BurgerBuilder extends Component {
  // constructor(){
  //   super();
  //   this.state
  // }
  state = {
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };
  componentDidMount() {
    axios
      .get("https://react-burger-project-1767f.firebaseio.com/ingredients.json")
      .then(response => {
        this.props.onSetInitialIngredients(response.data);
      })
      .catch(err => this.setState({ error: true }));
  }
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((prevValue, currentValue) => prevValue + currentValue, 0);
    this.setState({ purchaseable: sum > 0 });
  }
  
  
  purhaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    
    this.setState({ loading: false, purchasing: false });
    const queryParams = [];
    for (let i in this.props.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.props.ingredients[i])
      );
    }
    queryParams.push("price=" + this.props.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  render() {

    const totalIngredient = Object.values(this.props.ingredients).reduce((prev_val,current_val)=>(prev_val+current_val),0) 

    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemoved={this.props.onRemoveIngredient}
            price={this.props.totalPrice}
            disabled={disabledInfo}
            purchaseable={totalIngredient===0 ? false: true}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCancelled={this.purhaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purhaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state =>{
  return {
    ingredients: state.ing.ingredients,
    totalPrice: state.ing.totalPrice

  }
}
const mapDispatchToProps=dispatch=>{
  return {
    onAddIngredient: (ing)=>dispatch({type: actionType.ADD_INGREDIENT, ingType:ing}),
    onRemoveIngredient: (ing)=>dispatch({type: actionType.REMOVE_INGREDIENT, ingType:ing}),
    onSetInitialIngredients: (ingredients)=>dispatch({type: actionType.SET_INITIAL_STATE, ingredients: ingredients}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
