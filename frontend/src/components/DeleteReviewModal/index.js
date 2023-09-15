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
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to delete this review?</h3>
        <button onClick={confirmDelete}>Delete</button>
        <button onClick={closeModal}>Cancel</button>
        </div> 
    )
}

export default DeleteReviewModal;