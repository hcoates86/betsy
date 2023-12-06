import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { editReview, postReview } from '../../store/reviews';
import { useModal } from "../../context/Modal";
import { fetchListing } from '../../store/listings';


function ReviewModal({review, productId, type}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({});
    const [comment, setComment] = useState(review?.comment || '');
    const [stars, setStars] = useState(review?.stars || 0);
    const [star1, setStar1] = useState('☆');
    const [star2, setStar2] = useState('☆');
    const [star3, setStar3] = useState('☆');
    const [star4, setStar4] = useState('☆');
    const [star5, setStar5] = useState('☆');
    const [submitted, setSubmitted] = useState(false);
    const [hidden, setHidden] = useState('hidden');
    const [buttonClass, setButtonClass] = useState('');

    useEffect(() => {
        const errorObj = {};

        if (!stars) errorObj['stars'] = 'Please set a star rating of at least 1.';
        if (!comment || comment.length < 4) errorObj['comment'] = 'Please leave a review with at least 4 characters.';
        setErrors(errorObj);
        if (submitted) {
            //sets errors visible after clicking submit
            setHidden('errors')
        }

    }, [stars, comment, submitted])
    
    console.log(errors);

    useEffect (() => {
        if (stars >= 1 ) setStar1('★');
        if (stars >= 2 ) setStar2('★');
        if (stars >= 3 ) setStar3('★');
        if (stars >= 4 ) setStar4('★');
        if (stars === 5 ) setStar5('★');

        if (stars >=1) {
            if (stars < 2) setStar2('☆');
            if (stars < 3) setStar3('☆');
            if (stars < 4) setStar4('☆');
            if (stars < 5) setStar5('☆');
        }
        
    }, [stars, star1, star2, star3, star4, star5])

    let title;
    let buttonText;
    if (type === 'create') {
        title = 'Leave a review'
        buttonText = 'Post'
    }
    if (type === 'update') {
        title = 'Update your review'
        buttonText = 'Update'
    }

    const postYourReview = async () => {
        setSubmitted(true)
        if (!Object.keys(errors).length){
            if (type === 'create') {
                const newReview = {comment, stars}
                await dispatch(postReview({newReview, productId}));
                await dispatch(fetchListing(productId));
            } 
            
            if (type === 'update') {
                const newReview = {id: review.id, comment, stars}
                await dispatch(editReview(newReview));
                await dispatch(fetchListing(productId));
            }

            closeModal();
        }
    };
  

    return (
        <div className="rev-modal">
        <h1>{title}</h1>

        {errors.comment && <p className={hidden}>{errors.comment}</p>}
        {errors.stars && <p className={hidden}>{errors.stars}</p>}
        <textarea 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="8" cols="50"
            placeholder='Leave your review here...'
        />
        <div className='starSelect'>
            <div className='star-filled one-star' 
            onClick={()=> {setStars(1)}}
            >{star1}</div>
            <div className='star-filled' onClick={()=> {setStars(2)}}>{star2}</div>
            <div className='star-filled' onClick={()=> {setStars(3)}}>{star3}</div>
            <div className='star-filled' onClick={()=> {setStars(4)}}>{star4}</div>
            <div className='star-filled' onClick={()=> {setStars(5)}}>{star5}</div>
            <span id='starSpan'> Stars</span>
            </div>
        <button onClick={postYourReview} id='postRevButton' className={buttonClass}>{buttonText}</button>
        </div>
    )
}

export default ReviewModal;