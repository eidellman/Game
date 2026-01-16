import { useState } from "react";
import { alphabet, proLang, words } from "./variables";
import clsx from "clsx";
import Confetti from 'react-confetti';
import "./App.css";

function App() {

  const [word, setWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongGuess, setWrongGuess] = useState(0);


  const getLetter = (btnLetter: string) => {
    setGuessedLetters((prev) =>
      guessedLetters.includes(btnLetter) ? [...prev] : [...prev, btnLetter]
    );

    setWrongGuess((prev) =>
      word.toUpperCase().split("").includes(btnLetter) ? prev : prev + 1
    );
  };

  const isWon = word
    .toUpperCase()
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const lost = wrongGuess === proLang.length;


  const newGame = () => {
    setWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
    setWrongGuess(0)
  }

  return (
    <>
      <div className="app-container">
        <div className="assembly-container">
          <h3>Assembly: Endgame</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            tenetur
          </p>
        </div>
        {isWon ? (
          
          <div className="win-container">
            <Confetti></Confetti>
            <h3>You won!</h3>
            <p>Well done</p>
          </div>
        ) : null}

        {lost ? (
          <div className="win-container lost">
            <h3>You Lost</h3>
            <p>Try Again</p>
          </div>
        ) : null}

        <div className="btn-container">
          {proLang.map((lng, index) => {
            const isDead = index < wrongGuess;
            return (
              <button
                key={lng.id}
                className={clsx(`${lng.id} btn`, {
                  dead: isDead,
                })}
              >
                {isDead ? "💀" : lng.name}
              </button>
            );
          })}
        </div>

        <div className="word-container">
          {word
            .toUpperCase()
            .split("")
            .map((wordLetter, index) => {
              const isGuessed = guessedLetters.includes(wordLetter);

              return (
                <span key={index} className="entr">
                  {(isGuessed || lost)  ? wordLetter : "" }
                </span>
              );
            })}
        </div>

        <div className="alphabet-container">
          {alphabet.map((letter) => {
            const isPressed = guessedLetters.includes(letter.letter);
            const isCorrect =
              word.toUpperCase().split("").includes(letter.letter) && isPressed;
            const isWrong =
              isPressed &&
              !word.toUpperCase().split("").includes(letter.letter);

            return (
              <button
                disabled={lost || isWon || guessedLetters.includes(letter.letter)}
                onClick={() => {
                  getLetter(letter.letter);
                }}
                value={letter.letter}
                className={clsx("letter", {
                  right: isCorrect,
                  wrong: isWrong,
                })}
                key={letter.id}
              >
                {letter.letter}
              </button>
            );
          })}
        </div>
        {(isWon || lost) && <button onClick={newGame} className="new-game">New Game</button>}
      </div>
    </>
  );
}

export default App;
