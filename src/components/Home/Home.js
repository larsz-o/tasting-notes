import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReviewForm from '../ReviewForm/ReviewForm';

class Home extends Component {
  componentDidMount(){
    this.props.dispatch({type: 'FETCH_WHISKEY'});
  }
  render() {
    //returns an array of just the names of the whiskeys
    //when selected, i'll need to filter through the whole dataset to get the right information to fill in the rest of the form 
    let options = this.props.whiskey.map(whiskey => whiskey.name);
    return (
      <div>
        <ReviewForm options={options}/>
        A list of all of your recent reviews will go here. Off to the side, you'll see a list of your friends' latest reviews.
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  whiskey: state.whiskey
});


export default connect(mapStateToProps)(Home);
