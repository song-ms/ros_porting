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
  UncontrolledTooltip,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  Alert
} from "reactstrap";
// core components
import { useEffect, useState } from 'react';
import Header from "components/Headers/Header.js";
import axios from 'axios';


function Mseries({}){
  return (
    <>
      <a
              className="avatar avatar-sm"
              href="#pablo"
              id="tooltip742438047"
              onClick={e => e.preventDefault()}
            >
              <img
                alt="..."
                className="rounded-circle"
                src={require("assets/img/theme/team-1-800x800.jpg").default}
              />
            </a>
            <UncontrolledTooltip
              delay={0}
              target="tooltip742438047"
            >
              M-Series
            </UncontrolledTooltip>
    </>
  )
}

function Eseries({}){
  return (
    <>
      <a
              className="avatar avatar-sm"
              href="#pablo"
              id="tooltip804044742"
              onClick={e => e.preventDefault()}
            >
              <img
                alt="..."
                className="rounded-circle"
                src={require("assets/img/theme/team-3-800x800.jpg").default}
              />
            </a>
            <UncontrolledTooltip
              delay={0}
              target="tooltip804044742"
            >
              E-Series
            </UncontrolledTooltip>
    </>
  )
}

function Hseries({}){
  return (
    <>
      <a
              className="avatar avatar-sm"
              href="#pablo"
              id="tooltip996637554"
              onClick={e => e.preventDefault()}
            >
              <img
                alt="..."
                className="rounded-circle"
                src={require("assets/img/theme/team-4-800x800.jpg").default}
              />
            </a>
            <UncontrolledTooltip
              delay={0}
              target="tooltip996637554"
            >
              H-Series
            </UncontrolledTooltip>
    </>
  )
}

function Drseries({}){
  return (
    <>
      <a
              className="avatar avatar-sm"
              href="#pablo"
              id="tooltip941738690"
              onClick={e => e.preventDefault()}
            >
              <img
                alt="..."
                className="rounded-circle"
                src={require("assets/img/theme/team-2-800x800.jpg").default}
              />
            </a>
            <UncontrolledTooltip
              delay={0}
              target="tooltip941738690"
            >
              Dr.Presso
            </UncontrolledTooltip>
    </>
  )
}



function ColumnContants({ columns }){
  return (
    <>
      <th scope="col">{columns.columnName}</th>
    </>
  )
}

function Medias({data}){
  console.log(data)
  //install modal
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [failModal, setFailModal] = useState(false);
  const [failtxtModal, setFailtxtModal] = useState();
  const [closeAll, setCloseAll] = useState(false);
  
  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    console.log("hellores")
    setNestedModal(!nestedModal);
    setCloseAll(false);
    axios.post('http://10.80.115.25:5100/api/table/install',{
      version: data
    })
    .then((res) => {
      console.log(res)
      if(res.data[0] != "fail"){
        setSuccessModal(!successModal);
      }
      else{
        setFailtxtModal(res.data[1])
        setFailModal(true);
      }
  })
};
  const toggleSuccess = () => {
    setSuccessModal(!successModal);
    setCloseAll(false);
  }

  const toggleAll = () => {
    setNestedModal(false);
    setSuccessModal(false);
    setCloseAll(true);
  };
  return (
    <>
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Installation</ModalHeader>
        <ModalBody tag="h5">
          1. 소프트웨어 업데이트의 경우 반드시 긴급 버튼을 활성화 해주세요. <br />
          2. 업데이트 진행에는 화면 조작 모든 기능을 사용할 수 없습니다.<br />
          3. 업데이트 도중에 전원을 종료하는 경우 시스템 문제가 발생할 수 있습니다.<br />
          4. 소프트웨어 업데이트의 용량이 많거나 제어기의 용량이 부족한 경우 업데이트에 문제가 발생될 수 있습니다.
          <br />
          <br />
          설치 항목 : {data}
          <br />
          <Modal
            size="sm"
            isOpen={nestedModal}
            toggle={toggleNested}
            onClosed={closeAll ? toggle : undefined}
          >
            <ModalHeader>Installing {data} </ModalHeader>
              <ModalBody>
                <div className="d-flex align-items-center">
                <Spinner
                  className="m-5"
                  style={{
                    height: '5rem',
                    width: '5rem',
                  }}
                >
                  Loading...
                </Spinner> 
                </div>
                <Modal
                  size="sm"
                  isOpen={successModal}
                  toggle={toggleSuccess}
                  onClosed={closeAll ? toggle : undefined}
                >
                  <ModalHeader>completed {data} </ModalHeader>
                    <ModalBody>
                    <Alert>
                      Install Succeeded !
                    </Alert>           
                    </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={toggleAll}>
                      Close
                    </Button>
                  </ModalFooter>
                </Modal>
                <Modal
                  size="sm"
                  isOpen={failModal}
                  toggle={toggleSuccess}
                  onClosed={closeAll ? toggle : undefined}
                >
                  <ModalHeader>Fail install {data} </ModalHeader>
                    <ModalBody>
                    <Alert color="warning">
                    Storage is already full. Maximum 2 Apps, currnet: {failtxtModal}
                    </Alert>           
                    </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={toggleAll}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>          
              </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleAll}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={toggleNested}>
            Install
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    <tr>
    <th scope="row">
          <Media className="align-items-center">
            <a
              className="avatar rounded-circle mr-3"
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              <img
                alt="..."
                src={require("assets/img/theme/ROS.jpg").default}
              />
            </a>
            <Media>
              <span className="mb-0 text-sm">
                MoMa Application
              </span>
            </Media>
          </Media>
        </th>
        <td>{data}</td>
        <td>
          <Badge color="" className="badge-dot mr-4">
            <i className="bg-success" />
            Available to download
          </Badge>
        </td>
        <td>
          <div className="avatar-group">
            <a
              className="avatar avatar-sm"
              href="#pablo"
              id="tooltip742438047"
              onClick={e => e.preventDefault()}
            >
              <img
                alt="..."
                className="rounded-circle"
                src={require("assets/img/theme/team-1-800x800.jpg").default}
              />
            </a>
            <UncontrolledTooltip
              delay={0}
              target="tooltip742438047"
            >
              M-Series
            </UncontrolledTooltip>
            {/* <a
              className="avatar avatar-sm"
              href="#pablo"
              id="tooltip941738690"
              onClick={e => e.preventDefault()}
            >
              <img
                alt="..."
                className="rounded-circle"
                src={require("assets/img/theme/team-2-800x800.jpg").default}
              />
            </a>
            <UncontrolledTooltip
              delay={0}
              target="tooltip941738690"
            >
              Dr.Presso
            </UncontrolledTooltip> */}
            <a
              className="avatar avatar-sm"
              href="#pablo"
              id="tooltip804044742"
              onClick={e => e.preventDefault()}
            >
              <img
                alt="..."
                className="rounded-circle"
                src={require("assets/img/theme/team-3-800x800.jpg").default}
              />
            </a>
            <UncontrolledTooltip
              delay={0}
              target="tooltip804044742"
            >
              E-Series
            </UncontrolledTooltip>
            <a
              className="avatar avatar-sm"
              href="#pablo"
              id="tooltip996637554"
              onClick={e => e.preventDefault()}
            >
              <img
                alt="..."
                className="rounded-circle"
                src={require("assets/img/theme/team-4-800x800.jpg").default}
              />
            </a>
            <UncontrolledTooltip
              delay={0}
              target="tooltip996637554"
            >
              H-Series
            </UncontrolledTooltip>
          </div>
        </td>
        <td className="text-right">
          <UncontrolledDropdown>
            <DropdownToggle
              className="btn-icon-only text-light"
              href="#pablo"
              role="button"
              size="sm"
              color=""
              onClick={e => e.preventDefault()}
            >
              <i className="fas fa-ellipsis-v" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem
                href="#pablo"
                onClick={toggle}
              >
                Install
              </DropdownItem>
              <DropdownItem
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                Detail
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </td>
        </tr>
        
    </>
  )
}

