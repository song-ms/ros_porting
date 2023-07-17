/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class Login extends React.Component {
  render() {
    return (
      <>
        <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="6">
                <div className="copyright text-center text-xl-left text-muted">
                  © 2023{" "}
                  <a
                    className="font-weight-bold ml-1"
                    href="https://www.doosanrobotics.com/en/Index"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Doosan Robotics
                  </a>
                </div>
             </Col>
             <Col xl="6">
              <Nav className="nav-footer justify-content-center justify-content-xl-end">
                <NavItem>
                  <NavLink
                    href="https://www.doosanrobotics.com/en/Index"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Doosan Robotics
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    href="https://www.doosanrobotics.com/en/About_us/Location"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    About Us
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    href="https://www.doosanrobotics.com/en/News/News"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    News
                  </NavLink>
                </NavItem>
              </Nav>
          </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Login;
