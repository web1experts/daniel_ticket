import React, { useState } from "react";
import { Col, Container, Row, Form, ListGroup, Button, Navbar, Nav, Tabs, Tab, CardGroup, Card } from "react-bootstrap";
import { FiArrowRight } from "react-icons/fi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import 'bootstrap/dist/css/bootstrap.min.css';
import './createScriptStyle.css';
import '../../App.css';
import SidebarPanel from "../Sidebar/Sidebar";

function CreateScriptWideStep() {

    const [isActive, setIsActive] = useState(false);
    const handleClick = event => {
        setIsActive(current => !current);
    };

    return (
        <>
            <SidebarPanel/>
            <div className="content__container new--script--page">
                <Container fluid className="h-100">
                    <Row className="h-100">
                        <Col sm={12} className="h-100">
                            <h4 className="mb-3">Select Script type</h4>
                            <Tabs defaultActiveKey="Input">
                                <Tab eventKey="Input" title="Input Script">
                                    <h5>Generate Script with AI</h5>
                                    <p>Provide a URL to an article or blog here to import its text and media, or add your text below. AI will turn every sentence into a scene in your video.</p>
                                    <Form>
                                        <Form.Group className="mb-3 d-md-flex align-items-center">
                                            <Form.Control type="text" placeholder="Paste URL Here" />
                                            <Button variant="secondary" className="ml-md-3 mt-2 mt-md-0" disabled type="submit">Import</Button>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Control as="textarea" rows={20} placeholder="Paste content here. Every sentence with punctuation will be turned into a new scene." />
                                        </Form.Group>
                                        <Form.Group className="text-right">
                                            <Button variant="secondary" disabled type="submit">Continue <FiArrowRight /></Button>
                                        </Form.Group>
                                    </Form>
                                </Tab>
                                <Tab eventKey="Generative" title="Generative Script">
                                    <h5>Generate Script with AI</h5>
                                    <Form>
                                        <Row>
                                            <Col sm={12} md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Themes</Form.Label>
                                                    <Form.Select className="form-control">
                                                        <option selected>Purpose</option>
                                                        <option>Purpose</option>
                                                        <option>Purpose</option>
                                                        <option>Purpose</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Sub-themes</Form.Label>
                                                    <Form.Select className="form-control">
                                                        <option selected>Wisdom</option>
                                                        <option>Purpose</option>
                                                        <option>Purpose</option>
                                                        <option>Purpose</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} md={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Keywords <small><i>[optional] (e.g. Meaning, question, answer, enlightenment)</i></small></Form.Label>
                                                    <Form.Control type="text" placeholder="Meaning, question, creation, heaven and earth" />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Form.Group className="text-right">
                                            <Button variant="primary" type="submit">Generate Text</Button>
                                        </Form.Group>
                                    </Form>
                                    <div className="generate--script generate--script--wide mt-4">
                                        <div className="main--scroll">
                                            <h4>Script 1</h4>
                                            <div className="inner--script">
                                                <div className="script--desc">
                                                    <div className="script--scroll">
                                                        <p>1. Jesus speaks of God as the Creator of the universe - For in six days the Lord made the heavens and the earth, the sea, and all that is in them, (Exodus 20:11). </p>
                                                        <p>2. He teaches us to look to God as our source of wisdom and reveals the importance of prayer and dependence on God.</p>
                                                        <p>3. Jesus understood that God had a unique relationship with humans, one that was meant to be intimate and personal.</p>
                                                        <p>4. He said, “Before you call on me, I will answer; while you are still speaking, I will hear, (Isaiah 65:24).</p>
                                                        <p>5. Jesus also made it clear that there is no other God besides Him,</p>
                                                    </div>
                                                    {/* <Button variant="primary">Use this Script</Button> */}
                                                </div>
                                                <div className="rate--script">
                                                    <p><strong>Rate Script</strong></p>
                                                    <div className="range--slider">
                                                        <p>
                                                            <span className="range--mark">5</span></p>
                                                        <p className="max--range"><span>0</span><span>10</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <h4 className="mt-3">Script 2</h4>
                                            <div className="inner--script">
                                                <div className="script--desc">
                                                    <div className="script--scroll">
                                                        <p>1) Jesus brings us hope as He shows us God's love and promises. He came to Earth in a human form to show us how we could live our lives with peace and joy.</p>
                                                        <p>2) Jesus told us that we were created by God in His image and likeness and that we have the capability to live in harmony and serve others.</p>
                                                        <p>3) Jesus showed us the importance of being compassionate and forgiving, and He revealed to us how to have a personal relationship with God.</p>
                                                        <p>4) Jesus taught us how to use our gifts to help others and to be a light in the world. He reminded us that our value in life comes from God, not from our possessions or achievements.</p>
                                                    </div>
                                                    {/* <Button variant="primary">Use this Script</Button> */}
                                                </div>
                                                <div className="rate--script">
                                                    <p><strong>Rate Script</strong></p>
                                                    <div className="range--slider">
                                                        <p>
                                                            <span className="range--mark">5</span></p>
                                                        <p className="max--range"><span>0</span><span>10</span></p>
                                                    </div>
                                                    {/* <Form.Control type="range" min="0" max="10" /> */}
                                                </div>
                                            </div>
                                            <h4 className="mt-3">Script 3</h4>
                                            <div className="inner--script">
                                                <div className="script--desc">
                                                    <div className="script--scroll">
                                                        <p>1) Jesus brings us hope as He shows us God's love and promises. He came to Earth in a human form to show us how we could live our lives with peace and joy.</p>
                                                        <p>2) Jesus told us that we were created by God in His image and likeness and that we have the capability to live in harmony and serve others.</p>
                                                        <p>3) Jesus showed us the importance of being compassionate and forgiving, and He revealed to us how to have a personal relationship with God.</p>
                                                        <p>4) Jesus taught us how to use our gifts to help others and to be a light in the world. He reminded us that our value in life comes from God, not from our possessions or achievements.</p>
                                                    </div>
                                                    {/* <Button variant="primary">Use this Script</Button> */}
                                                </div>
                                                <div className="rate--script">
                                                    <p><strong>Rate Script</strong></p>
                                                    <div className="range--slider">
                                                        <p>
                                                            <span className="range--mark">5</span></p>
                                                        <p className="max--range"><span>0</span><span>10</span></p>
                                                    </div>
                                                    {/* <Form.Control type="range" min="0" max="10" /> */}
                                                </div>
                                            </div>
                                            <h4 className="mt-3">Script 4</h4>
                                            <div className="inner--script">
                                                <div className="script--desc">
                                                    <div className="script--scroll">
                                                        <p>1. Jesus speaks of God as the Creator of the universe - For in six days the Lord made the heavens and the earth, the sea, and all that is in them, (Exodus 20:11). </p>
                                                        <p>2. He teaches us to look to God as our source of wisdom and reveals the importance of prayer and dependence on God.</p>
                                                        <p>3. Jesus understood that God had a unique relationship with humans, one that was meant to be intimate and personal.</p>
                                                        <p>4. He said, “Before you call on me, I will answer; while you are still speaking, I will hear, (Isaiah 65:24).</p>
                                                        <p>5. Jesus also made it clear that there is no other God besides Him,</p>
                                                    </div>
                                                    {/* <Button variant="primary">Use this Script</Button> */}
                                                </div>
                                                <div className="rate--script">
                                                    <p><strong>Rate Script</strong></p>
                                                    <div className="range--slider">
                                                        <p>
                                                            <span className="range--mark">5</span></p>
                                                        <p className="max--range"><span>0</span><span>10</span></p>
                                                    </div>
                                                    {/* <Form.Control type="range" min="0" max="10" /> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="generate--block">
                                            <h4>Generated Script</h4>
                                            <div className="paste--content">
                                                <p>Copy and Paste content here from the generated scripts. Every sentence with punctuation will be turned into a new scene.</p>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="Script" className="tab--script" title="Script Library">
                                    <Form>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>Theme</Form.Label>
                                            <Form.Control type="text" placeholder="Love" />
                                        </Form.Group>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>Sub-theme</Form.Label>
                                            <Form.Control type="text" placeholder="Relationships" />
                                        </Form.Group>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>Language</Form.Label>
                                            <Form.Control type="text" placeholder="English" />
                                        </Form.Group>
                                        <Form.Group className="text-right mb-3 form-group">
                                            <Button variant="primary" type="submit">Search</Button>
                                        </Form.Group>
                                    </Form>
                                    <CardGroup>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>Love <small>Relationship</small></Card.Title>
                                                <Card.Text>Love. What does it even mean? Is it possible to really love someone or to be loved fully? True love is closer than you think A man named Jesus gave up everything for you because of true love. Want to learn more?...</Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <h4>Keywords<small>Love, True love, Relationship..</small></h4>
                                                <Button variant="link">Read More <HiOutlineArrowNarrowRight /></Button>
                                            </Card.Footer>
                                        </Card>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>Meaning of Life <small>Purpose/Meaning</small></Card.Title>
                                                <Card.Text>You know, one of the worst feelings imaginable is the feeling of being alone. We were designed for relationships. But, here's the thing, there are so many barriers to that. How are we supposed to really find meaningful relationships? Jesus claimed that God loves us for who we are...</Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <h4>Keywords<small>Alone, Relationships, Love..</small></h4>
                                                <Button variant="link">Read More <HiOutlineArrowNarrowRight /></Button>
                                            </Card.Footer>
                                        </Card>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>Shame Related to Unrequited Love <small>Relationship</small></Card.Title>
                                                <Card.Text>Shame that results from unrequited love is painful. It makes you feel like you are unworthy and not good enough. It can make you feel empty, lonely and lower self-esteem. Is it possible to overcome this terrible shame? Jesus understands your painful feelings. He wants to comfort...</Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <h4>Keywords<small>Shame, Love, Pain, Comfort, Broken, Brokenhearted,Ashamed...</small></h4>
                                                <Button variant="link">Read More <HiOutlineArrowNarrowRight /></Button>
                                            </Card.Footer>
                                        </Card>
                                    </CardGroup>
                                    <CardGroup>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>The Addicted Father <small>Relationship</small></Card.Title>
                                                <Card.Text>Not everyone has a close relationship with their father. Some people have an addicted father. Dealing with his addictions is exhausting. They struggle with low self-esteem and fears. Jesus understands your pains. He wants to give you rest and hope. He will comfort you with u...</Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <h4>Keywords<small>Love, True love, Relationship..</small></h4>
                                                <Button variant="link">Read More <HiOutlineArrowNarrowRight /></Button>
                                            </Card.Footer>
                                        </Card>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>Comfort for the Heavy Hearts <small>Suffering/Physical Need</small></Card.Title>
                                                <Card.Text>Don't we all need a bit of encouragement sometimes? Our heart is often heavy during this time. Not everyone can understand what you're going through. Jesus understands your weariness. Jesus wants to comfort you with His love. He wants to overcome this challenging time with you...</Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <h4>Keywords<small>Alone, Relationships, Love..</small></h4>
                                                <Button variant="link">Read More <HiOutlineArrowNarrowRight /></Button>
                                            </Card.Footer>
                                        </Card>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>Unconditional Love <small>Love</small></Card.Title>
                                                <Card.Text>Humans like to think that our love is unconditional. But, if we are honest, our love is full of conditions. That's why we are in so many broken relationships. But Jesus' love for you is free. You don't have to earn it. It's real. He accepts you just the way you are...</Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <h4>Keywords<small>Unconditional, Love, Broken, Je, Jesus..</small></h4>
                                                <Button variant="link">Read More <HiOutlineArrowNarrowRight /></Button>
                                            </Card.Footer>
                                        </Card>
                                    </CardGroup>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={isActive ? 'steps--collaped' : 'steps--sidebar'}>
                <Navbar expand="lg">
                    <Navbar.Toggle aria-controls="steps-navbar-nav" className={isActive ? 'button--Toggle' : 'btn--Click'} onClick={handleClick} />
                    {/* <Navbar.Toggle aria-controls="steps-navbar-nav" /> */}
                    <Navbar.Collapse id="steps-navbar-nav">
                        <Nav>
                            <Nav.Link href="/create-project">01.</Nav.Link>
                            <Nav.Link className="active" href="/create-script">02.</Nav.Link>
                            <Nav.Link href="/script-translation">03.</Nav.Link>
                            <Nav.Link href="/create-media">04.</Nav.Link>
                            <Nav.Link href="/generate-video">05.</Nav.Link>
                        </Nav>
                        <ListGroup>
                            <ListGroup.Item>
                                <h3>02. Make a Script</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>Input Script</ListGroup.Item>
                            <ListGroup.Item>Generative Script</ListGroup.Item>
                            <ListGroup.Item>Choose Script from Script Library</ListGroup.Item>
                            <ListGroup.Item action href="/script-review">Script Review</ListGroup.Item>
                            <ListGroup.Item action href="/review-guidelines">Script Guideline Review</ListGroup.Item>
                            <ListGroup.Item>
                                <Button variant="info">Save Draft</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </>
    );
}

export default CreateScriptWideStep;