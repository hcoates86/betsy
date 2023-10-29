import {csrfFetch} from './csrf';

const GET_CART_ITEMS = 'carts/getListingCarts';
const DELETE_CART = 'carts/deleteCart';
const POST_CART = 'carts/postCart';
const EDIT_CART = 'carts/editCart';

const getCartItems = (carts) => {
    return {
        type: GET_CART_ITEMS,
        carts
    }
}

const removeCartItem = (cartId) => {
    return {
        type: DELETE_CART,
        cartId
    }
}

const postNewCartItem = (cart) => {
    return {
        type: POST_CART,
        cart
    }
}

const editCartItemAction = (cart) => {
    return {
        type: EDIT_CART,
        cart
    }
}

export const postCartItem = ({newCart, productId}) => async (dispatch) => {
    const res = await csrfFetch(`/api/cart/${productId}`, {
        method: 'POST',
        body: JSON.stringify(newCart)
    });

    const cart = await res.json();
    if (res.ok) {
        dispatch(postNewCartItem(cart))
    } 
    return cart

}

export const getAllCartItems = (productId) => async (dispatch) => {
    const res = await csrfFetch(`/api/cart`);

    const carts = await res.json()
    if (res.ok) {
        dispatch(getCartItems(carts))
    } 
    return carts;

};


export const deleteCartItem = (productId) => async (dispatch) => {
    const res = await csrfFetch(`/api/cart/${productId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removeCartItem(cartId))
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const editCartItem = (productId) => async (dispatch) => {
    const res = await csrfFetch(`/api/cart/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart)
    })
    const data = await res.json();
    if (res.ok) {
        dispatch(editCartItemAction(data))
    }
    return data;
}

const initialState = {cart: {}}

const cartReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_CART_ITEMS:
            newState = {...state, listing:{}};
            if (action.carts) {
            action.carts.forEach(cart => newState.listing[cart.id] = cart)}
            return newState;
        case DELETE_CART:
            newState = {...state, listing: {...state.listing}};
            delete newState.listing[action.cartId];
            return newState;
        case POST_CART:
            newState = {...state, listing: {...state.listing}};
            newState.listing[action.cart.id] = action.cart;
            return newState;
        default:
            return state;
    }
}

export default cartReducer;