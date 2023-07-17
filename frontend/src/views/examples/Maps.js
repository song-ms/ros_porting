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


function Cardlist({data}){
  console.log(data)
  const [successModal, setSuccessModal] = useState(false);
  const [failtxtModal, setFailtxtModal] = useState();
  const [failModal, setFailModal] = useState(false);
  const [runModal, setRunModal] = useState(false);
  const [stopModal, setStopModal] = useState(false);

  const toggleRun = () => {
    axios.post('http://10.80.115.25:5100/api/table/run',{
      version: data
    })
    .then((res) => {
      console.log(res)
      setRunModal(true);
  })
  }

  const toggleStop = () => {
    axios.post('http://10.80.115.25:5100/api/table/stop',{
      version: data
    })
    .then((res) => {
      console.log(res)
      setStopModal(true);
      window.location.reload();
  })
  }
  
  return (
    <>
    <Card
    body
    className="my-2 text-center"
    style={{
      width: '95%'
    }}
  >
    <CardTitle tag="h2">
      {data}
    </CardTitle>
    <CardText>
      Current Status : Activated
    </CardText>
    <Button color="default" className="my-2 mr-2 ml-2 btn
    " onClick={toggleRun}>
        Run
    </Button>
    <Button color="warning" className="my-2 mr-2 ml-2 btn" onClick={toggleStop}>
        Stop
    </Button>
    {/* <Button color="red" className="my-2 mr-2 ml-2 btn" onClick={toggleStop}>
        Uninstail
    </Button> */}
  </Card>
  </>
  )
}

function StopCardlist({data}){
  console.log(data)
  const [successModal, setSuccessModal] = useState(false);
  const [failtxtModal, setFailtxtModal] = useState();
  const [failModal, setFailModal] = useState(false);
  const [runModal, setRunModal] = useState(false);
  const [stopModal, setStopModal] = useState(false);

  const toggleStart = () => {
    axios.post('http://10.80.115.25:5100/api/table/start',{
      version: data
    })
    .then((res) => {
      console.log(res)
      setRunModal(true);
      
      window.location.reload();
  })
  }

  const toggleUninstall = () => {
    axios.post('http://10.80.115.25:5100/api/table/uninstall',{
      version: data
    })
    .then((res) => {
      console.log(res)
      setStopModal(true);
      window.location.reload();
  })
  }
  
  return (
    <>
    <Card
    body
    className="my-2 text-center"
    style={{
      width: '95%'
    }}
  >
    <CardTitle tag="h2">
      {data}
    </CardTitle>
    <CardText>
      Current Status : Deactivated
    </CardText>
    <Button color="default" className="my-2 mr-2 ml-2 btn
    " onClick={toggleStart}>
        Start
    </Button>
    <Button color="red" className="my-2 mr-2 ml-2 btn" onClick={toggleUninstall}>
        Uninstail
    </Button>
  </Card>
  </>
  )
}


const Executed = () => {

  const [currentimagelist, setCurrentimagelist] = useState([])
  const [stopimagelist, setStopimagelist] = useState([])
  const testdata = [1, 2, 3]
  useEffect(() => {
    axios.get('http://10.80.115.25:5100/api/table/containers')
    .then((res) => {
      console.log(res.data.runningContainers)
      let idata = res.data.runningContainers;
      let sdata = res.data.stoppedContainers;
      const copy = [...currentimagelist];
      const stop_copy = [...stopimagelist];
      if (currentimagelist.length == 0) {
        copy.push(idata);
        console.log(copy[0]);
      } else {
        console.log(copy);
      }
      if (stopimagelist.length == 0) {
        stop_copy.push(sdata);
        console.log(stop_copy[0]);
      } else {
        console.log(stop_copy);
      }
      setCurrentimagelist(copy);
      setStopimagelist(stop_copy);
    })
    .catch(err => console.log(err));
  }, []);

    return (
      <>
        <Header />
        {/* <CardGroup className="mt--7"> */}
        <div className="mt--7 ml-2 container-fluid">
        {/* {currentimagelist} */}
        {currentimagelist[0] && currentimagelist[0].map((data) => {
          return (<Cardlist data={data} />)
        })}
        {stopimagelist[0] && stopimagelist[0].map((data) => {
          return (<StopCardlist data={data} />)
        })}
        </div>
      </>
    );
}

export default Executed;
