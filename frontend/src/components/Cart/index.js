import { getAllCartItems, clearCart } from '../../store/cart';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Cart.css';
import CartItem from '../CartItem';

const Cart = () => {
    //returns an array of all cart items or an empty one if it's empty
    const cart = Object.values(
        useSelector(state => state.cart || []))

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAllCartItems())
    }, [dispatch]);

    if (!cart) return null;

    let totalPrice = 0.00;
    
    cart.forEach(item => {
        totalPrice += item.price * item.quantity
    })

    const checkout = async () => {
            await dispatch(clearCart(cart));
            history.push('/checkout')

    }

    if (!cart.length) return (
        <div className='text-align'>
            <h1>Your Cart</h1>
            <h2>Your cart is empty</h2>

        </div>
    )


    else return (
        <div>
            <h1 className='text-align'>Your Cart</h1>
        <div className='cart-checkout-arranged'>
            
            <div className='cart-block'>
                <ul className='cart-list'>
                    {cart.map(item => (
                    <CartItem cartItem={item} key={item.id} />
                    ))}
                </ul>
            </div>

            <div className='checkout-div'>
                <p>Item(s) total <span className='span-price'>${totalPrice}</span></p>
                <button className='checkout-button' onClick={checkout}>Checkout</button>
            </div>
        </div>
        <div>

        </div>
            

        </div>
    )
}


export default Cart;