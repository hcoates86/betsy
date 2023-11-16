import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeListing } from '../../store/listings';

const DeleteListing = ({ productId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(removeListing(productId)).then(closeModal)
    }

    return (
        <div>
            <h2>Are you sure you want to delete this listing?</h2>
            <button className='margin-bottom' onClick={handleDelete}>Delete</button>
            <button className='button-white' onClick={closeModal}>Cancel</button>
        </div>
    )
}

export default DeleteListing;