import { getListings } from '../../store/listings';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Categories.css';
import ListingItem from '../ListingItem';


const Categories = () => {
    const {categoryId} = useParams();

    const listings = Object.values(
        useSelector(state => state.listings.allListings || []))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListings())
    }, [dispatch]);


    const cowArr = [];
    listings.forEach(listing => {
        if (parseInt(categoryId) === listing.categoryId) cowArr.push(listing)
    })

    let title;

    if (categoryId === '1') {
        title = 'Dairy Cows'
    } if (categoryId === '2') {
        title = 'Beef Cows'
    } if (categoryId === '3') {
        title = 'Other Cows'
    }

    return (
        <div>
            <div className='text-align'>
                <h1>{title}</h1>
            </div>  

            <div className='flex-div'>
            {cowArr.map(listing => (
                <div className='outer-div'>
                    <ListingItem listing={listing}/>
                </div>
            ))}
            </div>    

        </div>
    )
}


export default Categories;