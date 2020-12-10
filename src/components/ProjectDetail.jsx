import React, { Component } from "react";
import { Jumbotron, Image, ListGroup } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { getProject, getReviews } from "../api/projects";
import SingleReview from "./SingleReview";
class ProjectDetail extends Component {
  state = {
    image: `http://localhost:3001/${this.props.match.params.id}.jpg`,
    project: {},
    reviews: [],
  };

  componentDidMount = async () => {
    const project = await getProject(this.props.match.params.id);
    this.setState({ project: project[0] });
    const reviews = await getReviews(this.props.match.params.id);
    this.setState({ reviews });
  };

  render() {
    return (
      <div>
        <Jumbotron>
          <Image
            src={this.state.image}
            rounded
            style={{
              width: "150px",
              height: "150px",
              backgroundImage: "url(http://placehold.it/150x150)",
            }}
          />
          <h1>{this.state.project.name}</h1>
          <p>{this.state.project.description}</p>
          <p>
            <strong>Created At: </strong>
            {this.state.project.created}
          </p>
          <p>
            <strong>Repo Url: </strong>
            {this.state.project.repoUrl}
          </p>
          <p>
            <strong>Live Url: </strong>
            {this.state.project.liveUrl}
          </p>
        </Jumbotron>
        <ListGroup>
          {this.state.reviews &&
            this.state.reviews.map((review) => (
              <SingleReview review={review} />
            ))}
        </ListGroup>
      </div>
    );
  }
}

export default withRouter(ProjectDetail);
