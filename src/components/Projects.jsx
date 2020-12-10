import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { getAllProjects } from "../api/projects";
import SingleProject from "./SingleProject";

export default class Projects extends Component {
  state = {
    projects: [],
    modified: false,
  };

  handleModified = () => {
    this.setState({ modified: true });
  };

  componentDidMount = async () => {
    const projects = await getAllProjects();
    this.setState({ projects });
  };

  componentDidUpdate = async (prevProp, prevState) => {
    if (this.state.modified !== prevState.modified) {
      const projects = await getAllProjects();
      this.setState({ projects, modified: true });
    }
  };

  render() {
    return (
      <div>
        <h1>Projects</h1>
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
            {this.state.projects &&
              this.state.projects.map((project, index) => {
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
      </div>
    );
  }
}
