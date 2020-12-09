import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { deleteStudent } from "../api/student";
import MyModal from "./MyModal";

export default class ListStudents extends Component {
  state = {
    show: false,
  };

  handleRemove = async () => {
    console.log(this.props.student);
    const result = await deleteStudent(this.props.student.id);
    alert(result);
    this.props.modified();
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <>
        <MyModal
          show={this.state.show}
          onHide={this.handleClose}
          student={this.props.student}
          modified={this.props.modified}
        />
        <tr>
          <td>{this.props.index}</td>
          <td>{this.props.student.name}</td>
          <td>{this.props.student.surname}</td>
          <td>{this.props.student.email}</td>
          <td>{this.props.student.dob}</td>
          {this.props.student.numberOfProjects ? (
            <td>{this.props.student.numberOfProjects}</td>
          ) : (
            <td>0</td>
          )}
          <td>
            <Button variant="dark" onClick={this.handleShow}>
              Update
            </Button>
            <Button variant="dark" onClick={this.handleRemove}>
              Remove
            </Button>
          </td>
        </tr>
      </>
    );
  }
}