const Tables = () => {
    const [dockerhub, setDockerhub] = React.useState([]);
    
    const [rowstate, setRowstate] = React.useState([]);
    const ListUp = [
      {columnName:"Project"},
      {columnName:"Version"},
      {columnName:"Install Status"},
      {columnName:"Products"}
    ];
    const [value, setValue] = React.useState(0);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [buttonstate, setButtonstate] = React.useState(false);
    
    const handlebutton = () => {
      setButtonstate(true);
      // console.log(buttonstate)
    }
    const cancelbutton = () => {
      setButtonstate(false);
      // console.log(buttonstate)
    }
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'version', headerName: 'Version', width: 70 },
      // {
        //   field: 'size',
        //   headerName: 'Size(MB)',
        //   type: 'number',
        //   width: 70,
        //   align: 'center',
        // },
        { field: 'time', headerName: 'Time', width: 130 },
        
        {
          field: 'status',
          headerName: 'Status',
          align: 'center',
          // description: 'This column has a value getter and is not sortable.',
          // sortable: false,
          width: 130,
          // valueGetter: (params: GridValueGetterParams) =>
          // `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
    ];
    

    useEffect(() => {
      axios.get('http://10.80.115.25:5100/api/table/docker')
      .then((res) => {
        let data = [res.data];
        var slag = data.map(doc => Object.values(doc));
        const copy = [...dockerhub];
        for(var j = 0; j < slag[0].length; j++){
          // console.log(slag[0]);
          // console.log(slag[0][j])
          if(dockerhub.length == 0){
            copy.push(slag[0][j]);
        }}
        setDockerhub(copy);
        console.log(copy);
      })
      .catch(err => console.log(err));
    }, []);

    
      
    useEffect(()=> {
        let copyrow = [...rowstate];
    for (var i=0; i < dockerhub.length; i++)
    {
      // let rows = 
      // {
        const rowset = {id: i, category: "Moma", version: dockerhub[i], time: 'May.25 13:04', status: "not installed"};
        // const rowset = {id: 1, function: dockerhub[i], time: 'May.25 13:04', size: 35 , status: 'on'};
        // console.log(rowstate)
        if (rowstate.length === 0){
          
          copyrow.push(rowset);
          setRowstate(copyrow);
          console.log(rowset)
          console.log(rowstate)
        }
        // }
      }
    }, []);
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7 bg-dark" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">ROS App Tables</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      {ListUp.map(columns => (
                        <ColumnContants columns={columns} />
                      ))}
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                      {dockerhub.map((data) =>{
                        return (<Medias data={data} />)
                      })}
                    {/* <tr>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("assets/img/theme/ROS2-2.jpg").default}
                            />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">
                              Realsense Simulator
                            </span>
                          </Media>
                        </Media>
                      </th>
                      <td>Realsense</td>
                      <td>
                        <Badge color="" className="badge-dot">
                          <i className="bg-success" />
                          completed
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <Mseries />
                          <Drseries />
                          <Eseries />
                          <Hseries />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">100%</span>
                          <div>
                            <Progress
                              max="100"
                              value="100"
                              barClassName="bg-success"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Uninstall
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr> */}
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      {/* <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem> */}
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
          </Container>
      </>
    );
}

export default Tables;
