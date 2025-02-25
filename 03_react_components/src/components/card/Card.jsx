// Card.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ children, hoverable }) => {
  return (
    <div className={`card ${hoverable ? 'card-hoverable' : ''}`}>
      {React.Children.map(children, child => {
        if (child.type === Card.Header) {
          return React.cloneElement(child, { className: 'card-header' });
        }
        if (child.type === Card.Body) {
          return React.cloneElement(child, { className: 'card-body' });
        }
        if (child.type === Card.Footer) {
          return React.cloneElement(child, { className: 'card-footer' });
        }
        return child;
      })}
    </div>
  );
};

const Header = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const Body = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const Footer = ({ children, className }) => (
  <div className={className}>{children}</div>
);

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

Card.propTypes = {
  hoverable: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Card;
