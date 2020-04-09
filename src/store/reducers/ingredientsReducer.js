import * as actionTypes from '../actionTypes'

const initialState = {
    ingredients: {
        bacon: 0,
        cheese: 0,
        meat: 0,
        salad: 0
    },

    totalPrice: 3

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
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingType]
            }

        case actionTypes.REMOVE_INGREDIENT:

            newIngredients[action.ingType] = state.ingredients[action.ingType] - 1
            return {
                ingredients: newIngredients,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingType]
            }
        case actionTypes.SET_INITIAL_STATE:
            return {
                ingredients: {
                    ...action.ingredients
                },
                totalPrice: 3

            }

        default:
            return state
    }


}

export default ingredientsReducer