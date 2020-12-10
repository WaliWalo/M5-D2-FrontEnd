import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  getSingleStudent,
  getStudentProjects,
  postStudentImg,
} from "../api/student";
import {
  Jumbotron,
  Container,
  Image,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import SingleProject from "./SingleProject";
import ProjectForm from "./ProjectForm";

class StudentDetail extends Component {
  state = {
    student: {},
    projects: [],
    show: false,
    modified: false,
    filesSelected: null,
    image: `http://localhost:3001/${this.props.match.params.id}.jpg`,
  };

  handleModified = () => {
    this.setState({ modified: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleOpen = () => {
    this.setState({ show: true });
  };

  componentDidMount = async () => {
    const student = await getSingleStudent(this.props.match.params.id);
    this.setState({ student: student[0] });
    const projects = await getStudentProjects(this.props.match.params.id);
    this.setState({ projects });
  };

  componentDidUpdate = async (prevProp, prevState) => {
    if (this.state.show !== prevState.show) {
      const student = await getSingleStudent(this.props.match.params.id);
      this.setState({ student: student[0] });
      const projects = await getStudentProjects(this.props.match.params.id);
      this.setState({ projects });
    }
    if (this.state.modified !== prevState.modified) {
      const student = await getSingleStudent(this.props.match.params.id);
      this.setState({ student: student[0] });
      const projects = await getStudentProjects(this.props.match.params.id);
      this.setState({ projects });
    }
  };

  handleSubmitPic = async (e) => {
    e.preventDefault();
    console.log(this.state.filesSelected);
    if (this.state.filesSelected !== null) {
      const result = await postStudentImg(
        this.props.match.params.id,
        this.state.filesSelected
      );
      console.log(JSON.stringify(result));
      alert("Image Uploaded");
      // setTimeout(function () {
      //   this.props.history.push("/");
      //   this.props.history.goBack();
      // }, 50);
      this.props.history.push("/");
      this.props.history.goBack();
    }
  };

  handleFileChange = (files) => {
    this.setState({
      filesSelected: files[0],
    });
  };

  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ProjectForm
              student={this.state.student}
              onClose={this.handleClose}
            />
          </Modal.Body>
        </Modal>
        {this.state.student && (
          <Jumbotron fluid>
            <Container>
              <Row>
                <Col xs={2} className="pl-5">
                  <Row>
                    <Image
                      src={this.state.image}
                      rounded
                      style={{
                        width: "150px",
                        height: "150px",
                        backgroundImage: "url(http://placehold.it/150x150)",
                      }}
                    />
                  </Row>
                  <Row>
                    <Form onSubmit={this.handleSubmitPic}>
                      <Form.Group>
                        <Form.File
                          id="exampleFormControlFile1"
                          label=""
                          onChange={(e) =>
                            this.handleFileChange(e.target.files)
                          }
                        />
                      </Form.Group>
                      <Button type="submit">Change Pic</Button>
                    </Form>
                  </Row>
                </Col>
                <Col
                  xs={10}
                  style={{
                    textAlign: "left",
                    paddingLeft: "90px",
                    wordWrap: "normal",
                  }}
                >
                  <h1>
                    {this.state.student.name} {this.state.student.surname}
                  </h1>
                  <p>{this.state.student.email}</p>
                  <p>{this.state.student.numberOfProjects}</p>
                </Col>
              </Row>
            </Container>
          </Jumbotron>
        )}
        {this.state.projects.length > 0 ? (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Repo Url</th>
                <th>Live Url</th>
                <th>Student Id</th>
              </tr>
            </thead>
            <tbody>
              {this.state.projects.map((project, index) => {
                return (
                  <SingleProject
                    project={project}
                    key={index}
                    index={index + 1}
                    modified={this.handleModified}
                  />
                );
              })}
            </tbody>
          </Table>
        ) : (
          <div>
            <h2>NO PROJECTS</h2>
          </div>
        )}
        <Button onClick={this.handleOpen}>ADD PROJECT</Button>
      </div>
    );
  }
}

export default withRouter(StudentDetail);
