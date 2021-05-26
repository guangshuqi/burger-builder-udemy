import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import { purchaseBurger } from '../../../store/actions/index'
import { checkValidity } from '../../../shared/utility'
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Postal Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 7,
          maxLength: 7
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapeast' },
          ]

        },
        value: 'fastest',
        valid: true,
        validation: {},
        touched: false
      }
    },
    formIsValid: false,
  };
  orderHandler = event => {
    event.preventDefault();
    // this.setState({ loading: true });
    const formData = {}
    for (let formElementId in this.state.orderForm) {
      formData[formElementId] = this.state.orderForm[formElementId].value
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };
    this.props.onOrderBurger(order, this.props.token)
    // if (!this.props.purchasing) {
    //   this.props.history.push('/')
    // }
  };



  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputId]
    }
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true
    updatedOrderForm[inputId] = updatedFormElement

    let formIsValid = true;
    for (let inputId in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputId].valid && formIsValid
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
  }

  render() {
    let form = null;
    if (this.state.loading) {
      form = <Spinner />;
    } else {
      const formElementsArray = []
      for (let key in this.state.orderForm) {
        formElementsArray.push({
          id: key,
          config: this.state.orderForm[key]
        })
      }
      form = (

        <form onSubmit={this.orderHandler}>
          {formElementsArray.map(
            formElement => (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
              />
            )
          )}
          <Button btnType="Success" disabled={!this.state.formIsValid}>
            ORDER
          </Button>
        </form>
      );
    }
    let redirect = null
    if (!this.props.purchasing) {
      redirect = (<Redirect to='/' />)
    }
    return (

      <div className={classes.ContactData}>
        {redirect}
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    ingredients: state.ing.ingredients,
    price: state.ing.totalPrice,
    loading: state.order.loading,
    error: state.order.error,
    purchasing: state.order.purchasing,
    token: state.auth.token,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return { onOrderBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token)) }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))