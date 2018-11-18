import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'; 

class Home extends Component {
  componentDidMount() {
    this.getReviews();
  }
  getReviews = () => {
    this.props.dispatch({ type: 'FETCH_USER_REVIEWS' });
  }
  render() {
    // if there are multiple reviews for a whiskey, only render the name once. 
    // make an array of whiskey_id's then render the correct details for each whiskey_id on a card? 
    return (
      <div>
        A list of all of your recent reviews will go here. Off to the side, you'll see a list of your friends' latest reviews.
        <div className="flex-box">
          {this.props.reviews.map((review, i) => {
            return (
              <div className="review-card" key={i}>
                <h3>{review.name}</h3>
                <h4>{review.origin}</h4>
                <h5>{review.type}</h5>
                <br />
                <p>Tried on {moment(review.date).format('LL')} at {review.location}</p>
                <p>Price: $ {review.price}</p>
                <p>Glass Type: {review.glass_type}</p>
                <p>Bottle Condition: {review.bottle_condition}</p>
                <p>Notes: {review.notes}</p>
                <p>Would try again?: {review.repeat}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  reviews: state.reviews
});


export default connect(mapStateToProps)(Home);
