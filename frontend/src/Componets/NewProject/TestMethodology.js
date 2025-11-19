import React, { useState } from "react";
import { Col, Container, Row, Button, Table, Form } from "react-bootstrap";
import { FaChevronDown } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import './createNewStyle.css';
import '../../App.css';
import SidebarPanel from "../Sidebar/Sidebar";

function MethodologyStep() {

    const [expandedRow, setExpandedRow] = useState(null);

    const RowExpand = rowId => {
        setExpandedRow(expandedRow === rowId ? null : rowId);
    };


    const projects = [
        { id: 1, title: "When Someone You Love Dies", projectId: "Test 1A", image: "images/Screenshot1.png" },
        { id: 2, title: "When Someone You Love Dies", projectId: "Test 3A", image: "images/Screenshot2.png" },
        { id: 3, title: "When Someone You Love Dies", projectId: "Test 2A", image: "images/Screenshot1.png" },
        { id: 4, title: "When Someone You Love Dies", projectId: "Test 4A", image: "images/Screenshot1.png" },
    ];

    return (
        <>
            <SidebarPanel />
            <div className="content__container new--Project--page test--metho">
                <Container fluid>
                    <Row>
                        <Col sm={12} className="mb-4">
                            <h2>Test Methodology</h2>
                        </Col>
                        <Col sm={12} lg={10}>
                            <Form>
                                <Form.Group className="mb-3 d-md-flex align-items-center">
                                    <Form.Control type="text" placeholder="Script ID" />
                                    <Button variant="secondary" className="ml-md-3 mt-2 mt-md-0" disabled type="submit">Import</Button>
                                </Form.Group>
                                <Form.Group className="form-group">
                                    <Form.Select className="form-control">
                                        <option selected>What element are you testing?</option>
                                        <option>Normal Colour</option>
                                        <option>Black & White</option>
                                        <option>Saturated Colour</option>
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                            <Table responsive>
                                <tbody>
                                    {projects.map((project) => (
                                        <tr key={project.id} className={expandedRow === project.id ? 'open--table' : ''}>
                                            <td>
                                                <img src={project.image} alt="" />
                                            </td>
                                            <td className={expandedRow === project.id ? 'head--click' : 'head--arrow'} onClick={() => RowExpand(project.id)}>{project.title}<FaChevronDown/></td>
                                            <td>{project.projectId}</td>
                                            <td>
                                                <Form.Select className="form-control">
                                                    <option selected>Normal Colour</option>
                                                    <option>Black & White</option>
                                                    <option>Saturated Colour</option>
                                                </Form.Select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                        <Col sm={12} lg={10} className="text-right">
                            <Button variant="primary">Finalise Project</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default MethodologyStep;