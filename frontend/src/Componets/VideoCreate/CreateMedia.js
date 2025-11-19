import React, { useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { Col, Container, Row, ListGroup, Button, Navbar, Nav, Card, Tabs, Tab, CardGroup, Form, ListGroupItem, CardImg } from "react-bootstrap";
import { FaRegClock, FaChevronDown, FaMicrophone, FaPlay, FaRegCircle, FaSearch, FaRegSquare, FaRegStar, FaEllipsisV } from "react-icons/fa";
import { BsAspectRatio, BsSoundwave, BsPencilFill } from "react-icons/bs";
import { FiFilm, FiTriangle } from 'react-icons/fi';
import { RxText, RxDividerVertical, RxLineHeight } from 'react-icons/rx';
import { ImArrowUpRight2 } from "react-icons/im";
import { CgFontSpacing } from "react-icons/cg";
import { MdOutlineTextFields, MdAlignHorizontalLeft, MdOutlineAlignHorizontalCenter, MdOutlineAlignHorizontalRight, MdAlignVerticalTop, MdAlignVerticalCenter, MdAlignVerticalBottom, MdOutlineVerticalAlignTop, MdOutlineVerticalAlignCenter, MdVerticalAlignBottom } from "react-icons/md";
import { LuRectangleHorizontal, LuRectangleVertical, LuAlignLeft, LuAlignCenter, LuAlignRight } from "react-icons/lu";
import { TbRectangleVertical } from "react-icons/tb";
import { BiExpandAlt } from "react-icons/bi";
import { HiViewGridAdd, HiOutlineSearch } from "react-icons/hi";
import 'bootstrap/dist/css/bootstrap.min.css';
import './mediaStyle.css';
import '../../App.css';

function CreateVideoStep() {

    const [color, setColor] = useColor("#561ecb");

    const [isActive, setIsActive] = useState(false);
    const handleClick = event => {
        setIsActive(current => !current);
    };

    const [isShow, setisShow] = useState(false);
    const handleCollapse = event => {
        setisShow(current => !current);
    };

    const [isOpen, setIsOpen] = useState(false);
    const handleArrow = event => {
        setIsOpen(current => !current);
    };

    return (
        <>
            <div className={isShow ? 'collapse--media media--sidebar' : 'media--sidebar'}>
                <Button variant="light" className={isShow ? 'button--Toggle btn--Click' : 'btn--Click'} onClick={handleCollapse}><FaChevronDown /></Button>
                <Tabs defaultActiveKey="media" className="media--tabs">
                    <Tab eventKey="media" title={<span><FiFilm /> Media</span>}>
                        <Tabs defaultActiveKey="library">
                            <Tab eventKey="library" title="Stock Library">
                                <Form>
                                    <Form.Group className="form-group">
                                        <Form.Control type="text" placeholder="Search..." />
                                        <FaSearch />
                                    </Form.Group>
                                </Form>
                                <CardGroup>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-01.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-02.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-03.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-04.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-03.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-02.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-04.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-01.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-02.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-03.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-04.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-01.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-03.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-04.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-01.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-02.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-04.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-01.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-03.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-04.png" alt="..." />
                                    </Card>
                                    <Card className="mb-0">
                                        <Card.Img variant="top" src="./images/Screenshot-01.png" alt="..." />
                                    </Card>
                                    <Card className="mb-0">
                                        <Card.Img variant="top" src="./images/Screenshot-02.png" alt="..." />
                                    </Card>
                                </CardGroup>
                            </Tab>
                            <Tab eventKey="images" title="AI Images">
                                <Form>
                                    <Form.Group className="form-group">
                                        <Form.Control type="text" placeholder="Search..." />
                                        <FaSearch />
                                    </Form.Group>
                                </Form>
                                <CardGroup>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                </CardGroup>
                            </Tab>
                            <Tab eventKey="video" title="AI video">
                                <Form>
                                    <Form.Group className="form-group">
                                        <Form.Control type="text" placeholder="Search..." />
                                        <FaSearch />
                                    </Form.Group>
                                </Form>
                                <CardGroup>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-03.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-04.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-03.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-02.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-01.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-03.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-04.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-01.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-03.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-04.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-01.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-02.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-04.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-01.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-03.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-04.png" alt="..." />
                                    </Card>
                                    <Card className="mb-0">
                                        <Card.Img variant="top" src="./images/Screenshot-01.png" alt="..." />
                                    </Card>
                                    <Card className="mb-0">
                                        <Card.Img variant="top" src="./images/Screenshot-02.png" alt="..." />
                                    </Card>
                                </CardGroup>
                            </Tab>
                            <Tab eventKey="uploads" title="Uploads">
                                <Form>
                                    <Form.Group className="form-group">
                                        <Form.Control type="text" placeholder="Search..." />
                                        <FaSearch />
                                    </Form.Group>
                                </Form>
                                <CardGroup>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                </CardGroup>
                            </Tab>
                            <Tab eventKey="recent" title="Recent">
                                <Form>
                                    <Form.Group className="form-group">
                                        <Form.Control type="text" placeholder="Search..." />
                                        <FaSearch />
                                    </Form.Group>
                                </Form>
                                <CardGroup>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-03.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-04.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-03.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-02.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-01.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-03.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-04.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-01.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-03.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-04.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-03.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-04.png" alt="..." />
                                    </Card>
                                    <Card className="mb-0">
                                        <Card.Img variant="top" src="./images/Screenshot-01.png" alt="..." />
                                    </Card>
                                    <Card className="mb-0">
                                        <Card.Img variant="top" src="./images/Screenshot-02.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                </CardGroup>
                            </Tab>
                        </Tabs>
                    </Tab>
                    <Tab eventKey="elements" className="elements--tabs" title={<span><HiViewGridAdd /> Elements</span>}>
                        <Tabs defaultActiveKey="text">
                            <Tab eventKey="text" title={<span><RxText /></span>}>
                                <div className="inner--tabs--pane">
                                    <h6>Project Colours</h6>
                                    <ColorPicker color={color} onChange={setColor} hideInput={["rgb", "hsv"]} />
                                </div>
                                <div className="inner--tabs--pane">
                                    <h6>Character</h6>
                                    <Form>
                                        <Form.Group className="mb-2 form-group font--search">
                                            <Form.Select className="form-control">
                                                <option selected>Plus Jakarta Sans</option>
                                                <option>Raleway</option>
                                                <option>Montserrat</option>
                                                <option>Ubuntu</option>
                                            </Form.Select>
                                            <HiOutlineSearch/>
                                        </Form.Group>
                                        <Form.Group className="mb-2 form-group">
                                            <Form.Select className="form-control">
                                                <option selected>Regular</option>
                                                <option>Medium</option>
                                                <option>Semibold</option>
                                                <option>Bold</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Row>
                                            <Col sm={12} lg={6}>
                                                <Form.Group className="mb-2 form-group">
                                                    <MdOutlineTextFields/>
                                                    <Form.Select className="form-control">
                                                        <option>8</option>
                                                        <option>10</option>
                                                        <option>11</option>
                                                        <option selected>12</option>
                                                        <option>14</option>
                                                        <option>16</option>
                                                        <option>18</option>
                                                        <option>20</option>
                                                        <option>21</option>
                                                        <option>22</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} lg={6}>
                                                <Form.Group className="mb-2 form-group">
                                                    <RxLineHeight/>
                                                    <Form.Select className="form-control">
                                                        <option>0.5</option>
                                                        <option>1</option>
                                                        <option>1.5</option>
                                                        <option selected>Auto</option>
                                                        <option>1.8</option>
                                                        <option>2</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <h6>Paragraph</h6>
                                        <ListGroup horizontal>
                                            <ListGroup.Item>
                                                <Form.Group className="form-group">
                                                    <CgFontSpacing/>
                                                    <Form.Select className="form-control">
                                                        <option selected>0</option>
                                                        <option>1px</option>
                                                        <option>2px</option>
                                                        <option>3px</option>
                                                        <option>4px</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <LuAlignLeft/>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <LuAlignCenter/>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <LuAlignRight/>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <FaEllipsisV/>
                                            </ListGroup.Item>
                                        </ListGroup>
                                        <h6>Alignment</h6>
                                        <ListGroup horizontal className="align--list--group">
                                            <ListGroup.Item>
                                                <MdAlignHorizontalLeft/>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <MdOutlineAlignHorizontalCenter/>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <MdOutlineAlignHorizontalRight/>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <MdAlignVerticalTop/>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <MdAlignVerticalCenter/>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <MdAlignVerticalBottom/>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <MdOutlineVerticalAlignTop/>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <MdOutlineVerticalAlignCenter/>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <MdVerticalAlignBottom />
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Form>
                                </div>
                            </Tab>
                            <Tab eventKey="shapes" title={<span><FaRegSquare /></span>}>
                                <div className="inner--tabs--pane">
                                    <p>Select each aspect ratio to make slight changes specific to that dimension</p>
                                </div>
                            </Tab>
                            <Tab eventKey="lines" title={<span><RxDividerVertical className="line--tab" /></span>}>
                                <div className="inner--tabs--pane">
                                    <p>Select each aspect ratio to make slight changes specific to that dimension</p>
                                </div>
                            </Tab>
                            <Tab eventKey="arrows" title={<span><ImArrowUpRight2 /></span>}>
                                <div className="inner--tabs--pane">
                                    <p>Select each aspect ratio to make slight changes specific to that dimension</p>
                                </div>
                            </Tab>
                            <Tab eventKey="circles" title={<span><FaRegCircle /></span>}>
                                <div className="inner--tabs--pane">
                                    <p>Select each aspect ratio to make slight changes specific to that dimension</p>
                                </div>
                            </Tab>
                            <Tab eventKey="triangles" title={<span><FiTriangle /></span>}>
                                <div className="inner--tabs--pane">
                                    <p>Select each aspect ratio to make slight changes specific to that dimension</p>
                                </div>
                            </Tab>
                            <Tab eventKey="stars" title={<span><FaRegStar /></span>}>
                                <div className="inner--tabs--pane">
                                    <p>Select each aspect ratio to make slight changes specific to that dimension</p>
                                </div>
                            </Tab>
                        </Tabs>
                    </Tab>
                    <Tab eventKey="music" title={<span><BsSoundwave /> Music</span>}>
                        <Tabs defaultActiveKey="aimusic">
                            <Tab eventKey="aimusic" title="AI Music">
                                <Form>
                                    <Form.Check
                                        label="Hip Hop"
                                        name="musicType"
                                        type='checkbox'
                                        id='hiphop'
                                    />
                                    <Form.Check
                                        label="Beats"
                                        name="musicType"
                                        type='checkbox'
                                        id='Beats'
                                    />
                                    <Form.Check
                                        label="Acoustic"
                                        name="musicType"
                                        type='checkbox'
                                        id='Acoustic'
                                    />
                                    <Form.Check
                                        label="Ambient"
                                        name="musicType"
                                        type='checkbox'
                                        id='Ambient'
                                    />
                                    <Form.Check
                                        label="Lofi"
                                        name="musicType"
                                        type='checkbox'
                                        id='Lofi'
                                    />
                                    <Form.Check
                                        label="R&B"
                                        name="musicType"
                                        type='checkbox'
                                        id='rb'
                                    />
                                    <Form.Check
                                        label="World"
                                        name="musicType"
                                        type='checkbox'
                                        id='World'
                                    />
                                    <Form.Check
                                        label="Orchestra"
                                        name="musicType"
                                        type='checkbox'
                                        id='Orchestra'
                                    />
                                </Form>
                                <ListGroup horizontal>
                                    <ListGroup.Item><strong>001 <small>Track Title</small></strong></ListGroup.Item>
                                    <ListGroup.Item>Dreamy, Euphoric, Happy, Running, Romantic...</ListGroup.Item>
                                    <ListGroup.Item>85 BPM</ListGroup.Item>
                                    <ListGroup.Item>1:32</ListGroup.Item>
                                    <ListGroup.Item><span className="play--icon"><FaPlay /></span></ListGroup.Item>
                                </ListGroup>
                                <ListGroup horizontal>
                                    <ListGroup.Item><strong>002 <small>Track Title</small></strong></ListGroup.Item>
                                    <ListGroup.Item>Dreamy, Euphoric, Happy, Running, Romantic...</ListGroup.Item>
                                    <ListGroup.Item>85 BPM</ListGroup.Item>
                                    <ListGroup.Item>1:32</ListGroup.Item>
                                    <ListGroup.Item><span className="play--icon"><FaPlay /></span></ListGroup.Item>
                                </ListGroup>
                                <ListGroup horizontal>
                                    <ListGroup.Item><strong>003 <small>Track Title</small></strong></ListGroup.Item>
                                    <ListGroup.Item>Dreamy, Euphoric, Happy, Running, Romantic...</ListGroup.Item>
                                    <ListGroup.Item>85 BPM</ListGroup.Item>
                                    <ListGroup.Item>1:32</ListGroup.Item>
                                    <ListGroup.Item><span className="play--icon"><FaPlay /></span></ListGroup.Item>
                                </ListGroup>
                                <ListGroup horizontal>
                                    <ListGroup.Item><strong>004 <small>Track Title</small></strong></ListGroup.Item>
                                    <ListGroup.Item>Dreamy, Euphoric, Happy, Running, Romantic...</ListGroup.Item>
                                    <ListGroup.Item>85 BPM</ListGroup.Item>
                                    <ListGroup.Item>1:32</ListGroup.Item>
                                    <ListGroup.Item><span className="play--icon"><FaPlay /></span></ListGroup.Item>
                                </ListGroup>
                                <ListGroup horizontal>
                                    <ListGroup.Item><strong>005 <small>Track Title</small></strong></ListGroup.Item>
                                    <ListGroup.Item>Dreamy, Euphoric, Happy, Running, Romantic...</ListGroup.Item>
                                    <ListGroup.Item>85 BPM</ListGroup.Item>
                                    <ListGroup.Item>1:32</ListGroup.Item>
                                    <ListGroup.Item><span className="play--icon"><FaPlay /></span></ListGroup.Item>
                                </ListGroup>
                                <ListGroup horizontal>
                                    <ListGroup.Item><strong>006 <small>Track Title</small></strong></ListGroup.Item>
                                    <ListGroup.Item>Dreamy, Euphoric, Happy, Running, Romantic...</ListGroup.Item>
                                    <ListGroup.Item>85 BPM</ListGroup.Item>
                                    <ListGroup.Item>1:32</ListGroup.Item>
                                    <ListGroup.Item><span className="play--icon"><FaPlay /></span></ListGroup.Item>
                                </ListGroup>
                                <ListGroup horizontal>
                                    <ListGroup.Item><strong>007 <small>Track Title</small></strong></ListGroup.Item>
                                    <ListGroup.Item>Dreamy, Euphoric, Happy, Running, Romantic...</ListGroup.Item>
                                    <ListGroup.Item>85 BPM</ListGroup.Item>
                                    <ListGroup.Item>1:32</ListGroup.Item>
                                    <ListGroup.Item><span className="play--icon"><FaPlay /></span></ListGroup.Item>
                                </ListGroup>
                                <ListGroup horizontal>
                                    <ListGroup.Item><strong>008 <small>Track Title</small></strong></ListGroup.Item>
                                    <ListGroup.Item>Dreamy, Euphoric, Happy, Running, Romantic...</ListGroup.Item>
                                    <ListGroup.Item>85 BPM</ListGroup.Item>
                                    <ListGroup.Item>1:32</ListGroup.Item>
                                    <ListGroup.Item><span className="play--icon"><FaPlay /></span></ListGroup.Item>
                                </ListGroup>
                                <ListGroup horizontal>
                                    <ListGroup.Item><strong>009 <small>Track Title</small></strong></ListGroup.Item>
                                    <ListGroup.Item>Dreamy, Euphoric, Happy, Running, Romantic...</ListGroup.Item>
                                    <ListGroup.Item>85 BPM</ListGroup.Item>
                                    <ListGroup.Item>1:32</ListGroup.Item>
                                    <ListGroup.Item><span className="play--icon"><FaPlay /></span></ListGroup.Item>
                                </ListGroup>
                                <ListGroup horizontal>
                                    <ListGroup.Item><strong>010 <small>Track Title</small></strong></ListGroup.Item>
                                    <ListGroup.Item>Dreamy, Euphoric, Happy, Running, Romantic...</ListGroup.Item>
                                    <ListGroup.Item>85 BPM</ListGroup.Item>
                                    <ListGroup.Item>1:32</ListGroup.Item>
                                    <ListGroup.Item><span className="play--icon"><FaPlay /></span></ListGroup.Item>
                                </ListGroup>
                            </Tab>
                            <Tab eventKey="textspeech" title="Text to Speech" className="speech--tab">
                                <h5 className="mb-2 pl-3 mt-4">Video - English</h5>
                                <ListGroup horizontal>
                                    <ListGroup.Item>
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Select className="form-control">
                                                    <option value="1" selected>Voice</option>
                                                    <option value="2">Tone</option>
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-0">
                                                <Form.Select className="form-control">
                                                    <option value="1" selected>Voice</option>
                                                    <option value="2">Tone</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Form>
                                    </ListGroup.Item>
                                    <ListGroup.Item><span className="play--icon"><FaPlay /></span>Preview</ListGroup.Item>
                                </ListGroup>
                                <h5 className="mb-2 pl-3">Video - Khmer</h5>
                                <ListGroup horizontal>
                                    <ListGroup.Item>
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Select className="form-control">
                                                    <option value="1" selected>Voice</option>
                                                    <option value="2">Tone</option>
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-0">
                                                <Form.Select className="form-control">
                                                    <option value="1" selected>Voice</option>
                                                    <option value="2">Tone</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Form>
                                    </ListGroup.Item>
                                    <ListGroup.Item><span className="play--icon"><FaPlay /></span>Preview</ListGroup.Item>
                                </ListGroup>
                                <h5 className="mb-2 pl-3">Video - Bangla</h5>
                                <ListGroup horizontal>
                                    <ListGroup.Item>
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Select className="form-control">
                                                    <option value="1" selected>Voice</option>
                                                    <option value="2">Tone</option>
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-0">
                                                <Form.Select className="form-control">
                                                    <option value="1" selected>Voice</option>
                                                    <option value="2">Tone</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Form>
                                    </ListGroup.Item>
                                    <ListGroup.Item><span className="play--icon"><FaPlay /></span>Preview</ListGroup.Item>
                                </ListGroup>
                                <h5 className="mb-2 pl-3">Video - Indonesian</h5>
                                <ListGroup horizontal>
                                    <ListGroup.Item>
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Select className="form-control">
                                                    <option value="1" selected>Voice</option>
                                                    <option value="2">Tone</option>
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group className="mb-0">
                                                <Form.Select className="form-control">
                                                    <option value="1" selected>Voice</option>
                                                    <option value="2">Tone</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Form>
                                    </ListGroup.Item>
                                    <ListGroup.Item><span className="play--icon"><FaPlay /></span>Preview</ListGroup.Item>
                                </ListGroup>
                            </Tab>
                            <Tab eventKey="voiceover" title="Upload Voice Over">
                                <Form>
                                    <Form.Group className="form-group">
                                        <Form.Control type="text" placeholder="Search..." />
                                        <FaSearch />
                                    </Form.Group>
                                </Form>
                                <CardGroup>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-03.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-04.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-03.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-02.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-01.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-03.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-04.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-01.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-03.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-04.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-01.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-02.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-04.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-01.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-03.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/Screenshot-04.png" alt="..." />
                                    </Card>
                                    <Card className="mb-0">
                                        <Card.Img variant="top" src="./images/Screenshot-01.png" alt="..." />
                                    </Card>
                                    <Card className="mb-0">
                                        <Card.Img variant="top" src="./images/Screenshot-02.png" alt="..." />
                                    </Card>
                                </CardGroup>
                            </Tab>
                            <Tab eventKey="uploadmusic" title="Upload Music">
                                <Form>
                                    <Form.Group className="form-group">
                                        <Form.Control type="text" placeholder="Search..." />
                                        <FaSearch />
                                    </Form.Group>
                                </Form>
                                <CardGroup>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                </CardGroup>
                            </Tab>
                        </Tabs>
                    </Tab>
                    <Tab eventKey="template" title={<span><BsPencilFill /> Template</span>} className="template--tab">
                        <Tabs defaultActiveKey="Styles" className="justify-content-center">
                            <Tab eventKey="Styles" title="Styles" className="style--tab">
                                <Form className="justify-content-center">
                                    <Form.Check
                                        label="AI Avatar"
                                        name="projectType"
                                        type='checkbox'
                                        id='AI Avatar'
                                    />
                                    <Form.Check
                                        label="AI Video"
                                        name="projectType"
                                        type='checkbox'
                                        id='AI Video'
                                    />
                                    <Form.Check
                                        label="AI Images"
                                        name="projectType"
                                        type='checkbox'
                                        id='AI Images'
                                    />
                                    <Form.Check
                                        label="Art Blog"
                                        name="projectType"
                                        type='checkbox'
                                        id='Art Blog'
                                    />
                                    <Form.Check
                                        label={<p className="mb-0">Animation <small>(Stock)</small></p>}
                                        name="projectType"
                                        type='checkbox'
                                        id='Animation'
                                    />
                                    <Form.Check
                                        label="Typography"
                                        name="projectType"
                                        type='checkbox'
                                        id='Typography'
                                    />
                                    <Form.Check
                                        label={<p className="mb-0">Trending <small>(Beta)</small></p>}
                                        name="projectType"
                                        type='checkbox'
                                        id='Trending'
                                    />
                                </Form>
                                <CardGroup>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                </CardGroup>
                            </Tab>
                            <Tab eventKey="options" title="Other Options">
                                <Form>
                                    <Form.Group className="form-group">
                                        <Form.Control type="text" placeholder="Search..." />
                                        <FaSearch />
                                    </Form.Group>
                                </Form>
                                <CardGroup>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                    <Card>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="..." />
                                    </Card>
                                </CardGroup>
                            </Tab>
                        </Tabs>
                    </Tab>
                    <Tab eventKey="dimensions" className="dimension--tabs" title={<span><BsAspectRatio /> Dimensions</span>}>
                        <Tabs defaultActiveKey="square">
                            <Tab eventKey="square" title={<span><FaRegSquare /> 1:1</span>}>
                                <p>Select each aspect ratio to make slight changes specific to that dimension</p>
                            </Tab>
                            <Tab eventKey="horizontal" title={<span><LuRectangleHorizontal /> 16:9</span>}>
                                <p>Select each aspect ratio to make slight changes specific to that dimension</p>
                            </Tab>
                            <Tab eventKey="vertical" title={<span><TbRectangleVertical /> 3:4</span>}>
                                <p>Select each aspect ratio to make slight changes specific to that dimension</p>
                            </Tab>
                            <Tab eventKey="rect" title={<span><LuRectangleVertical /> 9:16</span>}>
                                <p>Select each aspect ratio to make slight changes specific to that dimension</p>
                            </Tab>
                        </Tabs>
                    </Tab>
                </Tabs>
            </div>
            <div className="content__container new--script--page media--page">
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col sm={12} lg={9}>
                            <div className="scroll--div">
                                <Card>
                                    <Card.Body>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="Confort of Jesus" />
                                        <Card.Title>The Comfort of Jesus</Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Body>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="Confort of Jesus" />
                                        <Card.Title>The Comfort of Jesus</Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Body>
                                        <Card.Img variant="top" src="./images/comfort.png" alt="Confort of Jesus" />
                                        <Card.Title>The Comfort of Jesus</Card.Title>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className={isOpen ? 'media--options media--options--open' : 'media--options'}>
                    <Button variant="light" className={isOpen ? 'media--slide arrow--down' : 'arrow--down'} onClick={handleArrow}><FaChevronDown /></Button>
                    <Card>
                        <Card.Body>
                            <ListGroup>
                                <ListGroupItem><RxText /></ListGroupItem>
                                <ListGroupItem>
                                    <span className="play--icon">
                                        <FaPlay />
                                    </span>
                                </ListGroupItem>
                                <ListGroupItem><FaMicrophone /></ListGroupItem>
                                <ListGroupItem><BsSoundwave /></ListGroupItem>
                            </ListGroup>
                        </Card.Body>
                        <CardImg src="./images/media-play.png" />
                    </Card>
                    <div className="media--seek">
                        <ListGroup horizontal>
                            <ListGroupItem>0:02/0:32</ListGroupItem>
                            <ListGroupItem className="seek--bar">
                                <BiExpandAlt />
                                <p className="seek--inline"></p>
                                <p>100%</p>
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                </div>
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
                                <p className="text-left"><strong>Project styles</strong></p>
                                <p className="text-left">AI Avatar <br />AI Video <br /><strong>AI Images</strong></p>
                                <p className="text-left"><strong>Project languages</strong></p>
                                <ul>
                                    <li><span>Viewing:</span></li>
                                    <li><strong>English</strong><br />Bengali<br /> Hindi</li>
                                </ul>
                                {/* <p className="text-left"><strong>Project name</strong></p>
                                <p className="text-left">Comfort Of Jesus</p> */}
                                <p className="text-left m-0">Current video length</p>
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

export default CreateVideoStep;
