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

    //quantity wasn't updating immediately the normal way, workaround with extra variable storage
    const editQuantity = async (num) => {
        const editedCartItem = {
            ...cartItem, quantity: num
        }
        console.log(editedCartItem);
        dispatch(editCartItem(editedCartItem))
    }
 

    


    return (
        <li key={cartItem.id}>
        <div className='cart-div'>
            <div className='seller-info'>
                <img className='seller-profile' src={cartItem.seller.picture} alt={cartItem.seller.username}></img>
                <p className='seller-name'>{cartItem.seller.username}</p>
            </div>

            <div className='cart-center'>
                <Link to={`/listings/${cartItem.productId}`}>
                <img className='cart-image' src={image} alt={cartItem.name}></img>
                </Link>

                <div className='cart-center-col'>
                    <Link to={`/listings/${cartItem.productId}`}>
                    <span className='link-cart'>{cartItem.name}</span>
                    </Link>
                    
                <select value={quantity} name="quantity" id='quant-cart' onChange={(e) => {
                        const newNum = parseInt(e.target.value);
                        setQuantity(newNum)
                        editQuantity(newNum)
                    }     
                }>
                    {quantityArr}
                </select>

                <button className='no-button hover-focus' onClick={deleteItem}>Remove</button>
                </div>
                <div className='cart-price'>
                    ${cartItem.price}
                </div>
            </div>
        </div>
        </li>
    )
}


export default CartItem;