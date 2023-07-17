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
import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { AppBar, Tabs, Tab } from "@material-ui/core";
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  Alert,
  CardGroup,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
// core components
import { useEffect, useState } from 'react';
import Header from "components/Headers/Header.js";
import axios from 'axios';


const Executed = () => {
    return (
      <>
        <Header />
        {/* <CardGroup className="mt--7"> */}
          <Row>
          <Col className="mt--7 ml-2 container-fluid" sm="6">
          <Card>
          {/* <CardImg
            alt="Card image cap"
            src={require("assets/img/theme/team-1-800x800.jpg").default}
            top
            // width="100%"
            maxWitdh="100%"
          /> */}
          <CardBody>
            <CardTitle tag="h5">
              ROS APP 1
            </CardTitle>
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >
              Card subtitle
            </CardSubtitle>
            <CardText>
              This is a wider card with supporting text below as a natural lead-in to additional content.
            </CardText>
            <Button color="success">
              Run
            </Button>
            <Button color="warning">
              Uninstall
            </Button>
          </CardBody>
        </Card>
        </Col>
        <Col className="mt--7 ml--5 mr-2 container-fluid" sm="6">
        <Card>
          {/* <CardImg
            alt="Card image cap"
            src={require("assets/img/theme/team-1-800x800.jpg").default}
            top
            width="100%"
          /> */}
          <CardBody>
            <CardTitle tag="h5">
              ROS APP2 
            </CardTitle>
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >
              Card subtitle
            </CardSubtitle>
            <CardText>
              This card has supporting text below as a natural lead-in to additional content.
            </CardText>
            <Button color="success">
              Run
            </Button>
            <Button color="warning">
              Uninstall
            </Button>
          </CardBody>
        </Card>
      {/* </CardGroup> */}
      </Col>
      </Row>
      </>
    );
}

export default Executed;
