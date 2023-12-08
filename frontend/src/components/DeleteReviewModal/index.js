import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/reviews';
import { useModal } from "../../context/Modal";
import { fetchListing } from '../../store/listings';

function DeleteReviewModal({reviewId, productId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const confirmDelete = async () => {
        await dispatch(deleteReview(reviewId));
        await dispatch(fetchListing(productId));
        closeModal();
    };
  

    return (
        <div className="del-modal">
        <h2>Are you sure you want to delete this review?</h2>
        <button className='margin-bottom button-delete' onClick={confirmDelete}>Delete</button>
        <button className='button-white button-delete' onClick={closeModal}>Cancel</button>
        </div> 
    )
}

export default DeleteReviewModal;