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

    } else stars = '☆☆☆☆☆'

    // add .00 to price if it doesn't have fractions, or change model to float?
    // if(listing.price.includes('.')

    return (
        <Link to={`/listings/${listing.id}`}>
            <div>

                <img className='thumbnail' src={image} alt={listing.name}></img>
                <div>
                    <p>{listing.name}</p>
                    <p>{stars}</p>
                    <p>${listing.price}</p>
                </div>

            </div>
        </Link>

    )
}

export default ListingItem;