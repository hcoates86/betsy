import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { postReview } from '../../store/reviews';
import { useModal } from "../../context/Modal";

function ReviewModal({productId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true);
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    // const [filled, setFilled] = useState('☆');
    // const [mouseStar, setMouseStar] = useState(0) 
    
  const [buttonClass, setButtonClass] = useState('');

    const starDiv1 = document.querySelector('.one-star');
    const starDiv2 = document.querySelector('.two-star');
    const starDiv3 = document.querySelector('.three-star');
    const starDiv4 = document.querySelector('.four-star');
    const starDiv5 = document.querySelector('.five-star');


    useEffect(() => {
        disabled ? setButtonClass('button-white') : setButtonClass('button-black')
    }, [disabled])


    useEffect (() => {
        if(review.length >= 4 && stars) setDisabled(false);
        if(review.length < 4) setDisabled(true);
        if(!stars) setDisabled(true);
    }, [review, stars])
    

    useEffect (() => {
        if (stars >= 1 ) starDiv1.innerText = '★';
        if (stars >= 2 ) starDiv2.innerText = '★';
        if (stars >= 3 ) starDiv3.innerText = '★';
        if (stars >= 4 ) starDiv4.innerText = '★';
        if (stars === 5 ) starDiv5.innerText = '★';

        if (stars >=1) {
            if (stars < 2) starDiv2.innerText = '☆';
            if (stars < 3) starDiv3.innerText = '☆';
            if (stars < 4) starDiv4.innerText = '☆';
            if (stars < 5) starDiv5.innerText = '☆';
        }
        
    }, [stars, starDiv1, starDiv2, starDiv3, starDiv4, starDiv5])

    // useEffect(() => {
    
    //     if (mouseStar >= 1 ) starDiv1.innerText = '★';
    //     if (mouseStar >= 2 ) starDiv2.innerText = '★';
    //     if (mouseStar >= 3 ) starDiv3.innerText = '★';
    //     if (mouseStar >= 4 ) starDiv4.innerText = '★';
    //     if (mouseStar === 5 ) starDiv5.innerText = '★';

    //     // if (stars >=1) {
    //     //     if (stars < 2 && mouseStar > 2) starDiv2.innerText = '☆';
    //     //     if (stars < 3) starDiv3.innerText = '☆';
    //     //     if (stars < 4) starDiv4.innerText = '☆';
    //     //     if (stars < 5) starDiv5.innerText = '☆';
    //     // }
        
    // }), [mouseStar]
    

    // useEffect(()=> {
    //     const errorObj = {};
    //     setErrors(errorObj)
    //     if (!Object.values(errorObj).length) {
    //         setDisabled(false);
    //         setButtonClass('button-orange')
    //         } if (Object.values(errorObj).length) {
    //             setDisabled(true);
    //             setButtonClass('');
    //         }
    // }, [])

//★☆
    const starChecker = (num) => {
        setStars(+num);
    }

    const postYourReview = async () => {
        const newReview = {comment: review, stars}
        await dispatch(postReview({newReview, productId}));
        closeModal();
    };
  

    return (
        <div className="rev-modal">
        <h1>Leave a review</h1>
        <p className='errors'></p>

        <p>{errors.message}</p>
        <textarea 
            className='' 
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows="8" cols="50"
            placeholder='Leave your review here...'
        />
        <div className='starSelect'>
            <div className='star-filled one-star' 
            onClick={()=> {starChecker('1')}}
            // onMouseOver={setMouseStar(1)}
            // onMouseLeave={setMouseStar(0)}
            >☆</div>
            <div className='star-filled two-star' onClick={()=> {starChecker('2')}}>☆</div>
            <div className='star-filled three-star' onClick={()=> {starChecker('3')}}>☆</div>
            <div className='star-filled four-star' onClick={()=> {starChecker('4')}}>☆</div>
            <div className='star-filled five-star' onClick={()=> {starChecker('5')}}>☆</div>
            <span id='starSpan'> Stars</span>
            </div>
        <button disabled={disabled} onClick={postYourReview} id='postRevButton' className={buttonClass}>Post</button>
        </div>
    )
}

export default ReviewModal;