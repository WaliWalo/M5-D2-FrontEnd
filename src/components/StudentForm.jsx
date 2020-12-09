import React, { Component } from "react";
import { Form, Col, Button, Alert, Spinner } from "react-bootstrap";
import { postStudent, putStudent } from "../api/student";
let validator = require("email-validator");

export default class StudentForm extends Component {
  state = {
    student: {
      name: "",
      surname: "",
      email: "",
      dob: "",
    },
    emailValid: true,
    submitted: false,
    submitResult: "",
    loading: false,
  };

  handleInput = (e) => {
    this.setState({
      student: { ...this.state.student, [e.target.id]: e.target.value },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.props.student) {
      let modify = this.props.modified;
      this.setState({ loading: true });
      this.setState({ emailValid: true });
      const result = await putStudent(
        this.state.student,
        this.props.student.id
      );
      if (typeof result === "string") {
        this.setState({ submitResult: result });
      } else if (result.errors) {
        let error = result.errors.reduce(
          (accumulator, currentValue) => accumulator + currentValue.msg,
          ""
        );
        this.setState({ submitResult: error });
      }
      this.setState({ submitted: true, loading: false });
      let hideModal = this.props.onHide;
      modify();
      hideModal();
    } else {
      if (validator.validate(this.state.student.email)) {
        let modify = this.props.handleModified;
        this.setState({ loading: true });
        this.setState({ emailValid: true });
        const result = await postStudent(this.state.student);
        console.log(result.errors);
        if (typeof result === "string") {
          this.setState({ submitResult: result });
        } else if (result.errors) {
          let error = result.errors.reduce(
            (accumulator, currentValue) => accumulator + currentValue.msg,
            ""
          );
          this.setState({ submitResult: error });
        }
        this.setState({
          submitted: true,
          loading: false,
        });
        modify();
      } else {
        this.setState({ emailValid: false });
      }
    }
  };

  componentDidMount = () => {
    if (this.props.student) {
      this.setState({ student: this.props.student });
    }
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Col>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                onChange={this.handleInput}
                value={this.state.student.name}
                required
              />
            </Col>
            <Col>
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                id="surname"
                name="surname"
                onChange={this.handleInput}
                value={this.state.student.surname}
                required
              />
            </Col>
            <Col>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                id="dob"
                name="dob"
                onChange={this.handleInput}
                value={this.state.student.dob}
                required
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              id="email"
              name="email"
              onChange={this.handleInput}
              value={this.state.student.email}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Row>
          {!this.state.emailValid && (
            <Alert variant="danger">Please enter a valid email.</Alert>
          )}
          {this.state.submitResult !== "" && (
            <Alert variant="warning">{this.state.submitResult}</Alert>
          )}
          {this.state.loading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}
