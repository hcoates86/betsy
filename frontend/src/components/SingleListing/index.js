import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchListing } from '../../store/listings';
import { getListingReviews } from '../../store/reviews';
import noCow from '../../images/noCow.png';



const SingleListing = () => {
    const {productId} = useParams();
    const dispatch = useDispatch();

    const listing = useSelector(state => state.listings.singleListing)
    
    useEffect(() => {
        dispatch(fetchListing(productId))
        dispatch(getListingReviews(productId))
    }, [dispatch])
    
    if (!Object.keys(listing).length) return null;


    let image;
    if(listing.images && listing.images[0]) image = listing.images[0].url;
    else image = noCow;

    let price =  null;
    if (listing.price) price = (listing.price).toFixed(2);

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
                <img src={image} alt={listing.name}></img>
            </div>

            <div>
                <div>
                    <h1>${price}</h1>
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