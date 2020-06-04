import React, { Component, Fragment } from "react";
import Score from "./Score";
import StartNewGame from "./StartNewGame";
import Card from "./Card";
import "../game.css";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      deck: {},
      cards: {},
      value: [],
      code: [],
      image: [],
      isMatch: [],
      isFlipped: [],
      isActiveCard1: {
        value: null,
        code: null,
        key: null
      },
      isActiveCard2: {
        value: null,
        code: null,
        key: null
      },
      cardSelected: 0,
      gameCounter: 0,
      scoreCounter: 0,
      highscoreCounter: 0
    };
  }

  startGame = e => {
    this.getNewDeck();
    this.setState({
      cardSelected: 0,
      gameCounter: 0,
      scoreCounter: 0
    });
  };

  getNewDeck = () => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            deck: result
          });
          this.getCards();
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  getCards = () => {
    fetch(
      `https://deckofcardsapi.com/api/deck/${
        this.state.deck.deck_id
      }/draw/?count=52`
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            cards: result.cards
          });
          this.setCards();
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  setCards = () => {
    const { cards, value, code, isMatch, isFlipped } = this.state;
    const images = this.state.image;
    for (let i = 0; i < cards.length; i++) {
      value[i] = cards[i].value;
      images[i] = cards[i].image;
      code[i] = cards[i].code;
      isMatch[i] = false;
      isFlipped[i] = false;
    }
    this.setState({
      value,
      image: images,
      code
    });
  };
  // handleFlip = () => {
  //   alert("im doing something");
  // };
  handleClick = e => {
    let {
      cardSelected,
      isActiveCard1,
      isActiveCard2,
      isFlipped,
      scoreCounter
    } = this.state;
    if (cardSelected < 1) {
      isActiveCard1.key = e.currentTarget.getAttribute("data-key");
      isFlipped[isActiveCard1.key] = true;
      isActiveCard1.value = e.currentTarget.getAttribute("data-value");
      isActiveCard1.code = e.currentTarget.getAttribute("data-code");
      cardSelected++;
      this.setState({
        isActiveCard1,
        cardSelected
      });
    } else if (cardSelected < 2) {
      isActiveCard2.key = e.currentTarget.getAttribute("data-key");
      isFlipped[isActiveCard2.key] = true;
      isActiveCard2.value = e.currentTarget.getAttribute("data-value");
      isActiveCard2.code = e.currentTarget.getAttribute("data-code");
      cardSelected++;
      scoreCounter++;
      this.setState(
        {
          isActiveCard2,
          cardSelected,
          isFlipped,
          scoreCounter
        },
        this.checkMatches(isActiveCard1.key, isActiveCard2.key)
      );
      setTimeout(() => {
        let cardSelected = this.state.cardSelected;
        cardSelected = 0;
        isFlipped[isActiveCard1.key] = false;
        isFlipped[isActiveCard2.key] = false;
        this.setState({
          isFlipped,
          cardSelected
        });
      }, 500);
    } else {
      isFlipped[isActiveCard1.key] = false;
      isFlipped[isActiveCard2.key] = false;
      this.setState({
        isFlipped
      });
    }
  };

  checkMatches = (key1, key2) => {
    const { isActiveCard1, isActiveCard2, isMatch } = this.state;
    let { gameCounter, scoreCounter, highscoreCounter } = this.state;
    if (
      isActiveCard1.value === isActiveCard2.value &&
      isActiveCard1.code !== isActiveCard2.code
    ) {
      setTimeout(() => {
        isMatch[key1] = true;
        isMatch[key2] = true;
      }, 400);
      gameCounter++;
      if (gameCounter < 26) {
        //keep going
      } else {
        // End Game
        alert("Congratluations, you have finished the game!");
        if (scoreCounter < highscoreCounter || highscoreCounter === 0) {
          highscoreCounter = scoreCounter;
          highscoreCounter++;
          alert("Yay new high score");
        }
      }
      this.setState({
        isMatch,
        gameCounter,
        scoreCounter,
        highscoreCounter
      });
    }
  };

  removeCards = () => {};

  render() {
    const {
      error,
      value,
      image,
      code,
      isMatch,
      isFlipped,
      highscoreCounter,
      scoreCounter
    } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <Fragment>
          <Score
            highscoreCounter={highscoreCounter}
            scoreCounter={scoreCounter}
          />
          <StartNewGame startGame={this.startGame} />
          <div className="playing-field">
            {Object.keys(value).map((key, index) => (
              <Card
                key={key}
                index={index}
                value={value[key]}
                code={code[key]}
                image={image[key]}
                status={isMatch[key]}
                flipped={isFlipped[key]}
                handleClick={this.handleClick}
              />
            ))}
          </div>
        </Fragment>
      );
    }
  }
}

export default Game;
