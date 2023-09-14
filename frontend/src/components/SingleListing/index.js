import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchListing } from '../../store/listings';
import { getListingReviews } from '../../store/reviews';
import noCow from '../../images/noCow.png';



const SingleListing = () => {
    const {productId} = useParams();
    const dispatch = useDispatch();
    const [stars, setStars] = useState(null)

    const listing = useSelector(state => state.listings.singleListing)
    
    useEffect(() => {
        dispatch(fetchListing(productId))
        dispatch(getListingReviews(productId))
    }, [dispatch])
    
    useEffect(() => {
        if(listing.averageStars) {
            //rounds number down to display star value
            const num = Math.floor(listing.averageStars)

            if(num === 5) setStars('★★★★★');
            if(num === 4) setStars('★★★★☆');
            if(num === 3) setStars('★★★☆☆');
            if(num === 2) setStars('★★☆☆☆');
            if(num === 1) setStars('★☆☆☆☆');
        } else setStars(null)

    }, [listing])


    if (!Object.keys(listing).length) return null;

    if (!listing || !listing.price) return null;

    let image;
    if(listing.images && listing.images[0]) image = listing.images[0].url;
    else image = noCow;

    let price =  null;
    if (typeof listing.price === 'number') price = (listing.price).toFixed(2);

    return (
        <div>
            <div>
                <img src={image} alt={listing.name}></img>
            </div>

            <div>
                <div>
                    <h1>${price}</h1>
                    <p>{listing.name}</p>
                    <p>{listing.seller?.username}</p>
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