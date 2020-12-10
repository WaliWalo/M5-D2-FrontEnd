import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
export default class SingleReview extends Component {
  render() {
    return (
      <div>
        <ListGroup.Item>
          {this.props.review.name}: {this.props.review.text}
        </ListGroup.Item>
      </div>
    );
  }
}
