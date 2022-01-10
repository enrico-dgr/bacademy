import "./Loader.css";

import PropTypes from "prop-types";

const Loader = (props) => {
  return (
    <div className={`loader-base ${props.classNames} `} style={props.style}>
      {props.text}
    </div>
  );
};

Loader.defaultProps = {
  classNames: "",
  style: {},
  text: "Loading...",
};

Loader.propTypes = {
  classNames: PropTypes.string,
  style: PropTypes.object,
  text: PropTypes.string,
};

export default Loader;
