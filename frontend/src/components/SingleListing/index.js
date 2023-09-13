import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchListing } from '../../store/listings';
import { getListingReviews } from '../../store/reviews';


const SingleListing = () => {
    const {productId} = useParams();
    const dispatch = useDispatch();

    const listing = useSelector(state => state.listings.singleListing)
    
    
    useEffect(() => {
        dispatch(fetchListing(productId))
        dispatch(getListingReviews(productId))
    }, [dispatch])
    
    if (!listing) return null;

    let stars;
    if(listing.averageStars) {
        const num = parseInt(listing.averageStars[0])
        if(num === 5) stars = '★★★★★';
        if(num === 4) stars = '★★★★☆';
        if(num === 3) stars = '★★★☆☆';
        if(num === 2) stars = '★★☆☆☆';
        if(num === 1) stars = '★☆☆☆☆';

    } else stars = null;

    return (
        <div>
            <div>
                <img src={listing.images[0].url} alt={listing.name}></img>
            </div>

            <div>
                <div>
                    <h1>${(listing.price).toFixed(2)}</h1>
                    <p>{listing.name}</p>
                    <p>{listing.postedBy.username}</p>
                    <p>Quantity {listing.quantity}</p>
                </div>
                <div>
                    <h3>Description</h3>
                    <p>{listing.description}</p>
                </div>
                
            </div>
            <div>
                {stars}
            </div>


        </div>
    )
}

export default SingleListing;