import * as  actionType from './actionTypes'
import axios from "../../axios-orders";

// action is a javascript object 
export const addIngredient = (ing) => {
    return { type: actionType.ADD_INGREDIENT, ingType: ing }
}

export const removeIngredient = (ing) => {
    return { type: actionType.REMOVE_INGREDIENT, ingType: ing }
}


export const setIngredients = (ingredients) => {
    return {
        type: actionType.SET_INITIAL_STATE,
        ingredients: ingredients
    }
}

export const fetchIngFailed = () => {
    return {
        type: actionType.FETCH_ING_FAILED
    }
}
export const fetchInit = () => {
    return {
        type: actionType.FETCH_INIT
    }
}
export const setInitState = () => {
    return dispatch => {
        dispatch(fetchInit())
        axios
            .get("https://react-burger-project-1767f.firebaseio.com/ingredients.json")
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(err => fetchIngFailed());
    }
}