import React, { Component } from "react";

class StartNewGame extends Component {
  render() {
    return (
      <button onClick={this.props.startGame} id="startGame" className="btn">
        Start New Game
      </button>
    );
  }
}

export default StartNewGame;
