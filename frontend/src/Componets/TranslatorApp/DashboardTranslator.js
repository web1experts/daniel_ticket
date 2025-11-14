import React from "react";
import { Col, Container, Row, Card, CardGroup, Button } from "react-bootstrap";
import { FaPlus } from 'react-icons/fa';
import { FaNetworkWired } from "react-icons/fa";
import { CgTranscript } from "react-icons/cg";
import { GrWorkshop } from "react-icons/gr";
import { TbUsers } from "react-icons/tb";
import 'bootstrap/dist/css/bootstrap.min.css';
//import '../startStyle.css';
import TranslatorSidebarPanel from "./translatorSidebar";


function DashboardTranslator() {
    return (
        <>
            <TranslatorSidebarPanel/>
            <div className="content__container main--page">
                <Container fluid>
                    <Row>
                        <Col sm={12} className="mt-4">
                            <h2>Translations</h2>
                        </Col>
                        <Col sm={12}>
                            <CardGroup className="translation--card">
                                <Card>
                                    <span className="card--icon"><FaNetworkWired /></span>
                                    <Card.Body>
                                        <Card.Title>221</Card.Title>
                                        <Card.Text>Total Projects</Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <span className="card--icon"><GrWorkshop /></span>
                                    <Card.Body>
                                        <Card.Title>22</Card.Title>
                                        <Card.Text>Open Projects</Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <span className="card--icon"><CgTranscript /></span>
                                    <Card.Body>
                                        <Card.Title>120</Card.Title>
                                        <Card.Text>Translations Completed</Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <span className="card--icon"><TbUsers /></span>
                                    <Card.Body>
                                        <Card.Title>50</Card.Title>
                                        <Card.Text>Translators</Card.Text>
                                    </Card.Body>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default DashboardTranslator;