import React from "react";
import { Col, Container, Row, Navbar, Form, ListGroup } from "react-bootstrap";
import { FaPlus, FaList, FaRegBell } from 'react-icons/fa';
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
                            <Form.Group className="mb-0 form-group">
                                <Form.Control type="text" placeholder="Search..." />
                            </Form.Group>
                            <ListGroup horizontal>
                                <ListGroup.Item className="icon--plus"><FaPlus /></ListGroup.Item>
                                <ListGroup.Item><FaList /></ListGroup.Item>
                                <ListGroup.Item><FaRegBell /></ListGroup.Item>
                            </ListGroup>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </header>

    );
}

export default HeaderSite;
