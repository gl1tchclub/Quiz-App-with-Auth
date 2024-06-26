import PropTypes from "prop-types";

const Square = (props) => {
  // Set style of prop
  const style = {
    border: "1px solid #000",
    cursor: "pointer",
    fontSize: "30px",
    fontWeight: "800",
    outline: "none",
    color: props.value == "X" ? "blue" : "red",
  };

  // Return button with set style and prop value
  return (
    <button style={style} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default Square;
