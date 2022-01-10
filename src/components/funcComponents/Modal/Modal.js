import "./Modal.css";

import PropTypes from "prop-types";
import React from "react";

const Modal = (props) => {
  const display = props.render ? "initial" : "none";

  return (
    <div
      className={`modal-base ${props.classNames}`}
      style={{ display, ...props.style }}
    >
      {props.children}
    </div>
  );
};

Modal.defaultProps = {
  classNames: "",
  render: false,
  style: {},
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  classNames: PropTypes.string,
  style: PropTypes.object,
  render: PropTypes.bool,
};

export default Modal;
