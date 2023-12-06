import {csrfFetch} from './csrf';

const GET_LISTINGS = 'listings/getAllListings';
const VIEW_LISTING = 'listings/getSingleListing';
const MAKE_LISTING = 'listings/makeListing';
const UPDATE_LISTING ='listings/updateListing';
const DELETE_LISTING ='listings/deleteListing';
const ADD_IMAGE = 'listings/addImage';
const USER_LISTINGS = 'listings/userListings';

const getAllListings = (listings) => {
    return {
        type: GET_LISTINGS,
        listings
    }
}

const getSingleListing = (listing) => {
    return {
        type: VIEW_LISTING,
        listing
    }
}

const makeListing = (listing) => {
    return {
        type: MAKE_LISTING,
        listing
    }
}

const updateListing = (listing) => {
    return {
        type: UPDATE_LISTING,
        listing
    }
}

const deleteListing = (listingId) => {
    return {
        type: DELETE_LISTING,
        listingId
    }
}

const addImage = (image) => {
    return {
        type: ADD_IMAGE,
        image
    }
}

const userListings = (listings) => {
    return {
        type: USER_LISTINGS,
        listings
    }
}


export const getListings = () => async (dispatch) => {
    const res = await csrfFetch('/api/listings');
    if (res.ok) {
        const listings = await res.json()
        dispatch(getAllListings(listings))
    }

};

export const fetchListing = (listingId) => async (dispatch) => {
    const res = await csrfFetch(`/api/listings/${listingId}`);
    if (res.ok) {
        const listing = await res.json()
        dispatch(getSingleListing(listing))
    }
}

export const createListing = (listing) => async (dispatch) => {
    const res = await csrfFetch('/api/listings/new', {
        method: 'POST',
        body: JSON.stringify(listing)
    });

    const data = await res.json();

    if (res.ok) {
        // const newListing = await res.json();
        // dispatch(makeListing(newListing))
        dispatch(makeListing(data))
    }
    return data;
    
}

export const postImage = (image) => async (dispatch) => {
    const { url, productId } = image;
    const res = await csrfFetch(`/api/listings/${productId}/images`, {
        method: 'POST',
        body: JSON.stringify({
            url
        })
    });

    if (res.ok) {
        const newImage = await res.json();
        dispatch(addImage([newImage]));
        return newImage;
    } else {
        const errors = await res.json();
        return errors;
    }
}


export const updatedListing = (listing) => async (dispatch) => {
    const res = await csrfFetch(`/api/listings/${listing.id}`, {
        method: 'PUT',
        body: JSON.stringify(listing)
    });
    if (res.ok) {
        const newListing = await res.json();
        dispatch(updateListing(newListing));
        return newListing;
    } else {
        const errors = await res.json();
        return errors;
      }
}

export const removeListing = (listingId) => async (dispatch) => {
    const res = await csrfFetch(`/api/listings/${listingId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(deleteListing(listingId))
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const getUserListings = () => async (dispatch) => {
    const res = await csrfFetch('/api/session/listings');
    if (res.ok) {
        const listings = await res.json()
        dispatch(userListings(listings))
    } else {
        const errors = await res.json();
        return errors;
    }
}




const initialState = {allListings:{}, singleListing: {}}


const listingReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_LISTINGS:
            const listingsState = {allListings:{}};
            action.listings.forEach(listing => {
                listingsState.allListings[listing.id] = listing
            })
            return {...state, ...listingsState}
        case VIEW_LISTING:
            newState = {...state, singleListing: {}};
            newState.singleListing = action.listing;
            return newState;
        case MAKE_LISTING:
            newState = {...state, allListings: {...state.allListings}, singleListing: {}};
            newState.allListings[action.listing.id] = action.listing;
            newState.singleListing = action.listing;
            return newState;
        case ADD_IMAGE:
            newState = {...state, allListings: {...state.allListings}, singleListing: {...state.singleListing}};;
            newState.singleListing.image = action.image;
            return newState;
        case UPDATE_LISTING:
            newState = {...state, allListings: {...state.allListings}, singleListing: {...state.singleListing}};
            newState.allListings[action.listing.id] = action.listing;
            let newState2 = {...state, ...newState};
            return newState2;
        case DELETE_LISTING:
            newState = {...state, allListings: {...state.allListings}, singleListing: {...state.singleListing}};
            delete newState.allListings[action.listingId];
            return newState;
     default:
        return state;
      }
    }


export default listingReducer;