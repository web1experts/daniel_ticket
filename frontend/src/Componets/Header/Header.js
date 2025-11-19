import React from "react";
import { Col, Container, Row, Navbar, Form, ListGroup } from "react-bootstrap";
import { FaPlus, FaList, FaRegBell } from 'react-icons/fa';
import { MdOutlineContactSupport } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.min.css';
import './headerStyle.css';
import '../../App.css';

function HeaderSite() {
    return (
        <header className="App-header">
            <Container fluid>
                <Row className="align-items-center">
                    <Col sm={12}>
                        <Navbar expand="lg">
                            <Navbar.Brand href="/">
                                <img className="logo" src="./images/logo.png" alt="..." />
                            </Navbar.Brand>
                            <Form.Group className="mb-0 form-group pr-0">
                                <Form.Control type="text" placeholder="Search..." />
                            </Form.Group>
                            <ListGroup horizontal>
                                {/* <ListGroup.Item className="icon--plus"><IoNotificationsOutline /></ListGroup.Item> */}
                                
                                <ListGroup.Item className="icons"><MdOutlineContactSupport  /></ListGroup.Item>
                                {/* <ListGroup.Item className="icons"><MdOutlinePhone /></ListGroup.Item> */}
                                <ListGroup.Item className="icons">
                                    <a aria-haspopup="true" href="#" class="px-0 nav-link" aria-expanded="false">
                                        <div class="user-menu">
                                            <div class="user-avatar">J</div>
                                            <div class="user-info">
                                                <div class="user-name">John</div>
                                                {/* <div class="user-role">Creator</div> */}
                                            </div>
                                        </div>
                                    </a>
                                </ListGroup.Item>
                            </ListGroup>
                        </Navbar>
                    </Col>
                </Row>
            </Container>










      

        </header>

    );
}

export default HeaderSite;


