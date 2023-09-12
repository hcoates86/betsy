import './HomePage.css';
import { Link } from 'react-router-dom';
import noCow from '../../images/noCow.png';

const ListingItem = ({ listing }) => {

    return (
        <Link to={`/listings/${listing.id}`}>
            <div>

                <img src={listing.image[0] || noCow} alt={listing.name}> </img>

            </div>
        </Link>

    )
}

export default ListingItem;