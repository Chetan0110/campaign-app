import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

export default class EditModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            changedName: this.props.campaign.name
        }
    }
    onNameChange = (event) => {
        this.setState({changedName: event.target.value})
    }
    render() {
        return (
            <Modal show={true} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Campaign</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label> Name: </label>
                    <input name="name" value={this.state.changedName} onChange={(e) => this.onNameChange(e)}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => this.props.saveModalChanges(this.state.changedName)}>
                        Save
                    </Button>
                </Modal.Footer>
        </Modal>
        )
    }
}