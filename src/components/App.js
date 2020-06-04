import React from "react";
//import PropTypes from "prop-types";
import Header from "./Header";
import Game from "./Game";

class App extends React.Component {
  render() {
    return (
      <div className="cards-coding-challenge">
        <Header />
        <Game />
      </div>
    );
  }
}

export default App;
