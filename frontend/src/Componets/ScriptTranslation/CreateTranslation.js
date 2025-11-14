import React, { useState, useEffect } from "react";
import { Col, Container, Row, ListGroup, Button, Navbar, Nav, ButtonGroup, Dropdown, Modal, Form, Spinner, CardGroup, Card} from "react-bootstrap";
import SidebarPanel from "../Sidebar/Sidebar";
import { FaRegClock } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './translationStyle.css';
import '../../App.css';
import toast, { Toaster } from 'react-hot-toast';
import { display_script_func, script_save_func } from "~/store/slices/project/action";

function ScriptTranslationStep() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [allowbtn, setallowbtn] = useState(false);
    const [allowCard, setallowCard]= useState(false);
    const [theme_script_search, set_theme_script_search]= useState([]);
    const [get_script_index, set_script_index]= useState(1);
    const [projectID, setprojectID] = useState(""); 
    const [projectName, setprojectName] = useState("");
    const [ServerStep, setServerStep] = useState(1);
    //const [projectScript, setprojectScript] = useState("");

     // States for modal and editing
    const [showModal, setShowModal] = useState(false);
    const [editSentence, setEditSentence] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    
    const [scriptType, setscriptType] = useState("");
    const [projectScript, setprojectScript] = useState({
        script_type: '',
        script_content: '',
        sentence_ar: []
    });

    const { data, api_status, isAuthenticated } = useSelector((state: any) => state.project);
    
    const handleClick = event => {
        setIsActive(current => !current);
    };

    const handleEdit = (sentence, index) => {
        setEditSentence(sentence);  // Set the current sentence to edit
        setEditIndex(index);        // Set the index of the sentence being edited
        setShowModal(true);         // Open the modal
    };
    
    const handleDelete = (index) => {
        const updatedScript = { ...projectScript };
        const sentences = [...updatedScript.sentence_ar];  // Clone sentence_ar to avoid mutating state directly
        sentences.splice(index, 1);  // Remove the sentence at the index
    
        setprojectScript({ ...updatedScript, sentence_ar: sentences });  // Update the state with the new content
    };

    const handleSaveEdit = () => {
        const updatedScript = { ...projectScript };
        // Create a new array from the existing sentences to avoid mutating the original
        const sentences = [...updatedScript.sentence_ar]; // Copy the sentence_ar array
    
        // Modify the sentence at the specific index
        sentences[editIndex] = editSentence.trim();
    
        // Set the updated array back to the projectScript state
        setprojectScript({ ...updatedScript, sentence_ar: sentences });
    
        // Close the modal
        setShowModal(false);
    };

    // Save all sentences and content upon submission
    const saveScript = () => {
        let script_content = "";
        let user_selections= "";
        if(projectScript.script_type=="generative_script"){
            script_content= projectScript.sentence_ar.join('\n ') + '\n';

            user_selections= {
                "script_keywords": theme_script_search.script_keywords,
                "theme": theme_script_search.theme,
                "subtheme": theme_script_search.subtheme,
                "active_index": theme_script_search.active_index,
            };
        } else if(projectScript.script_type=="input_script"){
            script_content= projectScript.sentence_ar.join('\n\n ') + '\n\n';

            user_selections= {
                "script_url": theme_script_search
            };
            
        } else if(projectScript.script_type=="library_script") {
            const normalizedSentences = projectScript.sentence_ar.map((sentence) => {
                // Remove trailing dots and add exactly one dot
                return sentence.trim().replace(/\.*$/, '.') // Remove all trailing dots and replace with a single dot
            });
            
            script_content = normalizedSentences.join(' ');

            user_selections= {
                "theme_script_search": {
                    "title": theme_script_search.title,
                    "theme_lib": theme_script_search.theme_lib,
                    "subtheme_lib": theme_script_search.subtheme_lib,
                    "lang_lib": theme_script_search.lang_lib,
                    "keywords": theme_script_search.keywords,
                    "filter": true,
                    "page": 1,
                    "limit": 12
                },
                "script_index": get_script_index
            };
        }
        const prj_sts = import.meta.env.VITE_STATUS_STEP_3;
        

        
        const script_save = {
            project_script: {
                script_type: projectScript.script_type,
                script_content: script_content,   // Join into a single string
                sentence_ar: projectScript.sentence_ar, // Array of sentences
                ...user_selections,
                "accept": allowbtn
            },
            project_id: projectID,
            "steps": 3,
            project_status: prj_sts

        };


        //console.log(script_save);
        
        dispatch(script_save_func(script_save)); // Dispatch save action
    };


    const acceptScript = () => {
        setallowbtn(true);
        const timer = setTimeout(() => {
            
            setallowCard(true);
        }, 500); // 2-second delay
        return () => clearTimeout(timer);
    }


    const rejectScript = () => {
        setallowbtn(false);
    }


    useEffect(() => {
        const fetchData = async () => {
            const queryParams = new URLSearchParams(location.search);
            const projectId = queryParams.get('project_id');
            setprojectID(projectId);
            if (projectId) {
                let data = { "project_id": projectId };
                await dispatch(display_script_func(data));
            }
        };
    
        fetchData(); // Call the async function
    }, [location.search]);


    useEffect(() => {
        if (api_status === 209 && isAuthenticated) {
            console.log(data.project_script[0]['script_type']);
        
            setprojectScript(data.project_script[0]);
            setscriptType(data.project_script[0]['script_type']);
            setServerStep(data.steps);
            setallowbtn(data.project_script[0]['accept']);
            setallowCard(data.project_script[0]['accept']);
            setprojectName(data.project_name);

            if(data.project_script[0]['script_type']=="input_script"){
                set_theme_script_search(data.project_script[0].script_url);
            } else if (data.project_script[0]['script_type']=="generative_script"){
                let script_ar= {
                    "script_keywords": data.project_script[0].script_keywords,
                    "theme": data.project_script[0].theme,
                    "subtheme": data.project_script[0].subtheme,
                    "active_index": data.project_script[0].active_index
                };
                set_theme_script_search(script_ar);
            } else {
                let script_ar= {
                    "title": data.project_script[0].theme_script_search.title,
                    "theme_lib": data.project_script[0].theme_script_search.theme_lib,
                    "subtheme_lib": data.project_script[0].theme_script_search.subtheme_lib,
                    "lang_lib": data.project_script[0].theme_script_search.lang_lib,
                    "keywords": data.project_script[0].theme_script_search.keywords
                };
                set_theme_script_search(script_ar);
                set_script_index(data.project_script[0].script_index);
            }
        } else if (api_status === 206 && isAuthenticated) {
            toast.success("Script updated successfully");
            if(isLoading){
                navigate(`/submit-translation?project_id=${projectID}`);
            } else {
                setisLoading(true);
            }
        }
        
    }, [data, api_status, isAuthenticated, projectID, isLoading]);



    const renderScriptContent = (script) => {
        // Only proceed if the script_type is "library_script"
        const paragraphs = script.sentence_ar;
        if(script.sentence_ar){
            // Split the content by dot (.) and filter out any empty strings
            const paragraphs = script.sentence_ar;

            // Return ListGroup with each sentence in a ListGroup.Item
            return (
                
                <ListGroup className="pb-5">
                    
                    {paragraphs.map((sentence, index) => (
                        <ListGroup.Item key={index}>
                            {sentence.trim()}
                            {/* HiDotsVertical with Dropdown for Edit/Delete */}
                            <Dropdown>
                                <Dropdown.Toggle as="span" className="dots-icon">
                                    <HiDotsVertical style={{ cursor: 'pointer' }} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu align="end">
                                    <Dropdown.Item onClick={() => handleEdit(sentence, index)}>Edit</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleDelete(index)}>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            );
        
        } else {
            return <p>No script available or not a library script.</p>;
        }
    };

    return (
        <>
            <SidebarPanel/>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="content__container new--script--page Translation--page">
                <Container fluid>
                    <Row>
                        <Col sm={12}>
                            <h2 className="mb-5">Script Line Breakdown for Translation</h2>
                            {/* Check if projectScript exists, and call renderScriptContent */}
                            {projectScript ? renderScriptContent(projectScript) : <p>Loading script...</p>}
                            {allowbtn && (
                                <>
                                <ButtonGroup className="mt-0 mt-lg-5 d-flex justify-content-between fixed--bottom">
                                    <Button className="rounded" variant="secondary" href={`/create-script?project_id=${projectID}`}>Back</Button>
                                    <Button variant="primary" onClick={saveScript}>Continue</Button>
                                </ButtonGroup>
                                </>
                            )}
                        </Col>
                    </Row>
                </Container>
                
                {!allowCard && (
                    <div className="review_script suggestion--box">
                        <div className="d-md-flex align-items-center">
                            <h5>Social Guidelines Suggestions</h5>
                            <ButtonGroup className="ml-auto">
                                {allowbtn ? (
                                    <></>
                                    // <Button variant="link" size="sm" onClick={rejectScript}>Reject</Button>
                                ) : (
                                    <Button variant="primary" size="sm" onClick={acceptScript}>Accept</Button>
                                )}
                            </ButtonGroup>
                        </div>
                        <CardGroup>
                            {allowbtn ? (
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Thank You</Card.Title>
                                        <Card.Text>“Thank you for confirmation”</Card.Text>
                                    </Card.Body>
                                </Card>
                            ) : (
                                <>
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
                                </>
                            )}
                        </CardGroup>
                    
                    </div>
                )}
            </div>


            {/* Edit Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header>
                    <Modal.Title>Edit Sentence</Modal.Title>
                    <button type="button" onClick={() => setShowModal(false)} className="btn-close" aria-label="Close">&times;</button>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Edit Sentence</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={3} 
                                value={editSentence} 
                                onChange={(e) => setEditSentence(e.target.value)} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Sidebar navigation */}
            <div className={isActive ? 'steps--collaped' : 'steps--sidebar'}>
                <Navbar expand="lg">
                    <Navbar.Toggle aria-controls="steps-navbar-nav" className={isActive ? 'button--Toggle' : 'btn--Click'} onClick={handleClick} />
                    <Navbar.Collapse id="steps-navbar-nav">
                        <Nav>
                            <Nav.Link className={ServerStep >= 1 ? "active" : ""} href={`/create-project?project_id=${projectID}`} disabled={ServerStep < 1}>01.</Nav.Link>
                            <Nav.Link className={ServerStep >= 2 ? "active" : ""} href={`/create-script?project_id=${projectID}`} disabled={ServerStep < 2}>02.</Nav.Link>
                            <Nav.Link className={ServerStep >= 3 ? "current_steps" : ""} href={`/script-translation?project_id=${projectID}`} disabled={ServerStep < 3}>03.</Nav.Link>
                            <Nav.Link className={ServerStep >= 4 ? "active" : ""} href={`/submit-translation?project_id=${projectID}`} disabled={ServerStep < 4}>04.</Nav.Link>
                            <Nav.Link className={ServerStep >= 5 ? "active" : ""} href={`/new-video-editor?project_id=${projectID}`} disabled={ServerStep < 5}>05.</Nav.Link>
                        </Nav>
                        <ListGroup>
                            <ListGroup.Item>
                                <h3>{projectName}</h3>
                                <p></p>
                                <h3>03. Script Line Breakdown</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>Translation Breakdown</ListGroup.Item>
                            <ListGroup.Item>Social Guidelines</ListGroup.Item>
                            {/* <ListGroup.Item action href="/script-review" disabled>Script Review</ListGroup.Item>
                            <ListGroup.Item action href="/review-guidelines" disabled>Script Guideline Review</ListGroup.Item> */}
                            {/* <ListGroup.Item>
                                <p>Estimated video length</p>
                                <p><FaRegClock/>1:02</p> */}
                                {/* <Button variant="info">Save Draft</Button> */}
                            {/* </ListGroup.Item> */}
                            <ListGroup.Item></ListGroup.Item>
                        </ListGroup>
                    </Navbar.Collapse>
                </Navbar>
            </div>

            
        </>
    );
}

export default ScriptTranslationStep;