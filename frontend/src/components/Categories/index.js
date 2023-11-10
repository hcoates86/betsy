import { getListings } from '../../store/listings';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './HomePage.css';
import ListingItem from '../ListingItem';

const Categories = () => {
    //returns an array of all listings or an empty one if it's empty
    const listings = Object.values(
        useSelector(state => state.listings.allListings || []))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListings())
    }, [dispatch]);



    return (
        <div>
            <div className='popular-outer'>
                <h1>The popular crowd</h1>
            </div>  

            <div className='gift-div'>
    
            </div>    

        </div>
    )
}


export default Categories;