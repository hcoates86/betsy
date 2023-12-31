import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { fetchListing } from '../../store/listings';
import { getListingReviews } from '../../store/reviews';
import { postCartItem } from '../../store/cart';
import noCow from '../../images/noCow.png';
import noFarmer from '../../images/noFarmer.png';
import DeleteReviewModal from '../DeleteReviewModal';
import OpenModalButton from '../OpenModalButton/';
import ReviewModal from '../ReviewModal';
import './SingleListing.css';


const SingleListing = () => {
    const {productId} = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [stars, setStars] = useState(null);
    const [plural, setPlural] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const user = useSelector(state => state.session.user);
    const listing = useSelector(state => state.listings.singleListing);
    const reviews = Object.values(useSelector(state => state.reviews));
    
    useEffect(() => {
        dispatch(fetchListing(productId));
        dispatch(getListingReviews(productId));
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

    }, [listing, reviews])


    if (!Object.keys(listing).length) return null;
    if (!listing || !listing.price) return null;

    //checks if listing belongs to logged in user
    let thisUser;
    if (user && user.id === listing.userId) thisUser = true;
    else thisUser = false;

    let image;
    if(listing.images && listing.images[0]) image = listing.images[0].url;
    else image = noCow;

    let price = listing.price;

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

    //creates dropdown options for the quantity, shown only if quantity is more than 1

    const quantityArr = [];
    if (!listing.quantity) quantityArr.push(<option key="0" value="0">0</option>)
    else {
        for (let i = 1; i <= listing.quantity; i++) {
            quantityArr.push(<option key={`${i}`} value={`${i}`}>{i}</option>)
    }}
    
    let categoryName;
    if (listing.categoryId === 1) categoryName = 'Dairy';
    if (listing.categoryId === 2) categoryName = 'Beef';
    if (listing.categoryId === 3) categoryName = 'Other Category';
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCartItem = { quantity, productId: listing.id }
        await dispatch(postCartItem(newCartItem));
        history.push('/cart')

    }

    function datePosted(createdAt) {
        return `${monthConverter(createdAt.split('-')[1])} ${createdAt.split('-')[2].split(' ')[0]}, ${createdAt.split('-')[0]}`
    }
    
    


    return (
        
        <div>
            <div className="text-align one-space-down">
            <Link className='underline' to={`/category/${listing.categoryId}`}>
                Category: {categoryName} Cow
            </Link>
            </div>
        <div className="single-outer-div">

                <img className='listing-image' src={image} alt={listing.name}></img>


            <div className="single-center-div">
                <div className="price-div">
                    <h1>${price}</h1>
                    <p>{listing.name}</p>
                    <p className="seller-text">{listing.seller?.username}</p>

                </div>
                
                
            {user && !thisUser &&
            (<div>
            <form onSubmit={handleSubmit} className="add-cart-form">
                {listing.quantity > 1 &&
                <>
                <label className="one-space-down quantity-text">Quantity</label>
                        
                <select className='one-space-down width quantity-input' name="quantity" id="quantity-select" onChange={(e) => setQuantity(e.target.value)}>

                {quantityArr}
                </select>
                </>
                }

                <button className='button-black width button-font add-cart-button' type="submit">Add to Cart</button>

            </form>
            </div>)}
            <div className="description-div">
                    <h3>Description</h3>
                    <p>{listing.description}</p>
                </div>

            </div>


            </div>
            <div className="review-div">
                <div className="review-total">
    
                    <h2>{listing.totalReviews} review{plural} {stars}</h2>
                    {user && !thisUser &&
                    <OpenModalButton
                    buttonText="Leave a Review"
                    buttonClass='leave-review-button'
                    modalComponent={<ReviewModal productId={productId} type='create' />}
                    />
                    }
                </div>
                    {reviews.reverse().map(review => (
                    <div className="single-review" key={review.id}>
                        <p>{returnStars(review.stars)}</p>
                        <p>{review.comment}</p>
                        
                        <div>
                            
                            <img className='review-profile' src={review.user?.picture || noFarmer} alt={review.user?.username}></img>
                            <p className="review-userinfo">{review.user?.username}</p>

                            <p className="review-userinfo">{datePosted(review.createdAt)}</p>
                            { review.userId === user?.id ? 
                                (
                                <>
                                    <OpenModalButton
                                    buttonText="Delete"
                                    buttonClass="space-right"
                                    modalComponent={<DeleteReviewModal reviewId={review.id} productId={productId} />}
                                    />

                                    <OpenModalButton
                                    buttonText="Edit"
                                    modalComponent={<ReviewModal review={review} productId={productId} type='update'/>}
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