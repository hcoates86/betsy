import {csrfFetch} from './csrf';

const GET_CART_ITEMS = 'cart/getListingCart';
const DELETE_CART = 'cart/deleteCart';
const POST_CART = 'cart/postCart';
const EDIT_CART = 'cart/editCart';
const CLEAR_CART = 'cart/clearCart'

const getCartItems = (cartItems) => {
    return {
        type: GET_CART_ITEMS,
        cartItems
    }
}

const removeCartItem = (cartId) => {
    return {
        type: DELETE_CART,
        cartId
    }
}

const postNewCartItem = (cartItem) => {
    return {
        type: POST_CART,
        cartItem
    }
}

const editCartItemAction = (cartItem) => {
    return {
        type: EDIT_CART,
        cartItem
    }
}

export const clearCartAction = () => {
    return {
        type: CLEAR_CART
    }
}

export const postCartItem = (newCartItem) => async (dispatch) => {
    const { productId } = newCartItem;

    const res = await csrfFetch(`/api/cart/${productId}`, {
        method: 'POST',
        body: JSON.stringify(newCartItem)
    });

    const cartItem = await res.json();

    if (res.ok) {
        dispatch(postNewCartItem(cartItem))
    } 
    return cartItem

}

export const getAllCartItems = () => async (dispatch) => {
    const res = await csrfFetch(`/api/cart`);

    const cartItems = await res.json()
    if (res.ok) {
        dispatch(getCartItems(cartItems))
    } 
    return cartItems;

};


export const deleteCartItem = (cartId) => async (dispatch) => {
    const res = await csrfFetch(`/api/cart/${cartId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removeCartItem(cartId));
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const editCartItem = (cartItem) => async (dispatch) => {
    const res = await csrfFetch(`/api/cart/${cartItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItem)
    })
    const editCartItem = await res.json();
    if (res.ok) {
        dispatch(editCartItemAction(cartItem))
        return editCartItem;

    }
}

export const clearCart = (cart) => async (dispatch) => {
    for (let cartItem of cart) {
        await csrfFetch(`/api/cart/${cartItem.id}`, {
            method: 'DELETE'
        });
    }
    dispatch(clearCartAction());
} 

const initialState = {}

const cartReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_CART_ITEMS:
            newState = {...state};
            if (action.cartItems) {
                action.cartItems.forEach(item => newState[item.id] = item)
            }
            return newState;
        case DELETE_CART:
            newState = {...state};
            delete newState[action.cartId];
            return newState;
        case POST_CART:
            newState = {...state};
            newState[action.cartItem.id] = action.cartItem;
            return newState;
        case EDIT_CART:
            newState = {...state};
            newState[action.cartItem.id] = action.cartItem;
            return newState;
        case CLEAR_CART:
            return {};
        default:
            return state;
    }
}

export default cartReducer;