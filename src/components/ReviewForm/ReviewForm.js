import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { connect } from 'react-redux';
import AddWhiskey from '../AddWhiskey/AddWhiskey';

const mapStateToProps = state => ({
    whiskey: state.whiskey,
    oldWhiskey: state.reviews.whiskeyToReview
});
let empty; 
class ReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            date: '',
            price: '0.00',
            location: '',
            glass_type: '',
            rating: 0,
            notes: ''
        }
    }
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_WHISKEY' });
        //if redux state contains an existing whiskey to review, set it in state so the user doesn't have to select it from the list again
        if(!empty){
            this.setState({
                id: this.props.oldWhiskey.id, 
                name: this.props.oldWhiskey.name
            })
        }
    }
    convertData = () => {
        //convert the price to a float so that it is formatted correctly for the database
        let price = parseFloat(this.state.price);
        this.setState({
            ...this.state,
            price: price,
        })
        this.sendToRedux();

    }
    handleChangeFor = (event, property) => {
        this.setState({
            ...this.state,
            [property]: event.target.value
        })
    }
    sendToRedux = () => {
        this.props.dispatch({ type: 'SUBMIT_REVIEW', payload: this.state });
        alert('Review submitted!');
        this.props.history.push('/home');
    }
    submitReview = (event) => {
        event.preventDefault();
        this.convertData();
    }
    render() {
        //returns an array of just the names of the whiskeys
        //when selected, i'll need to filter through the whole dataset to get the right information to fill in the rest of the form 
        let options = this.props.whiskey.map(whiskey => whiskey.name);
        let glasses = ['Glencairn', 'Tulip', 'Tumbler/Old-Fashioned', 'Highball', 'Snifter', 'NEAT', 'Other'];
        // checks to see if a whiskey is in redux or not. 
        empty = Object.keys(this.props.oldWhiskey).length === 0; 
        return (
            <div>
                <h2 className="title">Review a Whiskey</h2>
                <div className="flex-box">
                    <AddWhiskey dispatch={this.props.dispatch}/>
                </div>
                <form className="review-form">
                    <FormGroup controlId="addWhiskeyForm">
                    {empty && <div><ControlLabel>Whiskey Name</ControlLabel>
                        <Typeahead
                            labelKey="name"
                            multiple={false}
                            options={options}
                            placeholder="Start typing..."
                            // when a whiskey is selected, we look for the ID against the array of whiskeys in the redux state, then set state with the name and ID#
                            onChange={(selected) => {
                                let id = 0;
                                for (let i = 0; i < this.props.whiskey.length; i++) {
                                    if (this.props.whiskey[i].name === selected[0]) {
                                        console.log(this.props.whiskey[i]);
                                        id = this.props.whiskey[i].id;
                                        console.log(id);
                                        this.setState({
                                            name: selected[0],
                                            id: id
                                        })
                                        return this.props.whiskey[i];
                                    }
                                }
                            }}
                            required
                        /></div>}
                        {!empty && <h3 className="center">{this.props.oldWhiskey.name}</h3>}
                        <ControlLabel>Date Consumed</ControlLabel>
                        <FormControl type="date" onChange={(event) => this.handleChangeFor(event, 'date')} required />
                        <ControlLabel>Price</ControlLabel>
                        <FormControl type="number" step="0.01" min="0" onChange={(event) => this.handleChangeFor(event, 'price')} required/>
                        <ControlLabel>Where Did You Try It?</ControlLabel>
                        <FormControl type="text" onChange={(event) => this.handleChangeFor(event, 'location')} required/>
                        <ControlLabel>Glass Type</ControlLabel>
                        <Typeahead
                            labelKey="name"
                            multiple={false}
                            options={glasses}
                            required
                            placeholder="Start typing..."
                            onChange={(selected) => {
                                this.setState({
                                    glass_type: selected[0]
                                })
                            }}
                        />
                        <ControlLabel>Rating (0-10)</ControlLabel>
                        <FormControl type="number" max="10" min="0" onChange={(event) => this.handleChangeFor(event, 'rating')} required />
                        <ControlLabel>Notes</ControlLabel>
                        <FormControl componentClass="textarea" onChange={(event) => this.handleChangeFor(event, 'notes')} multiline="true" required/>
                        <ControlLabel>Would you get this again?</ControlLabel>
                        <FormGroup>
                            <input type="radio" name="radioGroup" value="yes" inline="true" onChange={(event) => this.handleChangeFor(event, 'repeat')} /> Yes {'   '}
                            <input type="radio" name="radioGroup" value="maybe" inline="true" onChange={(event) => this.handleChangeFor(event, 'repeat')} /> Maybe {'   '}
                            <input type="radio" name="radioGroup" value="no" inline="true" onChange={(event) => this.handleChangeFor(event, 'repeat')} /> No {'   '}
                        </FormGroup>
                    </FormGroup>
                    <Button onClick={(event) => this.submitReview(event)} type="submit">Submit</Button>
                    {/* todo: add information about whiskey from database to the confirmation page  */}
                </form>
            </div>
        );
    }
}
export default connect(mapStateToProps)(ReviewForm); 