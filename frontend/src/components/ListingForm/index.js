import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './ListingForm.css'
import noCow from '../../images/noCow.png';

const ListingForm = ({listing}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [photo, setPhoto] = useState('')
    const [name, setName] = useState('')
    // const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')

    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);



    const cancel = () => {
        history.push('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
    <form onSubmit={handleSubmit} className="list-form-box">
            {/* {Object.values(errors).length > 0 && <label className="errors">{errors.comment}</label>} */}
            <h1>Create a listing</h1>

            <div>
                <p>Listing details</p>
                <div>
                    
                    <label>Photo</label>
                    <input type='url' className=''
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    />
                    
                </div>

                <div>
                    
                    <label>Name</label>
                    <input type='text' className='' 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                    
                </div>
                {/* <label>Category</label> */}

                <div>
                    
                    <label>Description</label>
                    <textarea 
                    className='' 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="8" cols="75"
                    />
                </div>
                
            </div>

            <div>
                <p>Inventory and pricing</p>
                <div>
                    
                    <label>Price</label>
                    <input
                        className=''
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div>
    
                    <label>Quantity</label>
                    <input
                        className=''
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
    
                    
                </div>
            </div>

            <div className='cancel-post-div'>
            <button className='button-white' onClick={cancel}>Cancel</button>
            <button className='button-black' type="submit">Post</button>
            </div>
        </form>

        // <div>

        //     <h1>Create a listing</h1>

            

        //     <div>
        //         <label></label>

        //     </div>
        // </div>
    )
}

export default ListingForm;