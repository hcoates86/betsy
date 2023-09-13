import './HomePage.css';
import { Link } from 'react-router-dom';
import noCow from '../../images/noCow.png';

const ListingItem = ({ listing }) => {
    let image;
    if(listing.image[0] && listing.image[0].url) image = listing.image[0].url;
    else image = noCow;

    //this should be the store's rating
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
        <Link to={`/listings/${listing.id}`}>
            <div className='outer-div'>

                <img className='thumbnail' src={image} alt={listing.name}></img>
                <div className='info-div'>
                    <p id='list-name'>{listing.name}</p>
                    {stars ? (
                        <>
                        <p ><span id='stars'>{stars}</span> <span id='review-num'>({listing.totalReviews})</span></p>
                        </>
                    ) : (
                        <></>
                    )}

                    <p id='price'>${(listing.price).toFixed(2)}</p>
                    <p id='store'>{listing.seller.username}</p>
                </div>

            </div>
        </Link>

    )
}

export default ListingItem;