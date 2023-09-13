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
            <h1>Are you sure you want to delete this listing?</h1>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={closeModal}>Cancel</button>
        </div>
    )
}

export default DeleteListing;