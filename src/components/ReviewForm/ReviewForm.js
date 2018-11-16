import React, { Component } from 'react';
import { Button, Modal, FormGroup, FormControl, ControlLabel, Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

class ReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    handleShow = () => {
        this.setState({
            open: true
        })
    }
    render() {
     
        return (
            <div>
                <Button bsStyle="info" bsSize="large" onClick={this.handleShow}>
                    Add Review
                </Button>
                <Modal show={this.state.open} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup controlId="addWhiskeyForm">
                                <ControlLabel>Whiskey: </ControlLabel>

                                <Typeahead
                                    labelKey="name"
                                    multiple={false}
                                    options={this.props.options}
                                    placeholder="Choose a state..."
                                />
                            </FormGroup>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
export default ReviewForm; 