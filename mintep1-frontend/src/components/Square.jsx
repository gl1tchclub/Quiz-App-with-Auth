import PropTypes from "prop-types"; // Make sure you install prop-types -> npm install prop-types

const Square = (props) => {
  const style = {
    border: "1px solid #000",
    cursor: "pointer",
    fontSize: "30px",
    fontWeight: "800",
    outline: "none",
  };

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