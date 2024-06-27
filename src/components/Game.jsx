import { useState, useEffect } from "react";

import Board from "./Board";

import calculateGameState from "../utils/calculateGameState";

const Game = () => {
  const style = {
    width: "200px",
  };

  const [history, setHistory] = useState([]);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [isNull, setIsNull] = useState(true);
  const [scoreboard, setScoreboard] = useState({ x: 0, o: 0, draw: 0 });


  const winner = calculateGameState(squares);

  useEffect(() => {
    if (winner) {
      setScoreboard((prevScoreboard) => ({
        ...prevScoreboard,
        [winner.toLowerCase()]: prevScoreboard[winner.toLowerCase()] + 1,
      }));
    } else if (!squares.includes(null)) {
      setScoreboard((prevScoreboard) => ({
        ...prevScoreboard,
        draw: prevScoreboard.draw + 1,
      }));
    }
  }, [winner, squares]);

  const handleClick = (idx) => {
    const squaresCopy = [...squares];
    if (winner || squaresCopy[idx]) return;
    squaresCopy[idx] = xIsNext ? "X" : "O";
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);

    const move = {
      player: xIsNext ? "X" : "O",
      location: idx,
    };
    setHistory([...history, move]);
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setGameStarted(true);
    setHistory([]);
  };

  return (
    <>
      {gameStarted && <Board squares={squares} onClick={handleClick} />}
      <div style={style}>
        {gameStarted && (
          <>
            <p>
              {/* create a draw option - use .includes method (search up) */}
              {winner
                ? `Winner: ${winner}`
                : `Next Player: ${xIsNext ? "X" : "O"}`}
            </p>
            <ul>
              <li>Start</li>
              {history.map((move, index) => (
                <li key={index}>
                  Move {index + 1}: Player {move.player} to location{" "}
                  {move.location}
                </li>
              ))}
            </ul>
          </>
        )}
        <button onClick={restartGame}>
          {gameStarted ? "Restart Game" : "Start Game"}
        </button>
      </div>
    </>
  );
};

export default Game;
