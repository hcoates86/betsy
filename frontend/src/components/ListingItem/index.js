import './ListingItem.css';
import { Link } from 'react-router-dom';
import noCow from '../../images/noCow.png';

const ListingItem = ({ listing }) => {
    
    if(!listing) return null;

    let image;
    if(listing.image && listing.image[0]) image = listing.image[0].url;
    else image = noCow;

    let stars;
    if(listing.averageStars) {
        const num = parseInt(listing.averageStars[0])
        if(num === 5) stars = '★★★★★';
        if(num === 4) stars = '★★★★☆';
        if(num === 3) stars = '★★★☆☆';
        if(num === 2) stars = '★★☆☆☆';
        if(num === 1) stars = '★☆☆☆☆';

    } else stars = null;

    let price =  null;
    if (typeof listing.price === 'number') price = (listing.price).toFixed(2);

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

                    <p id='price'>${price}</p>
                    <p id='store'>{listing.seller?.username}</p>
                </div>

            </div>
        </Link>

    )
}

export default ListingItem;