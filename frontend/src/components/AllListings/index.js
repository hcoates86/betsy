import './AllListings.css'
import { getListings } from '../../store/listings';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListingItem from '../ListingItem';

const AllListings = () => {
    const listings = Object.values(
        useSelector(state => state.listings.allListings || []))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListings())
    }, [dispatch]);

    if (!listings) return null;

    return (
        <>
        <h1 className='text-align'>All Cows</h1>
        <div className="flex-div">
            {listings.map(listing => (
                <div className='outer-div'>
                    <ListingItem listing={listing}/>
                </div>
            ))}

        </div></>
    )
}

export default AllListings;