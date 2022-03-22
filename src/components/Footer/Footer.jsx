import React, { Fragment } from "react";
import { Card } from "react-bootstrap";

const Footer = () => {
  return (
    <Fragment>
      <footer
        id="sticky-footer"
        className="flex-shrink-0 py-4 bg-dark text-white-50 mt-5"
        // style={{
        //   position: 'fixed',
        //   bottom: 0,
        //   left: 0,
        //   width: '100%'
        // }}
      >
        <div className="container text-center">
          <small>Copyright &copy; Pet Spa</small>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
