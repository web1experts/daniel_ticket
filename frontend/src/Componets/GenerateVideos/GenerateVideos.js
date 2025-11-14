import React, { useState } from "react";
import { Col, Container, Row, ListGroup, Button, Navbar, Nav, Card, Form } from "react-bootstrap";
import { FaRegClock, FaPlay } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import './generateStyle.css';
import '../../App.css';

function GenerateVideoStep() {

    const [isActive, setIsActive] = useState(false);
    const handleClick = event => {
        setIsActive(current => !current);
    };

    const [isToggle, setIsToggle] = useState(false);
    const handleSwitch = event => {
        setIsToggle(current => !current);
    };

    return (
        <>
            <div className="content__container final--step media--page">
                <Container fluid>
                    <Row>
                        <Col sm={12} className="mb-4">
                            <h2>Confirm Creation of the following:</h2>
                        </Col>
                        <Col sm={12} lg={12} xl={9}>
                            <ListGroup>
                                <ListGroup.Item>
                                    <h3>Script:</h3>
                                    <p>The Comfort of Jesus</p>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h3>Format:</h3>
                                    <p>1:1 (Square)</p>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h3>Duration:</h3>
                                    <p>01:02</p>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h3>Versions:</h3>
                                    <p>V1- Art Blog<br/>
                                        V2- AI Images<br/>
                                        V3 - AI Video</p>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h3>Audio:</h3>
                                    <p>V1- Art Blog - TTS, Music<br/>
                                        V2- AI Images - Music<br/>
                                        V3 - AI Video  - Voice over, Music</p>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h3>Language:</h3>
                                    <p>Indonesian, Khmer, Bangla</p>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h3>Total Videos being Generated:</h3>
                                    <p>9 videos</p>
                                </ListGroup.Item>
                            </ListGroup>
                            <p className="toggle--par my-4 text-center">
                                <strong>Text to Speech Voice Over:</strong>
                                <button type="button" className={isToggle ? 'switch--on switch--toggle' : 'switch--toggle'} onClick={handleSwitch} data-toggle="button" aria-pressed="false" autocomplete="off"><div class="handle"></div></button>
                            </p>
                            <div className={isToggle ? 'video--voiceover voice--open mb-4' : 'video--voiceover'}>
                                <Row>
                                    <Col sm={2}>
                                        <p>Voice Overs:</p>
                                    </Col>
                                    <Col sm={10}>
                                        <h5 className="mb-2">Video - Indonesian</h5>
                                        <ListGroup horizontal>
                                            <ListGroup.Item>
                                                <Form>
                                                    <Form.Group className="form-group mb-0">
                                                        <Form.Select className="form-control">
                                                            <option value="1" selected>Voice</option>
                                                            <option value="2">Tone</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group className="mb-0 form-group">
                                                        <Form.Select className="form-control">
                                                            <option value="1">Voice</option>
                                                            <option value="2" selected>Tone</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Form>
                                            </ListGroup.Item>
                                            <ListGroup.Item><span className="play--icon"><FaPlay/></span></ListGroup.Item>
                                        </ListGroup>
                                        <h5 className="mb-2">Video - Khmer</h5>
                                        <ListGroup horizontal>
                                            <ListGroup.Item>
                                                <Form>
                                                    <Form.Group className="form-group mb-0">
                                                        <Form.Select className="form-control">
                                                            <option value="1" selected>Voice</option>
                                                            <option value="2">Tone</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group className="mb-0 form-group">
                                                        <Form.Select className="form-control">
                                                            <option value="1">Voice</option>
                                                            <option value="2" selected>Tone</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Form>
                                            </ListGroup.Item>
                                            <ListGroup.Item><span className="play--icon"><FaPlay/></span></ListGroup.Item>
                                        </ListGroup>
                                        <h5 className="mb-2">Video - Bangla</h5>
                                        <ListGroup horizontal>
                                            <ListGroup.Item>
                                                <Form>
                                                    <Form.Group className="form-group mb-0">
                                                        <Form.Select className="form-control">
                                                            <option value="1" selected>Voice</option>
                                                            <option value="2">Tone</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group className="mb-0 form-group">
                                                        <Form.Select className="form-control">
                                                            <option value="1">Voice</option>
                                                            <option value="2" selected>Tone</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Form>
                                            </ListGroup.Item>
                                            <ListGroup.Item><span className="play--icon"><FaPlay/></span></ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </div>
                            <div className="preview--grid">
                                <Row>
                                    <Col sm={2}>Preview:</Col>
                                    <Col sm={10}>
                                        <div className="scroll--div">
                                            <Card>
                                                <Card.Body>
                                                    <Card.Img variant="top" src="./images/comfort.png" alt="Confort of Jesus" />
                                                    <Card.Title>The Comfort of Jesus</Card.Title>
                                                </Card.Body>
                                                <Card.Body>
                                                    <Card.Img variant="top" src="./images/comfort.png" alt="Confort of Jesus" />
                                                    <Card.Title>When we bear emotional scars from our parents, it's easy to feel neglected and unloved.</Card.Title>
                                                </Card.Body>
                                                <Card.Body>
                                                    <Card.Img variant="top" src="./images/comfort.png" alt="Confort of Jesus" />
                                                    <Card.Title>When we bear emotional scars from our parents, it's easy to feel neglected and unloved.</Card.Title>
                                                </Card.Body>
                                                <Card.Body>
                                                    <Card.Img variant="top" src="./images/comfort.png" alt="Confort of Jesus" />
                                                    <Card.Title>When we bear emotional scars from our parents, it's easy to feel neglected and unloved.</Card.Title>
                                                </Card.Body>
                                                <Card.Body>
                                                    <Card.Img variant="top" src="./images/comfort.png" alt="Confort of Jesus" />
                                                    <Card.Title>When we bear emotional scars from our parents, it's easy to feel neglected and unloved.</Card.Title>
                                                </Card.Body>
                                                <Card.Body>
                                                    <Card.Img variant="top" src="./images/comfort.png" alt="Confort of Jesus" />
                                                    <Card.Title>When we bear emotional scars from our parents, it's easy to feel neglected and unloved.</Card.Title>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col sm={12} className="text-right">
                            <Button variant="primary" className="btn--sticky">Continue to Render</Button>
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
                            <Nav.Link href="/create-media">04.</Nav.Link>
                            <Nav.Link className="active" href="/generate-video">05.</Nav.Link>
                        </Nav>
                        <ListGroup>
                            <ListGroup.Item>
                                <h3>05. Generate Videos</h3>
                            </ListGroup.Item>
                            <ListGroup.Item action href="/generate-video"><strong>Overview</strong></ListGroup.Item>
                            <ListGroup.Item action href="/confirmation">Confirmation</ListGroup.Item>
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

export default GenerateVideoStep;
