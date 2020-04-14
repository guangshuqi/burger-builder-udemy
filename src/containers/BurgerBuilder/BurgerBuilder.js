import React, { Component } from "react";
import {connect} from 'react-redux';
import Aux from "../../hoc/Auxilliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders'
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
// import * as actionType from '../../store/actions/actionTypes'
import * as burgerBuilderActions from '../../store/actions/index'


class BurgerBuilder extends Component {
  // constructor(){
  //   super();
  //   this.state
  // }
  state = {
    purchaseable: false,
    purchasing: false,

  };
  componentDidMount() {
    // axios
    //   .get("https://react-burger-project-1767f.firebaseio.com/ingredients.json")
    //   .then(response => {
    //     this.props.onSetInitialIngredients(response.data);
    //   })
    //   .catch(err => this.setState({ error: true }));
    this.props.onSetInitialIngredients()
  }
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  
  purhaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {

    this.props.history.push({
      pathname: "/checkout",
    });
  };

  render() {

    

    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingredients && !this.props.loading) {
      const totalIngredient = Object.values(this.props.ingredients).reduce((prev_val,current_val)=>(prev_val+current_val),0) 
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
    if (this.props.loading) {
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
    totalPrice: state.ing.totalPrice,
    error: state.ing.error,
    loading: state.ing.loading
  }
}
const mapDispatchToProps=dispatch=>{
  return {
    onAddIngredient: (ing)=>dispatch(burgerBuilderActions.addIngredient(ing)),
    onRemoveIngredient: (ing)=>dispatch(burgerBuilderActions.removeIngredient(ing)),
    onSetInitialIngredients: ()=>dispatch(burgerBuilderActions.setInitState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
