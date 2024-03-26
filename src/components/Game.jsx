import { useState } from "react";

import Board from "./Board";

import calculateGameState from "../utils/calculateGameState";

const Game = () => {
  const style = {
    width: "200px",
  };

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  const winner = calculateGameState(squares);

  const handleClick = (idx) => {
    const squaresCopy = [...squares];
    if (winner || squaresCopy[idx]) return;
    squaresCopy[idx] = xIsNext ? "X" : "O";
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setGameStarted(true);
  };

  return (
    <>
      {gameStarted && <Board squares={squares} onClick={handleClick} />}
      <div style={style}>
        {gameStarted && (
          <p>
            {winner
              ? `Winner: ${winner}`
              : `Next Player: ${xIsNext ? "X" : "O"}`}
          </p>
        )}
        <button
          onClick={restartGame}
        >
          {gameStarted ? "Restart Game" : "Start Game"}
        </button>
      </div>
    </>
  );
};


const calculateGameState = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    
    for (let s = 0; s < lines.length; s++) {
        const [a, b, c] = lines[s];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

export default {calculateGameState, Game};