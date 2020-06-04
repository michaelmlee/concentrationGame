import React, { Component } from "react";
import classnames from "classnames";

class Card extends Component {
  render() {
    const {
      index,
      value,
      code,
      image,
      status,
      flipped,
      handleClick
    } = this.props;
    const updateClassNames = classnames({
      hidden: status === true,
      bleh: status === false
    });
    const updateClassNames2 = classnames({
      flipped: flipped === true
    });

    return (
      <p
        data-key={index}
        data-value={value}
        data-code={code}
        onClick={handleClick}
        className={updateClassNames}
        id={index}
      >
        <img
          alt={value}
          className="front"
          /* className={this.state.matches ? "hidden front" : "front"} */
          src={image}
          id="front"
          className={updateClassNames2}
        />
        <img
          alt="Back of Card"
          id="back"
          className={updateClassNames2}
          src="https://github.com/jwncoexists/cards-coding-challenge/blob/master/assets/playing-card-back.png?raw=true"
        />
      </p>
    );
  }
}

export default Card;
