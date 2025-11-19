import React, { useState, useEffect } from "react";
import { Col, Container, Row, ListGroup, Button, Navbar, Nav, ButtonGroup, Form, Spinner } from "react-bootstrap";
import { FaRegClock } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import SidebarPanel from "../Sidebar/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './translationStyle.css';
import '../../App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import toast, { Toaster } from 'react-hot-toast';
import { display_script_func, script_save_func, updateScriptLang, video_generating_func } from "~/store/slices/project/action";
import LoadingScreenLoader from "./LoadingScreenLoader";
import { countryOptions, groupOptions, langOptions } from "~/constants/options";


function SubmitTranslation() {
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState(true);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [projectID, setprojectID] = useState("");
    const [projectName, setprojectName] = useState("");
    const [scriptType, setscriptType] = useState("");
    const [languageCode, setlanguageCode] = useState("");
    
    const [projectCountries, setProjectCountries] = useState({});
    const [projectLangs, setProjectLangs] = useState({});
    
    
    const [isVideoLoading, setIsVideoLoading] = useState(false);

    
    const [isBtnLoading, setIsBtnLoading] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const [isFormNext, setIsFormNext] = useState(false);


    const [projectScript, setprojectScript] = useState({
        script_type: '',
        script_content: '',
        sentence_ar: []
    });

    
    

    const [projectScriptLang, setprojectScriptLang] = useState({
        script_type: '',
        script_content: '',
        sentence_ar: []
    });

    const { data, api_status, isAuthenticated } = useSelector((state: any) => state.project);

    const [ServerStep, setServerStep] = useState(1);
    const [isActive, setIsActive] = useState(false);
    const handleClick = event => {
        setIsActive(current => !current);
    };


    // const handleSelectChange = (e) => {
    //     const selectedLanguageCode = e.target.value;
    //     setlanguageCode(selectedLanguageCode);

    //     if(selectedLanguageCode){
    //         const prj_sts = import.meta.env.VITE_STATUS_STEP_4;
    //         const selectedValue = {
    //             "project_id": projectID,
    //             "steps": 4,
    //             "lang_code": e.target.value,
    //             "content": projectScript.sentence_ar,
    //             project_status: prj_sts
    //         };
    //         dispatch(updateScriptLang(selectedValue));
    //         setLoading(true);
    //     }
    // };


    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const projectId = queryParams.get('project_id');
        setprojectID(projectId);

        const fetchData = async (projectId) => {
            if (projectId) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_APP_API_HOST}/apis/v1/user/project/redis-status`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ project_id: projectId }),
                    });
                    const data = await response.json();
                    
                    if (data.status === 200) {
                        console.log("Job Status: ", data.result.job_status);
                        if(data.result.job_status=="failed"){
                            toast.error(`Your Job ID ${data.result.job_id} is failed`);
                        } else if(data.result.job_status=="completed") {
                            setIsFormNext(true);
                            toast.success(`Your Job ID ${data.result.job_id} is successfully generated video`);
                        } else if (data.result.current_job > data.result.job_id){
                            toast.error(`Your Job ID ${data.result.job_id} is failed`);
                        }  else {
                            setIsVideoLoading(true);
                            setIsBtnLoading(true);
                        }
                    } 
                  } catch (error) {
                    console.error("Error fetching status:", error);
                  }
            }
        };

        let apidata = { "project_id": projectId };
        dispatch(display_script_func(apidata));
    
        fetchData(projectId); // Call the async function
    }, [location.search]);

    
    useEffect(() => {
        if (api_status === 209 && isAuthenticated) {
            setprojectScript(data.project_script[0]);
            setscriptType(data.project_script[0]['script_type']);
            setServerStep(data.steps);
            setprojectName(data.project_name);
            setProjectLangs(data.language);

            

            const countryLabels = data.country.map((code) => {
                const match = countryOptions.find((option) => option.value === code);
                return match ? match.label : null; // Handle unmatched codes
            }).filter(Boolean); // Filter out null values for unmatched codes

            setProjectCountries(countryLabels);

            if(data.project_script[0]['translated_ar']) {
                setLoading(false);
                setprojectScriptLang(data.project_script[0]['translated_ar']);
                setlanguageCode(data.project_script[0]['lang_code'])
                setIsFormValid(true);
            }
            setTimeout(() => {
                if(!data.project_script[0]['lang_code']){
                    const prj_sts = import.meta.env.VITE_STATUS_STEP_4;
                    const selectedValue = {
                        "project_id": data._id,
                        "steps": 4,
                        "lang_code": data.language[0],
                        "content": data.project_script[0].sentence_ar,
                        project_status: prj_sts
                    };
                    dispatch(updateScriptLang(selectedValue));
                    setLoading(true);
                }
            }, 1000);

        } else if (api_status === 205 && isAuthenticated) {
            // Ensure data is in proper array format
            setLoading(false);
            setprojectScriptLang(data);
            setIsFormValid(true);
            //setLoading(false);
        } else if (api_status === 207 && isAuthenticated) {
            //setIsVideoLoading(false);
            //setIsBtnLoading(false);
            //const timer = setTimeout(() => {
                //navigate(`/new-video-editor?project_id=${projectID}`);
            //}, 1000);
        } else if (api_status === 401) {
            // setLoading(false);
            // setIsBtnLoading(false);
            const empty_ar=[];
            setprojectScriptLang(empty_ar);
            toast.error(data.message);
        } else  if (api_status === 420){   //For Showing Errors
            // setIsVideoLoading(false);
            // setIsBtnLoading(false);
            toast.error(data.message);
        }
        
    }, [data, api_status, isAuthenticated, projectID]);

    const prj_sts = [];


    const generateVideo = () => {
        if(projectID){
            setIsBtnLoading(true);
            setIsVideoLoading(true);
            const data= {
                "project_id": projectID,
                "lang_code": languageCode,
                "countries": projectCountries,
                "project_status": prj_sts
            }
            dispatch(video_generating_func(data));
        } else {
            toast.error("Failed to generate video, Please try again later");
        }
        //navigate(`/new-video-editor?project_id=${projectID}`);
    }


    const renderScriptContent = (script) => {
        // Only proceed if the script_type is "library_script"
        const paragraphs = script.sentence_ar;
        if(script.sentence_ar){
            // Split the content by dot (.) and filter out any empty strings
            const paragraphs = script.sentence_ar;

            // Return ListGroup with each sentence in a ListGroup.Item
            return (
                
                <ListGroup className="list--size">
                    {paragraphs.map((sentence, index) => (
                        <ListGroup.Item key={index}>
                            {sentence.trim()}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            );
        
        } else {
            return <p>No script available or not a library script.</p>;
        }
    };

    const renderConvertScriptContent = () => {
        if (loading) {
            return (
                <div className="text-center">
                    <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>
                </div>
            );
        }
        // Check if there is any content in the translated script
        if (projectScriptLang && projectScriptLang.length > 0) {
            return (
                <ListGroup className="list--size">
                    {projectScriptLang.map((sentence, index) => (
                        <ListGroup.Item key={index}>
                            {sentence.trim()} {/* Render each translated sentence */}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            );
        } else {
            return <p>No script available or not a valid translation.</p>;
        }
    };


    const handlePollingComplete = (status) => {
        console.log(status);
        console.log(loadingMessage);
        if(status=="video_generate" && loadingMessage){
            console.log("Event Fired");
            setIsVideoLoading(false);
            setIsBtnLoading(false);
            setLoadingMessage(false);
            toast.success("Video is generated successfully");
            const queryParams = new URLSearchParams(location.search);
            const projectId = queryParams.get('project_id');
            setTimeout(() => {
                navigate(`/new-video-editor?project_id=${projectId}`);
            }, 1000);
        } else if(status=="failed"){
            setIsVideoLoading(false);
            setIsBtnLoading(false);
            toast.error("Failed to generate video");
        }
    };

    const getLangLabel = (langCode) => {
        const langObj = langOptions.find(lang => lang.value === langCode);
        return langObj ? langObj.label : langCode; // Return label if found, else return code
    };

    return (
        <>
            {isVideoLoading && (
                <LoadingScreenLoader
                projectId={projectID}
                apiEndpoint={`${import.meta.env.VITE_APP_API_HOST}/apis/v1/user/project/project-status`}
                onPollingComplete={handlePollingComplete} // Pass the callback
                />
            )}

            <SidebarPanel/>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="content__container new--script--page Translation--page">
                <Container fluid>
                    <Row>
                        <Col sm={12} lg={5}>
                            <h4 className="mb-3">English</h4>
                            {projectScript ? renderScriptContent(projectScript) : <p>Loading script...</p>}
                            
                        </Col>
                        <Col sm={12} lg={2} className="text-center d-flex align-items-center">
                            <span className="translate__arrow"><FaChevronRight /></span>
                        </Col>
                        <Col sm={12} lg={5}>
                            <h4 className="mb-3">
                                {typeof projectLangs === "object" && !Array.isArray(projectLangs)
                                    ? "Invalid data" // Handle object case
                                    : Array.isArray(projectLangs)
                                    ? projectLangs.map(lang => getLangLabel(lang)).join(", ")
                                    : getLangLabel(projectLangs)}
                            </h4>

                            {/* <Form.Select className="form-control mb-3" onChange={handleSelectChange} value={languageCode}>
                                <option value="">Select Language</option>
                                
                                {langOptions
                                    .filter((language) => Array.isArray(projectLangs) && projectLangs.includes(language.value)) // Ensure projectLangs is an array
                                    .map((language) => (
                                    <option key={language.value} value={language.value}>
                                        {language.label}
                                    </option>
                                    ))}
                            </Form.Select> */}

                            <ListGroup className="list--size">
                                {projectScript ? renderConvertScriptContent(projectScript) : <p>Loading script...</p>}
                            </ListGroup>
                        </Col>
                        <Col sm={12} className="fixed--bottom mt-3">
                            
                            <ButtonGroup className="d-flex justify-content-between">
                                {/* <Button variant="primary mr-4" disabled={!isFormValid}>Send to translator</Button> */}
                                <Button variant="secondary" className="rounded" onClick={() => navigate(`/script-translation?project_id=${projectID}`)}>Back</Button>
                                <Button 
                                variant="primary" 
                                onClick={generateVideo} 
                                disabled={!isFormValid}
                                >
                                Generate Video
                                {isBtnLoading && (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="ml-2"
                                    >
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                )}

                                </Button>

                                {isFormNext && (
                                    <Button variant="primary mr-4 ml-4" href={`/new-video-editor?project_id=${projectID}`} disabled={!isFormValid}>Video Editor</Button>
                                )}
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={isActive ? 'steps--collaped' : 'steps--sidebar'}>
                <Navbar expand="lg">
                    <Navbar.Toggle aria-controls="steps-navbar-nav" className={isActive ? 'button--Toggle' : 'btn--Click'} onClick={handleClick} />
                    <Navbar.Collapse id="steps-navbar-nav">
                        
                        <Nav>
                            <Nav.Link className={ServerStep >= 1 ? "active" : ""} href={projectID ? `/create-project?project_id=${projectID}` : "/create-project"} disabled={ServerStep < 1}>01.</Nav.Link>
                            <Nav.Link className={ServerStep >= 2 ? "active" : ""} href={projectID ? `/create-script?project_id=${projectID}` : "/create-script"} disabled={ServerStep < 2}>02.</Nav.Link>
                            <Nav.Link className={ServerStep >= 3 ? "active" : ""} href={projectID ? `/script-translation?project_id=${projectID}` : "/script-translation"} disabled={ServerStep < 3}>03.</Nav.Link>
                            <Nav.Link className="current_steps" href={`/submit-translation?project_id=${projectID}`} disabled={ServerStep <= 4}>04.</Nav.Link>
                            <Nav.Link className={ServerStep >= 5 ? "active" : ""} href={`/new-video-editor?project_id=${projectID}`} disabled={ServerStep < 5}>05.</Nav.Link>
                        </Nav>
                        <ListGroup>
                            <ListGroup.Item>
                                <h3>{projectName}</h3>
                                <p></p>
                                <h4>04. Translations</h4>
                            </ListGroup.Item>
                            <ListGroup.Item>Translation Breakdown</ListGroup.Item>
                            <ListGroup.Item>Social Guidelines</ListGroup.Item>
                            <ListGroup.Item>Script Translation</ListGroup.Item>
                            {/* <ListGroup.Item action href="/script-review">Script Review</ListGroup.Item>
                            <ListGroup.Item action href="/review-guidelines">Script Guideline Review</ListGroup.Item> */}
                            {/* <ListGroup.Item>
                                <p>Estimated video length</p>
                                <p><FaRegClock/>1:02</p>
                                <Button variant="info">Save Draft</Button>
                            </ListGroup.Item> */}
                            <ListGroup.Item></ListGroup.Item>
                        </ListGroup>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </>
    );
}

export default SubmitTranslation;