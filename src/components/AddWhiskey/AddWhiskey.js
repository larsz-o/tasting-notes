import React, { Component } from 'react';
import { Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { connect } from 'react-redux';

class AddWhiskey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name: '',
            origin: '',
            type: ''
        }
    }
    addWhiskey = () => {
        this.setState({
            ...this.state,
            show: true
        })
    }
    handleChangeFor = (event, property) => {
        this.setState({
            ...this.state, 
            [property]: event.target.value
        })
    }
    handleHide = () => {
        this.setState({
            ...this.state,
            show: false
        })
    }
    submitAddition = (event) => {
        event.preventDefault();
        this.setState({
            ...this.state, 
            show: false
        })
        this.props.dispatch({type: 'ADD_WHISKEY_TYPE', payload: this.state})
    }
    render() {
        return (
            <div>
                <button className="button" onClick={this.addWhiskey}>Suggest Addition</button>
                <Modal show={this.state.show} onHide={this.handleHide}>
                    <Modal.Title className="title">Suggest Addition</Modal.Title>
                    <Modal.Body>
                        <form onSubmit={(event)=>this.submitAddition(event)}>
                            <FormGroup>
                                <ControlLabel>Name</ControlLabel>
                                <FormControl type="text" value={this.state.name} onChange={(event)=>this.handleChangeFor(event, 'name')} required/>
                                <ControlLabel>Country of Origin</ControlLabel>
                                <FormControl type="text" value={this.state.origin} onChange={(event)=>this.handleChangeFor(event, 'origin')} required/>
                                <ControlLabel>Type</ControlLabel>
                                <FormControl componentClass="select" value={this.state.name} onChange={(event)=>this.handleChangeFor(event, 'type')} required>
                                    <option value="Barley">Barley</option>
                                    <option value="Blend">Blend</option>
                                    <option value="Bourbon">Bourbon</option>
                                    <option value="Grain">Grain</option>
                                    <option value="Malt">Malt</option>
                                    <option value="Rye">Rye</option>
                                    <option value="Wheat">Wheat</option>
                                    <option value="Whiskey">Whiskey</option>
                                </FormControl>
                            </FormGroup>
                            <button type="submit" className="button">Submit</button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );

    }
}
export default connect(AddWhiskey); 