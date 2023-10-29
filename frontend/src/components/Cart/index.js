import { getListings } from '../../store/listings';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Cart.css';
import ListingItem from '../ListingItem';

const Cart = () => {
    //returns an array of all cart items or an empty one if it's empty
    const cart = Object.values(
        useSelector(state => state.cart || []))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCartItems())
    }, [dispatch]);

    if (!cart) return null;


    return (
        <div>
            <h1>Your Cart</h1>
        <div className=''>
            {popular.map(listing => (
                <div className='outer-div'>
                    <ListingItem listing={listing}/>
                </div>
            ))}
        </div>   

        </div>
    )
}


export default Cart;