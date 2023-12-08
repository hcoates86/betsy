import './About.css';
import listing from '../../images/listing.png';
import category from '../../images/category.png';
import createlisting from '../../images/createlisting.png';
import yourlistings from '../../images/yourlistings.png';
import cart from '../../images/cart.png';
import review from '../../images/review.png';
import frontpage from '../../images/frontpage.png';

const About = () => {

    return (
        <>
        <h1 className='text-align'>About Betsy</h1>
        <div className='tagline'>
                <h3 className='text-right'>Find the cow your heart desires...</h3>
            <h3 className='text-left'>...or sell the one it doesn't.</h3>
            </div>
        <div className='betsy-about'>
            <p>At Betsy, we're dedicated to helping the average farmer (that's you) find the cow they're looking for.
                Or, if you're looking to unload some extra cattle, find the right home for them. We host sales for everything from
                dairy cows, to those intended for the dinner table, to whatever you might need a cow for. 
            </p>
            <p>
                So get on over there and buy yourself a cow.

            </p>
        </div>
        <div className='text-align'>
            <img className='screenshot' src={frontpage} alt='front page'></img>

            <p>The front page shows off some of the listings available on Betsy. You can return to the front page at any time by clicking the Betsy logo on the top left.</p>

            <img className='screenshot' src={category} alt='categories'></img>
            <p>Cows are divided into categories. Browse through the categories or view all of the cows available at once.</p>

            <img className='screenshot' src={listing} alt='listing'></img>
            <p>When viewing a listing, you're able to add cows to your cart or leave a review.</p>
        
            <img className='screenshot' src={review} alt='review'></img>
            <p>Leaving a review is easy! Write your comment in the box, click the star amount you'd like to rate it, and then press the big "post" button.</p>

            <img className='screenshot' src={cart} alt='cart'></img>
            <p>Once you press the "Add to Cart" button on a listing, you'll be redirected to your cart. Here you can
                modify the quantity of each cow, remove them, and checkout.
            </p>

            <img className='screenshot' src={createlisting} alt='create listing'></img>
            <p>Click the cow icon on the navigation bar to create a new listing.</p>

            <img className='screenshot' src={yourlistings} alt='your listings'></img>
            <p>You can view all your listings under the "My Listings" link.</p>

        </div>

        </>
    )
}


export default About;