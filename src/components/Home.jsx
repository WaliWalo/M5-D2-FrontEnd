import React, { Component } from "react";
import StudentForm from "./StudentForm";
import SingleStudent from "./SingleStudent";
import { getAllStudent } from "../api/student";
import { Table } from "react-bootstrap";
export default class Home extends Component {
  state = {
    students: [],
    modified: false,
  };

  handleModified = () => {
    this.setState({ modified: true });
  };

  async componentDidMount() {
    const data = await getAllStudent();
    this.setState({ students: data });
  }

  async componentDidUpdate(prevProp, prevState) {
    if (this.state.modified !== prevState.modified) {
      const data = await getAllStudent();
      this.setState({ students: data, modified: false });
    }
  }

  render() {
    return (
      <div>
        <StudentForm handleModified={this.handleModified} />
        {this.state.students.length !== 0 && (
          <>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Date of Birth</th>
                  <th>Number of Projects</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.students.map((student, index) => (
                  <SingleStudent
                    student={student}
                    index={index + 1}
                    modified={this.handleModified}
                    key={index}
                  />
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
    );
  }
}
