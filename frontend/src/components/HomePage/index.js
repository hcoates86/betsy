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

    //puts last 6 listings into popular, then 9 next ones into giftGuide
    let count = 0;
    for (let i = listings.length - 1; i > 0; i--) {
        if(count < 6) popular.push(listings[i]);
        if(count > 6 && count < 16) giftGuide.push(listings[i])
        count++
    }

    return (
        <>

            
        <div className='popular-outer'>
            
            <h1>New and rising cows</h1>
        <div className='flex-div'>
            {popular.map(listing => (
                <div className='outer-div'>
                    <ListingItem listing={listing}/>
                </div>
            ))}
        </div>  

        <div className='gift-div'>
            <h1>The Betsy Gift Guide</h1>
            <h2>Shop these unique cows</h2>
            <div className='flex-div'>
            {giftGuide.map(listing => (
                <div>
                    <ListingItem listing={listing}/>
                </div>
            ))}
            </div>
        </div>

        </div>
        </>
    )
}


export default HomePage;