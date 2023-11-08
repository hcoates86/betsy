import { getAllCartItems } from '../../store/cart';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CartItem.css';

const CartItem = ({ cartItem }) => {
    if (!cartItem) return null;


    return (
        <div>
        <img className='cartImage' src={} alt={}></img>

        </div>
    )
}


export default CartItem;