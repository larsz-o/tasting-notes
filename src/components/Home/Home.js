import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    return (
      <div>
        A list of all of your recent reviews will go here. Off to the side, you'll see a list of your friends' latest reviews.
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});


export default connect(mapStateToProps)(Home);
