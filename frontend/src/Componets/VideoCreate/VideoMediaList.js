import React, { useState } from "react";
import { Col, Container, Row, ListGroup, Button, Navbar, Nav, Card } from "react-bootstrap";
import { FaRegClock } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import './mediaStyle.css';
import '../../App.css';

function VideoMediaList() {

    const [isActive, setIsActive] = useState(false);
    const handleClick = event => {
        setIsActive(current => !current);
    };

    return (
        <>
            <div className="content__container media--List media--page">
                <Container fluid>
                    <Row>
                        <Col sm={12} lg={3} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Img variant="top" src="./images/comfort.png" alt="Confort of Jesus" />
                                    <Card.Title>যীশুর সান্ত্বনা</Card.Title>
                                    <Card.Text className="text-right">1</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} lg={3} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Img variant="top" src="./images/comfort.png" alt="Confort of Jesus" />
                                    <Card.Title>যখন আমরা আমাদের মাতা-পিতা থেকে আবেগিক ক্ষতি উঠাই, তখন অসাদুপন্ন এবং অপ্রেমিতা অনুভব করা সহজ।</Card.Title>
                                    <Card.Text className="text-right">2</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} lg={3} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Img variant="top" src="./images/comfort.png" alt="Confort of Jesus" />
                                    <Card.Title>কিন্তু এখানে সুখবার: কাঁদতে কোন দিনও সমস্যা নয়।</Card.Title>
                                    <Card.Text className="text-right">3</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} lg={3} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Img variant="top" src="./images/comfort.png" alt="Confort of Jesus" />
                                    <Card.Title>কিন্তু এখানে সুখবার: কাঁদতে কোন দিনও সমস্যা নয়।</Card.Title>
                                    <Card.Text className="text-right">4</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} lg={3} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Img variant="top" src="./images/comfort.png" alt="Confort of Jesus" />
                                    <Card.Title>The Comfort of Jesus</Card.Title>
                                    <Card.Text className="text-right">5</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} lg={3} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Img variant="top" src="./images/comfort.png" alt="Confort of Jesus" />
                                    <Card.Title>The Comfort of Jesus</Card.Title>
                                    <Card.Text className="text-right">6</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} lg={3} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Img variant="top" src="./images/comfort.png" alt="Confort of Jesus" />
                                    <Card.Title>The Comfort of Jesus</Card.Title>
                                    <Card.Text className="text-right">7</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} lg={3} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Img variant="top" src="./images/comfort.png" alt="Confort of Jesus" />
                                    <Card.Title>The Comfort of Jesus</Card.Title>
                                    <Card.Text className="text-right">8</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} lg={3}>
                            <Card>
                                <Card.Body>
                                    <Card.Img variant="top" src="./images/comfort.png" alt="Confort of Jesus" />
                                    <Card.Title>The Comfort of Jesus</Card.Title>
                                    <Card.Text className="text-right">9</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} lg={3}>
                            <Card>
                                <Card.Body>
                                    <Card.Img variant="top" src="./images/comfort.png" alt="Confort of Jesus" />
                                    <Card.Title>The Comfort of Jesus</Card.Title>
                                    <Card.Text className="text-right">10</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} lg={3}>
                            <Card>
                                <Card.Body>
                                    <Card.Img variant="top" src="./images/comfort.png" alt="Confort of Jesus" />
                                    <Card.Title>The Comfort of Jesus</Card.Title>
                                    <Card.Text className="text-right">11</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} lg={3}>
                            <Card>
                                <Card.Body>
                                    <Card.Img variant="top" src="./images/comfort.png" alt="Confort of Jesus" />
                                    <Card.Title>The Comfort of Jesus</Card.Title>
                                    <Card.Text className="text-right">12</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={isActive ? 'steps--collaped' : 'steps--sidebar'}>
                <Navbar expand="lg">
                    <Navbar.Toggle aria-controls="steps-navbar-nav" className={isActive ? 'button--Toggle' : 'btn--Click'} onClick={handleClick} />
                    <Navbar.Collapse id="steps-navbar-nav">
                        <Nav>
                            <Nav.Link href="/create-project">01.</Nav.Link>
                            <Nav.Link href="/create-script">02.</Nav.Link>
                            <Nav.Link href="/script-translation">03.</Nav.Link>
                            <Nav.Link className="active" href="/create-media">04.</Nav.Link>
                            <Nav.Link href="/generate-video">05.</Nav.Link>
                        </Nav>
                        <ListGroup>
                            <ListGroup.Item>
                                <h3>04. Video</h3>
                            </ListGroup.Item>
                            <ListGroup.Item><strong>Script to visuals</strong></ListGroup.Item>
                            <ListGroup.Item>Select Media</ListGroup.Item>
                            <ListGroup.Item>Control Timing</ListGroup.Item>
                            <ListGroup.Item>Translated Visuals</ListGroup.Item>
                            <ListGroup.Item>
                                <p className="text-left mb-0"><strong>Project styles</strong></p>
                                <p className="text-left">AI Avatar <br />AI Video <br /><strong>AI Images</strong></p>
                                <p className="text-left mb-0"><strong>Project languages</strong></p>
                                <p className="text-left"><strong>English</strong><br />Bengali<br /> Hindi</p>
                                <p className="text-left mb-0"><strong>Project name</strong></p>
                                <p className="text-left">Comfort Of Jesus</p>
                                <p className="text-left mb-0">Current video length</p>
                                <p className="text-left"><FaRegClock /> 1:02</p>
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

export default VideoMediaList;