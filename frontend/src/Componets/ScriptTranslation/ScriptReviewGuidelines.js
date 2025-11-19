import React, { useState } from "react";
import { Col, Container, Row, ListGroup, Button, Navbar, Nav, ButtonGroup, CardGroup, Card } from "react-bootstrap";
import { FaRegClock } from "react-icons/fa";
import SidebarPanel from "../Sidebar/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './translationStyle.css';
import '../../App.css';

function ScriptReviewGuidelinesPage() {

    const [isActive, setIsActive] = useState(false);
    const handleClick = event => {
        setIsActive(current => !current);
    };

    return (
        <>
            <SidebarPanel/>
            <div className="content__container new--script--page Translation--page">
                <Container fluid>
                    <Row>
                        <Col sm={12}>
                            <h2 className="mb-5">Script Guideline Review</h2>
                            <div className="review--content">
                                <p>
                                    <span>Title</span>
                                    <h5>The Comfort of Jesus</h5>
                                </p>
                                <p>
                                    <span>The Message</span>
                                    <h6>When we bear emotional scars from our parents, it's easy to feel neglected and unloved. <br/>
                                    But here's the good news: it's okay to cry. <br/>
                                    Don't be afraid to let your emotions out. <br/>Cry if you need to.</h6>
                                </p>
                                <p>
                                    <span>The Hope</span>
                                    <h6>Jesus cares for you, loves you, and wants to comfort you.<br/> He is there to wipe away our tears and heal our wounds.<br/>
                                     You don't have to carry the burden alone. <br/>Jesus loves you unconditionally, no matter what you've been through. <br/>
                                     You are never alone in your struggles. <br/>Lean on Him for strength and find comfort in His embrace.</h6>
                                </p>
                                <p>
                                    <span>The Closing</span>
                                    <h6>Know that in the arms of Jesus, you can find the healing and love you've always longed for.<br/> You are cherished, and you are never alone.</h6>
                                </p>
                                <p>
                                    <span>Headline</span>
                                    <h6>Don't be afraid to let your emotions out.</h6>
                                </p>
                                <p>
                                    <span>Cta</span>
                                    <h6>Click here to learn more.</h6>
                                </p>
                            </div>
                            
                            <div className="suggestion--box">
                                <div className="d-md-flex align-items-center">
                                    <h5>Social Guidelines Suggestions</h5>
                                    <ButtonGroup className="ml-auto">
                                        <Button variant="link" size="sm">Reject</Button>
                                        <Button variant="primary" size="sm">Accept</Button>
                                    </ButtonGroup>
                                </div>
                                <CardGroup>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Line Review</Card.Title>
                                            <Card.Text>“Know that in the arms of Jesus, you can find the healing and love you've always longed for.”</Card.Text>
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Guideline</Card.Title>
                                            <Card.Text>“Facebook: Misleading information. Promising a solution to a issue or problem.”</Card.Text>
                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Suggestion</Card.Title>
                                            <Card.Text>“Know that in the arms of Jesus, <em>He can help</em> you can find the healing and love you've always longed for.”</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </CardGroup>
                            </div>
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
                            <Nav.Link className="active" href="/script-translation">03.</Nav.Link>
                            <Nav.Link href="/create-media">04.</Nav.Link>
                            <Nav.Link href="/generate-video">05.</Nav.Link>
                        </Nav>
                        <ListGroup>
                            <ListGroup.Item>
                                <h3>03. Translations</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>Article based script</ListGroup.Item>
                            <ListGroup.Item>Generative Script</ListGroup.Item>
                            <ListGroup.Item>Choose Script from Script Library</ListGroup.Item>
                            <ListGroup.Item action href="/script-review">Script Review</ListGroup.Item>
                            <ListGroup.Item action href="/review-guidelines"><strong>Script Guideline Review</strong></ListGroup.Item>
                            <ListGroup.Item>
                                <p>Current video length</p>
                                <p><FaRegClock/>1:02</p>
                                <Button variant="primary" className="mb-3">Finalise Script</Button>
                                <Button variant="info">Save Draft</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </>
    );
}

export default ScriptReviewGuidelinesPage;