import React, { Component } from 'react';
import moment from 'moment'; 
import { connect } from 'react-redux'; 

class ReviewCard extends Component {
    addNewReview = () => {
       // nav to add review page, but send details about name, id, origin, type to that form
       // through redux
       this.props.dispatch({type: 'SET_WHISKEY_TO_REVIEW', payload: this.props.review});
       this.props.history.push('/add-review'); 
    }
    render(){
        return(
        <div className="review-card">
                <h3>{this.props.review.name}</h3>
                <h4>{this.props.review.origin}</h4>
                <h5>{this.props.review.type}</h5>
                <br />
                <p>Tried on {moment(this.props.review.date).format('LL')} at {this.props.review.location}</p>
                <p>Price: $ {this.props.review.price}</p>
                <p>Glass Type: {this.props.review.glass_type}</p>
                <p>Notes: {this.props.review.notes}</p>
                <p>Would try again?: {this.props.review.repeat}</p>
                <img src={require('./add.png')} onClick={this.addNewReview}/>
           </div>
        );
    }
}

export default connect()(ReviewCard); 