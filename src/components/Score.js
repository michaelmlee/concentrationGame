import React, { Component } from "react";

class Score extends Component {
  render() {
    return (
      <h3>
        Current Score: {this.props.scoreCounter} || Highscore:&nbsp;{this.props.highscoreCounter}
      </h3>
    );
  }
}

export default Score;
