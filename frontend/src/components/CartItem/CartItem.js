import { deleteCartItem, editCartItem } from '../../store/cart';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './CartItem.css';
import noCow from '../../images/noCow.png';
import { Link } from 'react-router-dom';


const CartItem = ({ cartItem }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(cartItem.quantity);

    if (!cartItem) return null;

    let image;
    if(cartItem.image && cartItem.image[0]) image = cartItem.image[0].url;
    else image = noCow;

    const deleteItem = async () => {
        await dispatch(deleteCartItem(cartItem.id));
    }

    const quantityArr = [];

    for (let i = 1; i <= cartItem.totalQuantity; i++) {
        quantityArr.push(<option key={`${i}`} value={`${i}`}>{i}</option>)
    }

    //quantity wasn't updating the normal way, workaround with extra variable storage
    const editQuantity = async (num) => {
        const editedCartItem = {
            ...cartItem, quantity: num
        }
        console.log(editedCartItem);
        dispatch(editCartItem(editedCartItem))
    }


    const checkout = async () => {


    }


    return (
        <li key={cartItem.id}>
        <div className='cart-div'>
            <p>{cartItem.seller.username}</p>
            <img className='seller-profile' src={cartItem.seller.picture} alt={cartItem.seller.username}></img>

            <img className='cart-image' src={image} alt={cartItem.name}></img>

            <Link className='link-cart' to={`/listings/${cartItem.productId}`}>{cartItem.name}</Link>

            <select value={quantity} name="quantity" onChange={(e) => {
                    const newNum = parseInt(e.target.value);
                    setQuantity(newNum)
                    editQuantity(newNum)
                }     
            }>
                {quantityArr}
            </select>

            <button onClick={deleteItem}>Remove</button>
            <button onClick={checkout}>Proceed to Checkout</button>
        </div>
        </li>
    )
}


export default CartItem;