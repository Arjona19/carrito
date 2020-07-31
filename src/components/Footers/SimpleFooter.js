/*eslint-disable*/
import React from "react";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class SimpleFooter extends React.Component {
  render() {
    return (
      <>
        <footer className=" footer">
          <Container>
            <Row className=" row-grid align-items-center mb-5">
              <Col lg="6">
                <h3 className="text-center text-primary font-weight-light mb-2">
                  Gracias por apoyarnos!
                </h3>
                <h4 className="text-center mb-0 font-weight-light">
                  "El conocimiento es poder". <small className=" mb-0 font-weight-light">- Thomas Hobbes</small>
                </h4>
              </Col>
              <Col className="text-lg-center btn-wrapper" lg="6">
                <img
                    alt="..."
                    className="img-fluid"
                    src={require("assets/img/brand/dev-loopers.png")}
                    style={{ width: "250px" }}
                />
              </Col>
            </Row>
            <hr />
            <Row className=" align-items-center justify-content-md-between">
              <Col md="12">
                <div className="text-center copyright">
                  © {new Date().getFullYear()}{" "}
                  DevLoopers.
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default SimpleFooter;
