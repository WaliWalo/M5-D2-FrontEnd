import React, { Component } from "react";
import { getSingleStudent } from "../api/student";
import { Button, Image } from "react-bootstrap";
import { deleteProject } from "../api/projects.js";
import { withRouter } from "react-router-dom";

class SingleProject extends Component {
  state = {
    student: {},
  };

  componentDidMount = async () => {
    const student = await getSingleStudent(this.props.project.studentId);
    this.setState({ student: student[0] });
  };

  handleRemove = async () => {
    const result = await deleteProject(this.props.project.id);
    const handleModify = this.props.modified;
    alert(result);
    handleModify();
  };

  render() {
    return (
      <tr
        onClick={() =>
          this.props.history.push(`/projectDetail/${this.props.project.id}`)
        }
      >
        <td>{this.props.index}</td>
        <td>
          <Image
            src={`http://localhost:3001/${this.props.project.id}.jpg`}
            rounded
            style={{
              width: "50px",
              height: "50px",
              backgroundImage: "url(http://placehold.it/150x150)",
            }}
          />
          {this.props.project.name}
        </td>
        <td>{this.props.project.description}</td>
        <td>{this.props.project.repoUrl}</td>
        <td>{this.props.project.liveUrl}</td>
        {this.state.student && (
          <td>
            {this.state.student.name} {this.state.student.surname}
          </td>
        )}
        <td>
          <Button>Update</Button>
          <Button onClick={this.handleRemove}>Remove</Button>
        </td>
      </tr>
    );
  }
}
export default withRouter(SingleProject);
