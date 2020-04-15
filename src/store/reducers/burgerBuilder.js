import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    totalPrice: 3,
    error: false,
    loading: false,
    building: false

}

const INGREDIENT_PRICES = {
    salad: 0.25,
    cheese: 0.1,
    meat: 0.75,
    bacon: 0.5
};

const ingredientsReducer = (state = initialState, action) => {
    const newIngredients = { ...state.ingredients }
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:

            newIngredients[action.ingType] = state.ingredients[action.ingType] + 1
            return {
                ingredients: newIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingType],
                building: true
            }

        case actionTypes.REMOVE_INGREDIENT:


            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingType]: state.ingredients[action.ingType] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingType],
                building: true
            }
        case actionTypes.SET_INITIAL_STATE:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                totalPrice: 3,
                error: false,
                loading: false,
                building: false

            }
        case actionTypes.FETCH_INIT:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ING_FAILED:
            return {
                ...state,
                error: true,
                loading: false
            }

        default:
            return state
    }


}

export default ingredientsReducer