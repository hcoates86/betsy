import { getAllCartItems } from '../../store/cart';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Cart.css';
import CartItem from '../CartItem/CartItem';

const Cart = () => {
    //returns an array of all cart items or an empty one if it's empty
    const cart = Object.values(
        useSelector(state => state.cart || []))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCartItems())
    }, [dispatch]);

    console.log('!!!!', cart);

    if (!cart) return null;


    return (
        <div>
            <h1>Your Cart</h1>
        <div className=''>
            <ul className='cart-list'>
            {cart.map(item => (
               <CartItem cartItem={item} />
            ))}
            </ul>
        </div>   

        </div>
    )
}


export default Cart;