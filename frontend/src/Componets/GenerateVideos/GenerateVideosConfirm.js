import React, { useState } from "react";
import { Col, Container, Row, ListGroup, Button, Navbar, Nav, Table, Dropdown } from "react-bootstrap";
import { FaRegClock, FaEllipsisV, FaChevronDown } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import './generateStyle.css';
import '../../App.css';

function ConfirmVideoStep() {

    const [isCollapse, setisCollapse] = useState(false);
    const handleClick = event => {
        setisCollapse(current => !current);
    };

    const [expandedRow, setExpandedRow] = useState(null);

    const RowExpand = rowId => {
        setExpandedRow(expandedRow === rowId ? null : rowId);
    };


    const projects = [
        { id: 1, title: "The Comfort of Jesus", projectLang: "English", contentType: "Direct Testing", aspectRatio: "9:16 / 1:1", videos: 6, buttonLabel: "Hold: Translation", image: "images/Video-Slide1.png" },
        { id: 2, title: "The Comfort of Jesus", projectLang: "English", contentType: "Direct Testing", aspectRatio: "9:16 / 1:1", videos: 6, buttonLabel: "In-progress", image: "images/Video-Slide1.png" },
        { id: 3, title: "The Comfort of Jesus", projectLang: "English", contentType: "Direct Testing", aspectRatio: "9:16 / 1:1", videos: 6, buttonLabel: "Editing", image: "images/VideoSlide1.png" },
    ];

    return (
        <>
            <div className="content__container final--step media--page">
                <Container fluid>
                    <Row>
                        <Col sm={12} className="mb-4">
                            <h2>Download Videos of Project</h2>
                        </Col>
                        <Col sm={12} lg={12}>
                            <Table responsive>
                                <tbody>
                                    {projects.map((project) => (
                                        <tr key={project.id} className={expandedRow === project.id ? 'open--table' : ''}>
                                            <td className="text-left">
                                                <img src={project.image} alt="" />
                                            </td>
                                            <td className={expandedRow === project.id ? 'head--click' : 'head--arrow'} onClick={() => RowExpand(project.id)}>{project.title}<FaChevronDown/></td>
                                            <td>{project.projectLang}</td>
                                            <td>{project.contentType}</td>
                                            <td className="text-lg-center">{project.aspectRatio}</td>
                                            <td className="text-lg-center">{project.videos}</td>
                                            <td>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="success"><FaEllipsisV/></Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="/">Edit</Dropdown.Item>
                                                        <Dropdown.Item href="/">Delete</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                            <td><Button variant="primary">Download</Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                        <Col sm={12} className="text-right">
                            <Button variant="primary">Download All</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={isCollapse ? 'steps--collaped' : 'steps--sidebar'}>
                <Navbar expand="lg">
                    <Navbar.Toggle aria-controls="steps-navbar-nav" className={isCollapse ? 'button--Toggle' : 'btn--Click'} onClick={handleClick} />
                    <Navbar.Collapse id="steps-navbar-nav">
                        <Nav>
                            <Nav.Link href="/create-project">01.</Nav.Link>
                            <Nav.Link href="/create-script">02.</Nav.Link>
                            <Nav.Link href="/script-translation">03.</Nav.Link>
                            <Nav.Link href="/create-media">04.</Nav.Link>
                            <Nav.Link className="active" href="/generate-video">05.</Nav.Link>
                        </Nav>
                        <ListGroup>
                            <ListGroup.Item>
                                <h3>05. Generate Videos</h3>
                            </ListGroup.Item>
                            <ListGroup.Item action href="/generate-video">Overview</ListGroup.Item>
                            <ListGroup.Item action href="/confirmation"><strong>Confirmation</strong></ListGroup.Item>
                            <ListGroup.Item>
                                <p className="text-left mb-0"><strong>Project styles</strong></p>
                                <p className="text-left">AI Avatar <br/>AI Video <br/><strong>AI Images</strong></p>
                                <p className="text-left mb-0"><strong>Project languages</strong></p>
                                <p className="text-left"><strong>English</strong><br/>Bengali<br/> Hindi</p>
                                <p className="text-left mb-0"><strong>Project name</strong></p>
                                <p className="text-left">Comfort Of Jesus</p>
                                <p className="text-left mb-0">Current video length</p>
                                <p className="text-left"><FaRegClock/> 1:02</p>
                                <Button variant="light" className="mb-3">Next Language</Button>
                                <Button variant="secondary" disabled>Save Draft</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </>
    );
}

export default ConfirmVideoStep;
