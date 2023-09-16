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
    console.log("1: ", popular);
    console.log("2: ", giftGuide);

    return (
        <div className='popular-outer'>
            <h1>The popular crowd</h1>
        <div className='popular-div'>
            {popular.map(listing => (
                <div className='outer-div'>
                    <ListingItem listing={listing}/>
                </div>
            ))}
        </div>  

        <div className='gift-div'>
            <h1>The Betsy Gift Guide</h1>
            <h2>Shop these unique cows</h2>
            {giftGuide.map(listing => (
                <div>
                    <ListingItem listing={listing}/>
                </div>
            ))}
        </div>    

        </div>
    )
}


export default HomePage;