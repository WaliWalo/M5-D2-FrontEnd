import React, { Component } from "react";
import { Form, Col, Alert, Spinner, Button } from "react-bootstrap";
import { postProject } from "../api/projects";

export default class ProjectForm extends Component {
  state = {
    submitResult: "",
    loading: false,
    project: {
      name: "",
      description: "",
      created: "",
      repoUrl: "",
      liveUrl: "",
      studentId: this.props.student.id,
    },
  };

  handleInput = (e) => {
    this.setState({
      project: { ...this.state.project, [e.target.id]: e.target.value },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const submitResult = await postProject(this.state.project);
    if (submitResult.errors) {
      let error = submitResult.errors.reduce(
        (accumulator, error) => accumulator + error.msg,
        ""
      );
      this.setState({ submitResult: error });
    } else {
      let closeModal = this.props.onClose;
      let msg = "Submitted succesfully";
      this.setState({ submitResult: msg });
      alert(msg);
      closeModal();
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
                value={this.state.project.name}
                required
              />
            </Col>
            <Col>
              <Form.Label>Created At</Form.Label>
              <Form.Control
                type="date"
                id="created"
                name="created"
                onChange={this.handleInput}
                value={this.state.project.created}
                required
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              id="description"
              name="description"
              onChange={this.handleInput}
              value={this.state.project.description}
              required
            />
          </Form.Row>
          <Form.Row>
            <Form.Label>Repo Url</Form.Label>
            <Form.Control
              type="text"
              id="repoUrl"
              name="repoUrl"
              onChange={this.handleInput}
              value={this.state.project.repoUrl}
              required
            />
          </Form.Row>
          <Form.Row>
            <Form.Label>Live Url</Form.Label>
            <Form.Control
              type="text"
              id="liveUrl"
              name="liveUrl"
              onChange={this.handleInput}
              value={this.state.project.liveUrl}
              required
            />
          </Form.Row>
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
