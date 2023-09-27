import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchListing } from '../../store/listings';
import { getListingReviews } from '../../store/reviews';
import noCow from '../../images/noCow.png';
import './SingleListing.css';
import DeleteReviewModal from '../DeleteReviewModal';
import OpenModalButton from '../OpenModalButton/';
import ReviewModal from '../ReviewModal';


const SingleListing = () => {
    const {productId} = useParams();
    const dispatch = useDispatch();
    const [stars, setStars] = useState(null)
    const [plural, setPlural] = useState(null)

    const user = useSelector(state => state.session.user)
    const listing = useSelector(state => state.listings.singleListing)
    const reviewObj = useSelector(state => state.reviews.listing)
    const reviews = Object.values(reviewObj)
    
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
        if (listing.totalReviews !== 1) setPlural('s');
        else setPlural(null)

    }, [listing])


    if (!Object.keys(listing).length) return null;
    if (!listing || !listing.price) return null;

    let image;
    if(listing.images && listing.images[0]) image = listing.images[0].url;
    else image = noCow;

    let price;
    if (!listing.price) return null;
    else price = (listing.price).toFixed(2);

    const months = ['0', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    function monthConverter(num) {
      if (+num < 10) num = num[1];
      return months[+num]
    }

    function returnStars(stars) {
        if (stars === 5) return '★★★★★';
        else if (stars === 4) return '★★★★☆'
        else if (stars === 3) return '★★★☆☆'
        else if (stars === 2) return '★★☆☆☆'
        else if (stars === 1) return '★☆☆☆☆'
        else return null

    }

    return (
        <div>
            <div>
                <img className='listing-image' src={image} alt={listing.name}></img>
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
                <div className="review-total">
    
                    <h2>{listing.totalReviews} review{plural} {stars}</h2>
                    {user && 
                    <OpenModalButton
                    buttonText="Leave a Review"
                    modalComponent={<ReviewModal productId={productId} type='create' />}
                    />
                    }
                </div>
                    {reviews.map(review => (
                    <div className="single-review" key={review.id}>
                        <p>{returnStars(review.stars)}</p>
                        <p>{review.comment}</p>
                        
                        <div>
                            
                            <img className='review-profile' src={review.user?.picture} alt={review.user?.username}></img>
                            <p className="review-userinfo">{review.user?.username}</p>
                            <p className="review-userinfo">{monthConverter(review.createdAt.split('-')[1])} {review.createdAt.split('-')[2].split(' ')[0]}, {review.createdAt.split('-')[0]}</p>
                            { review.userId === user?.id ? 
                                (
                                <>
                                    <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={<DeleteReviewModal reviewId={review.id} />}
                                    />

                                    <OpenModalButton
                                    buttonText="Edit"
                                    modalComponent={<ReviewModal review={review} type='update'/>}
                                    />
                                </>) : (<></>)}
                        </div>
                    </div>
                    ))}
            </div>


        </div>
    )
}

export default SingleListing;