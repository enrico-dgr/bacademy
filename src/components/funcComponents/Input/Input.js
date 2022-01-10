import "./input.css";

import PropTypes from "prop-types";

const Input = (props) => {
  const animationClass = props.animation ? "input-base--animation" : "";

  return (
    <input
      className={`input-base ${props.classNames} ${animationClass}`}
      placeholder={props.placeholder}
      style={props.style}
      type={props.type}
    />
  );
};

Input.defaultProps = {
  animation: true,
  classNames: "",
  placeholder: "",
  style: {},
  type: "text",
};

Input.propTypes = {
  animation: PropTypes.bool,
  classNames: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
};

export default Input;
