import PropTypes from "prop-types";

import Square from "./Square";

const Board = (props) => {
  const style = {
    border: "1px solid #000",
    display: "grid",
    gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
    height: "200px",
    width: "200px",
  };

  return (
    <div style={style}>
      {props.squares.map((square, idx) => (
        <Square key={idx} value={square} onClick={() => props.onClick(idx)} />
      ))}
    </div>
  );
};

Board.propTypes = {
  onClick: PropTypes.func.isRequired,
  squares: PropTypes.array.isRequired,
};

export default Board;