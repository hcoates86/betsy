import './HomePage.css';
import { Link } from 'react-router-dom';
import noCow from '../../images/noCow.png';

const ListingItem = ({ listing }) => {
    let image;
    if(listing.image[0] && listing.image[0].url) image = listing.image[0].url;
    else image = noCow;

    return (
        <Link to={`/listings/${listing.id}`}>
            <div>

                <img src={image} alt={listing.name}></img>

            </div>
        </Link>

    )
}

export default ListingItem;