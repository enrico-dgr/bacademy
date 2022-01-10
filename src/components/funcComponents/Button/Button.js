import "./Button.css";

import PropTypes from "prop-types";
const Button = (props) => {
  const animationClass = props.animation ? "button-base--animation" : "";

  return (
    <button
      className={`button-base ${props.classNames} ${animationClass}`}
      style={props.style}
      onClick={props.onClickHandler}
    >
      {props.text}
    </button>
  );
};

Button.defaultProps = {
  classNames: "",
  style: {},
};

Button.propTypes = {
  classNames: PropTypes.string,
  onClickHandler: PropTypes.func.isRequired,
  style: PropTypes.object,
  text: PropTypes.string.isRequired,
};

export default Button;
