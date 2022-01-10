import "./Card.css";

import PropTypes from "prop-types";

const Card = (props) => {
  return (
    <div className={`card-base ${props.classNames}`} style={props.style}>
      {props.children}
    </div>
  );
};

Card.defaultProps = {
  classNames: "",
  style: {},
};

Card.propTypes = {
  classNames: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default Card;
