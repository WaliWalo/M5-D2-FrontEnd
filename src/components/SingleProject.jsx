import React, { Component } from "react";
import { getSingleStudent } from "../api/student";

export default class SingleProject extends Component {
  state = {
    student: {},
  };

  componentDidMount = async () => {
    const student = await getSingleStudent(this.props.project.studentId);
    this.setState({ student: student[0] });
  };

  render() {
    return (
      <tr>
        <td>{this.props.index}</td>
        <td>{this.props.project.name}</td>
        <td>{this.props.project.description}</td>
        <td>{this.props.project.repoUrl}</td>
        <td>{this.props.project.liveUrl}</td>
        {this.state.student && (
          <td>
            {this.state.student.name} {this.state.student.surname}
          </td>
        )}
      </tr>
    );
  }
}
