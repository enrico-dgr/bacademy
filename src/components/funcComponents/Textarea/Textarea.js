import "./Textarea.css";

import PropTypes from "prop-types";

const Textarea = (props) => {
  return (
    <textarea
      className={`textarea-base ${props.classNames} `}
      style={props.style}
      value={props.text}
      onChange={props.onChangeHandler}
    />
  );
};

Textarea.defaultProps = {
  classNames: "",
  style: {},
  text: "",
};

Textarea.propTypes = {
  classNames: PropTypes.string,
  onChangeHandler: PropTypes.func.isRequired,
  style: PropTypes.object,
  text: PropTypes.string,
};

export default Textarea;
