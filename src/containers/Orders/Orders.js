import React, { Component } from "react";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from 'react-redux'
import { fetchOrders } from '../../store/actions/index'
class Orders extends Component {

  componentDidMount() {
    // axios
    //   .get("/orders.json")
    //   .then(res => {
    //     const fetchedOrders = [];
    //     for (let key in res.data) {
    //       fetchedOrders.push({ ...res.data[key], id: key });
    //     }
    //     this.setState({ loading: false, orders: fetchedOrders });
    //   })
    //   .catch(err => {
    //     this.setState({ loading: false });
    //   });
    this.props.fetchOrders(this.props.token, this.props.userId)
  }
  render() {
    let orders = null;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={{ ...order.ingredients }}
          price={order.price}
        />
      ));
    } else {
      orders = <Spinner />;
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {

  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }

}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
