import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardGroup, Button } from "react-bootstrap";
import { FaPlus } from 'react-icons/fa';
import { FaNetworkWired } from "react-icons/fa";
import { CgTranscript } from "react-icons/cg";
import { GrWorkshop } from "react-icons/gr";
import { TbUsers } from "react-icons/tb";
import 'bootstrap/dist/css/bootstrap.min.css';
import './startStyle.css';
import '../../App.css';
import SidebarPanel from "../Sidebar/Sidebar";
import toast, { Toaster } from "react-hot-toast";
import { isAuthenticatedName } from '../../utils/auth';

function StartPage() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [links, setLinks] = useState({
        File_generator: "",
        Upload_footage_list: "",
        Scripdb_link: "",
        Translation_link: ""
    });

    const [roles, setRoles] = useState<string[]>([]); // Save roles here

    const handleProtectedClick = (e: React.MouseEvent, requiredRole: string, link: string) => {
        if (!(roles.includes(requiredRole) || roles.includes("admin"))) {
            e.preventDefault();
            toast.error("You do not have permission to access this app.");
        }
    };

    useEffect(() => {
        if (isAuthenticatedName()) {
            const userData = localStorage.getItem('user');
            const userToken = localStorage.getItem('accessToken');
            const user = userData ? JSON.parse(userData) : null;
            const username = user ? user.data : null;

            const userRoles = user?.role || [];
            setRoles(userRoles)

            const isAdmin = userRoles.includes("admin");

            console.log(userRoles);
            setLinks({
                File_generator: isAdmin || userRoles.includes(import.meta.env.VITE_FILENAME)
                    ? `${import.meta.env.VITE_FILENAME_GENERATOR_LINK}?token=${userToken}`
                    : "",

                Upload_footage_list: isAdmin || userRoles.includes(import.meta.env.VITE_UPLOAD)
                    ? `${import.meta.env.VITE_BULKUPLOAD_LINK}?token=${userToken}`
                    : "",

                Scripdb_link: isAdmin || userRoles.includes(import.meta.env.VITE_SCRIPT)
                    ? `${import.meta.env.VITE_SCRIPTDB_LINK}?token=${userToken}`
                    : "",

                Translation_link: isAdmin || userRoles.includes(import.meta.env.VITE_TRANSLATOR)
                    ? `${import.meta.env.VITE_TRANSLATOR_LINK}?token=${userToken}`
                    : ""
            });
        }
    }, []);

    return (
        <>
            
            <SidebarPanel/>
            <div className="content__container main--page">
                <Toaster position="top-right" reverseOrder={false} />
                <Container fluid>
                    <Row>
                        <Col sm={12} className="mb-4">
                            <h2>Create project</h2>
                        </Col>
                        <Col sm={12}>
                            <CardGroup>
                                <Card>
                                    <Card.Link href="/create-project">
                                        <span><FaPlus/></span>
                                    </Card.Link>
                                    <Card.Body>
                                        <Card.Title>
                                            <Card.Link href="/create-project">Custom Project</Card.Link>
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                                
                                <Card>
                                    <Card.Link href="/create-project?ratio=16:9"><span><Card.Img variant="top" src="../images/facebook.png" /></span></Card.Link>
                                    <Card.Body>
                                        <Card.Title>
                                            <Card.Link href="/create-project?ratio=16:9">Facebook</Card.Link>
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Link href="/create-project?ratio=9:16"><span><Card.Img variant="top" src="../images/insta.png" /></span></Card.Link>
                                    <Card.Body>
                                        <Card.Title>
                                            <Card.Link href="/create-project?ratio=9:16">Instagram</Card.Link>
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Link href="/create-project?ratio=16:9"><span><Card.Img variant="top" src="../images/youtube-ads.png" /></span></Card.Link>
                                    <Card.Body>
                                        <Card.Title>
                                            <Card.Link href="/create-project?ratio=16:9">Youtube 16:9</Card.Link>
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Link href="/create-project?ratio=9:16"><span><Card.Img variant="top" src="../images/tiktok.png" /></span></Card.Link>
                                    <Card.Body>
                                        <Card.Title>
                                            <Card.Link href="/create-project?ratio=9:16">TikTok 9:16</Card.Link>
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                                
                                   
                            </CardGroup>
                        </Col>
                        {/* <Col sm={12} className="mt-4">
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
                        </Col> */}
                        <Col sm={12} className="mb-2 mt-5">
                            <h2>Quick Start</h2>
                        </Col>
                        <Col sm={12}>
                            <div className="four_cols card-group">
                                <Card className="bg_dark_teal">
                                    <Card.Body>
                                        <Card.Title>Upload Footage</Card.Title>
                                        <Card.Text>Need an Idea for a script? Start here to spark creativity.</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button
                                            variant="light"
                                            target="_blank"
                                            href={links.Upload_footage_list}
                                            onClick={(e) => handleProtectedClick(e, import.meta.env.VITE_UPLOAD, links.Upload_footage_list)}
                                            >
                                            Get Started
                                        </Button>
                                    </Card.Footer>
                                </Card>
                                <Card className="bg_light_teal">
                                    <Card.Body>
                                        <Card.Title>Script Generator</Card.Title>
                                        <Card.Text>Quickly write a script now.</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                    <Button
                                        variant="light"
                                        target="_blank"
                                        href={links.Scripdb_link}
                                        onClick={(e) => handleProtectedClick(e, import.meta.env.VITE_SCRIPT, links.Scripdb_link)}
                                        >
                                        Get Started
                                    </Button>
                                    
                                    </Card.Footer>
                                </Card>
                                <Card className="bg_extra_teal">
                                    <Card.Body>
                                        <Card.Title>Filename Generator</Card.Title>
                                        <Card.Text>Try out a script from another audience and test the topic for your region.</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                    <Button
                                        variant="light"
                                        target="_blank"
                                        href={links.File_generator}
                                        onClick={(e) => handleProtectedClick(e, import.meta.env.VITE_FILENAME, links.File_generator)}
                                        >
                                        Get Started
                                    </Button>
                                    </Card.Footer>
                                </Card>
                                <Card className="bg_teal">
                                    <Card.Body>
                                        <Card.Title>Translations</Card.Title>
                                        <Card.Text>Quickly Test a theory or prove / disprove an assumpution.</Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                    <Button
                                        variant="light"
                                        target="_blank"
                                        href={links.Translation_link}
                                        onClick={(e) => handleProtectedClick(e, import.meta.env.VITE_TRANSLATOR, links.Translation_link)}
                                        >
                                        Get Started
                                    </Button>
                                    
                                    </Card.Footer>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default StartPage;