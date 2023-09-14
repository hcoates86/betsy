import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getListings } from '../../store/listings';
import ListingItem from '../HomePage/ListingItem';
import OpenModalButton from '../OpenModalButton';
import DeleteListing from '../DeleteListing';
import { Link } from 'react-router-dom';


const UserListings = () => {

    const dispatch = useDispatch();
    const listings = Object.values(
        useSelector(state => state.listings.allListings || []))
    const user = useSelector ((state) => state.session.user)


    useEffect(() => {
        dispatch(getListings())
    }, [dispatch]);

    if (!listings || !listings.length) return null;

    return (
        <div className='flex-div'>
            
            <h1>Your listings</h1>
            <div className='flex-div'>
                
                {listings.filter(listing => listing.userId === user.id).map(listing => (
                    <div key={listing.id}>
                        <ListingItem listing={listing}/>
                        <OpenModalButton 
                            buttonText='Delete'
                            modalComponent={<DeleteListing productId={listing.id} />}
                        />
                        <Link to={`/user/listings/${listing.id}`}>Update</Link>
                
                    </div>
                ))}
                
            </div>
        </div>
    )        

}

export default UserListings;