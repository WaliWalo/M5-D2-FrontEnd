import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import StudentForm from "./StudentForm";
export default class MyModal extends Component {
  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <StudentForm
              student={this.props.student}
              modified={this.props.modified}
              onHide={this.props.onHide}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
