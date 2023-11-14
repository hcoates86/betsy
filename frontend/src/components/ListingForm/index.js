import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './ListingForm.css'
import { createListing, postImage } from '../../store/listings';
// import noCow from '../../images/noCow.png';
import { fetchListing, updatedListing } from '../../store/listings';


const ListingForm = () => {
    //only update should have a productId
    const {productId} = useParams();

    const history = useHistory();
    const dispatch = useDispatch();

    const listings = Object.values(
        useSelector(state => state.listings.allListings)
    )
    const listing = listings.filter(listing => listing.id === +productId)[0]

    let listingPhoto = '';
    if (listing && listing.image) listingPhoto = listing.image[0].url
    
    const [photo, setPhoto] = useState(listingPhoto);
    const [name, setName] = useState(listing?.name || '')
    const [category, setCategory] = useState(listing?.category || 1)
    const [description, setDescription] = useState(listing?.description || '')
    const [price, setPrice] = useState(listing?.price || 0);
    const [quantity, setQuantity] = useState(listing?.quantity || 1);

    const [errors, setErrors] = useState({});
    const [hidden, setHidden] = useState('hidden');
    const [submitted, setSubmitted] = useState(false);


    useEffect(() => {
        if (productId) dispatch(fetchListing(productId))
    }, [dispatch])

    useEffect(() => {
        const errorObj = {};
        const fileTypes = ['.jpeg', '.png', '.jpg'];

        if (!photo) errorObj['photo'] = 'A photo is required';
        if (!name) errorObj['name'] = 'A name is required';
        if (!description) errorObj['description'] = 'A description is required';
        if (price <= 0 ) errorObj['price'] = 'Please set a price of at least $0.01';
        if (quantity < 1) errorObj['quantity'] = 'Please set a quantity of at least 1';
        if (!(fileTypes.some(type => {
            return photo.endsWith(type)})) && photo.length) {
            errorObj['photo'] = 'Photo URL must end in .png, .jpg, or .jpeg';
        }
        if (submitted) {
            //set them visible instead
        setErrors(errorObj);
        }
    }, [photo, name, description, price, quantity, submitted])


    const cancel = () => {
        history.push('/')
    }

    if (productId) {
        if (!listing) return null;
        if (listing && +productId !== listing.id) return null;
    }

    let title;
    let buttonText;
    if (productId) {
        title = 'Update your listing';
        buttonText = 'Update'
    }
    else {
        title = 'Create a listing'
        buttonText = 'Post'
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await setSubmitted(true);

        const product = {
            name, description, price, quantity, categoryId: category
        }
        if (submitted && !Object.keys(errors).length){
            if (productId) {
                product.id = productId;
                await dispatch(updatedListing(product))
                const newImage = { url: photo, productId }
                await dispatch(postImage(newImage))
                history.push(`/listings/${productId}`)
            } else {
            const newListing = await dispatch(createListing(product))

            if (newListing.id) {
                const newImage = { url: photo, productId: newListing.id }
                await dispatch(postImage(newImage))
                history.push(`/listings/${newListing.id}`)

            }}
        } else return
    }

    return (
        <div className='flex-div'>
    <form onSubmit={handleSubmit} className="list-form-box">

            <h1>{title}</h1>

            <div className='div-border'>
                <p className='p-margin'>Listing details</p>
                <div>
                    
                    <label>Photo</label>
                    <input type='url' className='form-input'
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    />
                    
                 {errors.photo && <p className='errors'>{errors.photo}</p>}
                </div>

                <div>
                    
                    <label>Name</label>
                    <input type='text' className='form-input' 
                    value={name}
                    maxLength="50"
                    onChange={(e) => setName(e.target.value)}
                    />
                    
                {errors.name && <p className='errors'>{errors.name}</p>}
                </div>

                <div>
                <label>Category</label>
                <select name="category" id="cat" required
                    onChange={(e) => setCategory(e.target.value)}
                    >
                    <option value="1">Dairy</option>
                    <option value="2">Beef</option>
                    <option value="3">Other</option>
                    
                    </select>
                </div>

                <div>
                    
                    <label id='desc'>Description</label>
                    <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="8" cols="75"
                    maxLength="1000"
                    />
                {errors.description && <p className='errors'>{errors.description}</p>}
                </div>
                
            </div>

            <div className='div-border'>
                <p className='p-margin'>Inventory and pricing</p>
                <div>
                    
                    <label>Price</label>
                    <div id='price-div'>
                    <span id='price-tag'>$</span>
                    <input
                        className='input2'
                        id='price-input'
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    </div>
                {errors.price && <p className='errors'>{errors.price}</p>}
                </div>


                <div>
    
                    <label>Quantity</label>
                    <input
                        className='input2'
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    
                {errors.quantity && <p className='errors'>{errors.quantity}</p>}
                </div>

            </div>

            <div className='cancel-post-div'>
            <button className='button-white' onClick={cancel}>Cancel</button>
            <button className='button-black' type="submit">{buttonText}</button>
            </div>
        </form>
        </div>
    )
}

export default ListingForm;