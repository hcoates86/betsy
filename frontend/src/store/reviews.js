import {csrfFetch} from './csrf';

const LISTING_REVIEWS = 'reviews/getListingReviews';
const DELETE_REVIEW = 'reviews/deleteReview';
const POST_REVIEW = 'reviews/postReview';
const EDIT_REVIEW = 'reviews/editReview';

const getReviews = (reviews) => {
    return {
        type: LISTING_REVIEWS,
        reviews
    }
}

const removeReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

const postNewReview = (review) => {
    return {
        type: POST_REVIEW,
        review
    }
}

const editReviewAction = (review) => {
    return {
        type: EDIT_REVIEW,
        review
    }
}

export const postReview = ({newReview, productId}) => async (dispatch) => {
    const res = await csrfFetch(`/api/listings/${productId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(newReview)
    });

    const review = await res.json();
    if (res.ok) {
        dispatch(postNewReview(review))
    } 
    return review

}

export const getListingReviews = (productId) => async (dispatch) => {
    const res = await csrfFetch(`/api/listings/${productId}/reviews`);

    const reviews = await res.json()
    if (res.ok) {
        dispatch(getReviews(reviews))
    } 
    return reviews;

};


export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removeReview(reviewId))
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const editReview = (review) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })
    const data = await res.json();
    if (res.ok) {
        dispatch(editReviewAction(data))
    }
    return data;
}

const initialState = {}

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LISTING_REVIEWS:
            newState = {...state};
            if (action.reviews) {
            action.reviews.forEach(review => newState[review.id] = review)}
            return newState;
        case DELETE_REVIEW:
            newState = {...state};
            delete newState[action.reviewId];
            return newState;
        case POST_REVIEW:
            newState = {...state};
            newState[action.review.id] = action.review;
            return newState;
        case EDIT_REVIEW:
            newState = {...state};
            // newState[action.review.id] = {user: {...state[rId]['user']}}
            newState[action.review.id] = action.review;
            newState[action.review.id].user = {...state[action.review.id].user};
            // newState.rId.user = {...state.rId.user};
            return newState;
        default:
            return state;
    }
}

export default reviewReducer;