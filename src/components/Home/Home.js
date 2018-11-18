import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReviewCard from '../ReviewCard/ReviewCard'
import { Grid, Col, Row } from 'react-bootstrap'; 

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
        <Grid>
          <Row>
            <Col xs={12} md={8}>
            <h2>Your Latest Reviews</h2>
          {this.props.reviews.map((review, i) => {
            return (
              <ReviewCard review={review} key={i}/>
            );
          })}
            </Col>
            <Col xs={12} md={4}>
            <h2>Friends' Activity</h2>
            </Col>
          </Row>
        </Grid>
       
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  reviews: state.reviews
});


export default connect(mapStateToProps)(Home);
