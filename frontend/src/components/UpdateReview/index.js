import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { editReview } from '../../store/reviews';
import { useModal } from "../../context/Modal";

function UpdateReview({reviewUpdating}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(false);
    const [review, setReview] = useState(reviewUpdating.comment);
    const [stars, setStars] = useState(reviewUpdating.stars);
    const [star1, setStar1] = useState('☆');
    const [star2, setStar2] = useState('☆');
    const [star3, setStar3] = useState('☆');
    const [star4, setStar4] = useState('☆');
    const [star5, setStar5] = useState('☆');

    
    const [buttonClass, setButtonClass] = useState('');

    // const starDiv1 = document.querySelector('.one-star');
    // const starDiv2 = document.querySelector('.two-star');
    // const starDiv3 = document.querySelector('.three-star');
    // const starDiv4 = document.querySelector('.four-star');
    // const starDiv5 = document.querySelector('.five-star');


    useEffect(() => {
        disabled ? setButtonClass('button-white') : setButtonClass('button-black')
    }, [disabled])


    useEffect (() => {
        if(review.length >= 4 && stars) setDisabled(false);
        if(review.length < 4) setDisabled(true);
        if(!stars) setDisabled(true);
    }, [review, stars])
    

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

    const postYourReview = async () => {
        const newReview = {...reviewUpdating, comment: review, stars}
        await dispatch(editReview({newReview}));
        closeModal();
    };
  

    return (
        <div className="rev-modal">
        <h1>Update your review</h1>
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
            onClick={()=> {setStars(1)}}
            >{star1}</div>
            <div className='star-filled two-star' onClick={()=> {setStars(2)}}>{star2}</div>
            <div className='star-filled three-star' onClick={()=> {setStars(3)}}>{star3}</div>
            <div className='star-filled four-star' onClick={()=> {setStars(4)}}>{star4}</div>
            <div className='star-filled five-star' onClick={()=> {setStars(5)}}>{star5}</div>
            <span id='starSpan'> Stars</span>
            </div>
        <button disabled={disabled} onClick={postYourReview} id='postRevButton' className={buttonClass}>Update</button>
        </div>
    )
}

export default UpdateReview;