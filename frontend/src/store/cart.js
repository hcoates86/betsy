import {csrfFetch} from './csrf';

const GET_CART_ITEMS = 'carts/getListingCarts';
const DELETE_CART = 'carts/deleteCart';
const POST_CART = 'carts/postCart';
const EDIT_CART = 'carts/editCart';

const getCartItems = (cartItems) => {
    return {
        type: GET_CART_ITEMS,
        cartItems
    }
}

const removeCartItem = (productId) => {
    return {
        type: DELETE_CART,
        productId
    }
}

const postNewCartItem = (cartItem) => {
    return {
        type: POST_CART,
        cartItem
    }
}

const editCartItemAction = (product) => {
    return {
        type: EDIT_CART,
        product
    }
}

export const postCartItem = ({newCartItem, productId}) => async (dispatch) => {
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

export const getAllCartItems = (productId) => async (dispatch) => {
    const res = await csrfFetch(`/api/cart`);

    const cartItems = await res.json()
    if (res.ok) {
        dispatch(getCartItems(cartItems))
    } 
    return cartItems;

};


export const deleteCartItem = (productId) => async (dispatch) => {
    const res = await csrfFetch(`/api/cart/${productId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removeCartItem(productId))
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const editCartItem = (product) => async (dispatch) => {
    const res = await csrfFetch(`/api/cart/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
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
            newState = {...state, cart:{}};
            if (action.cartItems) {
                action.cartItems.forEach(item => newState.cart[item.id] = item)
            }
            return newState;
        case DELETE_CART:
            newState = {...state, cart: {...state.cart}};
            delete newState.cart[action.productId];
            return newState;
        case POST_CART:
            newState = {...state, cart: {...state.cart}};
            newState.listing[action.cart.id] = action.cartItem;
            return newState;
        default:
            return state;
    }
}

export default cartReducer;