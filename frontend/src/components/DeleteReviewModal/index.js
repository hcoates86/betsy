import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/reviews';
import { useModal } from "../../context/Modal";

function DeleteReviewModal({reviewId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const confirmDelete = async () => {
        await dispatch(deleteReview(reviewId));
        closeModal();
    };
  

    return (
        <div className="del-modal">
        <h2>Are you sure you want to delete this review?</h2>
        <button className='margin-bottom' onClick={confirmDelete}>Delete</button>
        <button className='button-white' onClick={closeModal}>Cancel</button>
        </div> 
    )
}

export default DeleteReviewModal;