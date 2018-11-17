import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { connect } from 'react-redux';

class ReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            date: '',
            price: '0.00',
            appearance: '',
            nose: '',
            taste: '',
            location: '',
            bottle_condition: '',
            glass_type: '',
            rating: 0,
            notes: ''
        }
    }
    addWhiskey = () => {
        console.log('You need to add a new whiskey to the database!');
    }
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_WHISKEY' });
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
        return (
            <div>
                <h2 className="title">Review a New Whiskey</h2>
                <div className="flex-box">
                    <button className="button" onClick={this.addWhiskey}>Suggest Addition</button>
                </div>
                <form className="review-form">
                    <FormGroup controlId="addWhiskeyForm">
                        <ControlLabel>Whiskey Name</ControlLabel>
                        <Typeahead
                            labelKey="name"
                            multiple={false}
                            options={options}
                            placeholder="Start typing..."
                            // when a whiskey is selected, we look for the ID against the array of whiskeys in state, then set state with the name and ID#
                            onChange={(selected) => {
                                let id = 0;
                                for (let i = 0; i < this.props.whiskey.length; i++) {
                                    if (this.props.whiskey[i].name == selected[0]) {
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
                        />
                        <ControlLabel>Date</ControlLabel>
                        <FormControl type="date" onChange={(event) => this.handleChangeFor(event, 'date')} required />
                        <ControlLabel>Price</ControlLabel>
                        <FormControl type="number" step="0.01" min="0" onChange={(event) => this.handleChangeFor(event, 'price')} />
                        <ControlLabel>Appearance</ControlLabel>
                        <FormControl type="text" placeholder="e.g. color, legs" onChange={(event) => this.handleChangeFor(event, 'appearance')} />
                        <ControlLabel>Nose</ControlLabel>
                        <FormControl type="text" placeholder="e.g. aroma" onChange={(event) => this.handleChangeFor(event, 'nose')} />
                        <ControlLabel>Taste</ControlLabel>
                        <FormControl type="text" onChange={(event) => this.handleChangeFor(event, 'taste')} />
                        <ControlLabel>Where Did You Try It?</ControlLabel>
                        <FormControl type="text" onChange={(event) => this.handleChangeFor(event, 'location')} />
                        <ControlLabel>Bottle Condition</ControlLabel>
                        <FormControl componentClass="select" placeholder="select one" onChange={(event) => this.handleChangeFor(event, 'bottle_condition')}>
                            <option value="">Don't Know</option>
                            <option value="1">Unopened</option>
                            <option value="2">3/4 Full</option>
                            <option value="3">2/3 Full</option>
                            <option value="4">1/2 Full</option>
                            <option value="5">1/3 Full</option>
                            <option value="6">1/4 Full</option>
                            <option value="7">Nearly Empty</option>
                        </FormControl>
                        <ControlLabel>Glass Type</ControlLabel>
                        <Typeahead
                            labelKey="name"
                            multiple={false}
                            options={glasses}
                            placeholder="Start typing..."
                            onChange={(selected) => {
                                this.setState({
                                    glass_type: selected[0]
                                })
                            }}
                        />
                        <ControlLabel>Rating</ControlLabel>
                        <FormControl type="number" max="10" min="0" onChange={(event) => this.handleChangeFor(event, 'rating')} required />
                        <ControlLabel>Notes</ControlLabel>
                        <FormControl type="text" onChange={(event) => this.handleChangeFor(event, 'notes')} />
                        <ControlLabel>Would you get this again?</ControlLabel>
                        <FormGroup>
                            <input type="radio" name="radioGroup" value="yes" inline="true" onChange={(event) => this.handleChangeFor(event, 'repeat')} /> Yes {' '}
                            <input type="radio" name="radioGroup" value="maybe" inline="true" onChange={(event) => this.handleChangeFor(event, 'repeat')} /> Maybe {' '}
                            <input type="radio" name="radioGroup" value="no" inline="true" onChange={(event) => this.handleChangeFor(event, 'repeat')} /> No {' '}
                        </FormGroup>
                    </FormGroup>
                    <Button onClick={(event) => this.submitReview(event)} type="submit">Submit</Button>
                    {/* todo: add information about whiskey from database to the confirmation page  */}
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    whiskey: state.whiskey
})
export default connect(mapStateToProps)(ReviewForm); 