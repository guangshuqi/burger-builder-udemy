import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'


export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}


export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        axios
            .get("/orders.json?auth=" + token)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({ ...res.data[key], id: key });
                }
                dispatch(fetchOrderSuccess(fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrderFail(err))
            });

    }

}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (order, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios
            .post("/orders.json?auth=" + token, order)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, order))
            })
            .catch(error => dispatch(purchaseBurgerFail(error)));
    }
}