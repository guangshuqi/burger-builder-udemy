import * as actionTypes from '../actions/actionTypes'
const initialState = {
    orders: [],
    loading: true,
    error: null,
    purchasing: true
}

const orderReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                orders: [...action.orders],
                loading: false
            }
        case actionTypes.FETCH_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return {
                ...state,
                orders: state.orders.concat({
                    id: action.orderId,
                    ...action.orderData
                }),
                loading: false,
                purchasing: false
            }

        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        default:
            return state

    }
}

export default orderReducer