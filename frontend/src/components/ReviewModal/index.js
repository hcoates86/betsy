import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { editReview, postReview } from '../../store/reviews';
import { useModal } from "../../context/Modal";


function ReviewModal({review, productId, type}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(false);
    const [comment, setComment] = useState(review?.comment || '');
    const [stars, setStars] = useState(review?.stars || 0);
    const [star1, setStar1] = useState('☆');
    const [star2, setStar2] = useState('☆');
    const [star3, setStar3] = useState('☆');
    const [star4, setStar4] = useState('☆');
    const [star5, setStar5] = useState('☆');

    
    const [buttonClass, setButtonClass] = useState('');

    useEffect(() => {
        disabled ? setButtonClass('button-white') : setButtonClass('button-black')
    }, [disabled])


    useEffect (() => {
        if(comment.length >= 4 && stars) setDisabled(false);
        if(comment.length < 4) setDisabled(true);
        if(!stars) setDisabled(true);
    }, [comment, stars])
    

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
        if (type === 'create') {
            const newReview = {comment, stars}
            await dispatch(postReview({newReview, productId}));
        } 
        
        if (type === 'update') {
            const newReview = {id: review.id, comment, stars}
            await dispatch(editReview(newReview));
        }

        closeModal();
    };
  

    return (
        <div className="rev-modal">
        <h1>{title}</h1>
        <p className='errors'></p>

        <p>{errors.message}</p>
        <textarea 
            className='' 
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
        <button disabled={disabled} onClick={postYourReview} id='postRevButton' className={buttonClass}>{buttonText}</button>
        </div>
    )
}

export default ReviewModal;