import { getListings } from '../../store/listings';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './HomePage.css';
import ListingItem from '../ListingItem';

const HomePage = () => {
    //returns an array of all listings or an empty one if it's empty
    const listings = Object.values(
        useSelector(state => state.listings.allListings || []))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListings())
    }, [dispatch]);

    if (!listings) return null;

    const popular = [];
    const giftGuide = [];

    //puts last 5 listings into popular, then 6 next ones into giftGuide
    let count = 0;
    for (let i = listings.length - 1; i > 0; i--) {
        if(count < 5) popular.push(listings[i]);
        if(count > 5 && count < 12) giftGuide.push(listings[i])
        count++
    }

    return (
        <>
        <div className='tagline'>
                <h3 className='text-right'>Find the cow your heart desires...</h3>
            <h3 className='text-left'>...or sell the one it doesn't.</h3>
            </div>


        </>
    )
}


export default HomePage;