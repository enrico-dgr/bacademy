import "./Checkbox.css";

import PropTypes from "prop-types";
import React from "react";

const Checkbox = (props) => {
  const [checked, setChecked] = React.useState(false);

  const onCheckHandler = () => {
    props.onCheckHandler(!checked);
    setChecked(!checked);
  };

  return (
    <div
      className={`checkbox-base ${props.classNames}`}
      style={props.style}
      onClick={onCheckHandler}
    >
      {checked ? "OK" : ""}
    </div>
  );
};

Checkbox.defaultProps = {
  classNames: "",
  style: {},
};

Checkbox.propTypes = {
  classNames: PropTypes.string,
  onCheckHandler: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default Checkbox;
