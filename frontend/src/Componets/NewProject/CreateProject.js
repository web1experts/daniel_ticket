import React, { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { Col, Container, Row, Form, ListGroup, Button, Navbar, Nav, Spinner } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './createNewStyle.css';
import '../../App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import SidebarPanel from "../Sidebar/Sidebar";
import { createProject, display_script_func } from "~/store/slices/project/action";
import toast, { Toaster } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { isAuthenticated } from '../../utils/auth';
import { notValid } from "../../utils/validations"; // Corrected double quotes

import { countryOptions, groupOptions, langOptions } from "~/constants/options";

function NewProjectStep() {
    const location = useLocation();
    const formRef = useRef(null);
    const loggedIn = isAuthenticated();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const [gender, setGender] = useState("");
    const [loggedinUser, setloggedinUser] = useState("");
    const [projectData, setprojectData] = useState({});
    const [projectID, setprojectID] = useState("");
    const [loading, setLoading] = useState(false);
    const [ServerStep, setServerStep] = useState();
    const [isFormValid, setIsFormValid] = useState(false); // State to manage form validity
    const result = useAppSelector((state) => state.project);
    const [isUserGroupSelected, setIsUserGroupSelected] = useState(false); 


    const [projectFormField, setprojectFormField] = useState({
        user_id: "",
        project_name: "",
        project_type: "",
        visual_style: [],
        people_group: [],
        country: [], // Default country
        language: '', // Default language
        ratio: '', // Default aspect ratio
    });

    const handleClick = event => {
        setIsActive(current => !current);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        setprojectFormField((prevData) => {
            let newState;
    
            if (type === "checkbox") {
                let updatedVisualStyle = [...prevData.visual_style];
                if (checked) {
                    if (updatedVisualStyle.length >= 1) {
                        toast.error("You can select a maximum of 1 style only.");
                        e.target.checked = false;
                        return prevData;
                    }
                    updatedVisualStyle.push(value);
                } else {
                    updatedVisualStyle = updatedVisualStyle.filter(item => item !== value);
                }
                newState = { ...prevData, visual_style: updatedVisualStyle };
            } else {
                newState = { ...prevData, [name]: value === "" ? null : value }; // ✅ Set `null` if empty
            }
    
            // ✅ Ensure `project_id` is retained
            const hiddenProjectIDField = document.querySelector("input[name='project_id']");
            if (hiddenProjectIDField && hiddenProjectIDField.value) {
                newState = { ...newState, project_id: hiddenProjectIDField.value };
            }
    
            // ✅ Reset gender if "AI Avatar" is not selected
            if (!newState.visual_style.includes("AI Avatar")) {
                setGender("");  // Ensure gender is reset if AI Avatar is deselected
                //setIsUserGroupSelected(true);
            }
    
            setprojectData(newState);
    
            // ✅ Check if people_group or country should be validated
            const isLocationValid = isUserGroupSelected
                ? newState.people_group.length > 0  // If User Group is selected, check this
                : newState.country.length > 0;  // Otherwise, check country
    
            // ✅ Final form validation check
            let isValidForm =
                newState.project_name &&
                newState.project_type &&
                newState.visual_style.length > 0 &&
                newState.visual_style.length <= 3 &&
                isLocationValid && // Ensure correct field is selected
                newState.language.length > 0;
    
            // ✅ If "AI Avatar" is selected, gender is required
            if (newState.visual_style.includes("AI Avatar") && !gender) {
                isValidForm = false;
            }
    
            setIsFormValid(isValidForm);
            return newState;
        });
    };
    
    
    const handleCountryChange = (selectedOptions) => {
        console.log("Changed Country");
    
        const selectedCountries = selectedOptions
            ? selectedOptions.map((option) => option.value)
            : [];
    
        setprojectFormField((prevData) => {
            const updatedState = { ...prevData, country: selectedCountries };
    
            // ✅ Re-evaluate form validity
            let isValidForm =
                updatedState.project_name &&
                updatedState.project_type &&
                updatedState.visual_style.length > 0 &&
                updatedState.visual_style.length <= 3 &&
                selectedCountries.length > 0 && // ✅ Ensure at least one country is selected
                updatedState.language.length > 0;
    
            if (updatedState.visual_style.includes("AI Avatar") && !gender) {
                isValidForm = false;
            }
    
            setIsFormValid(isValidForm);
            return updatedState;
        });
    };

    const handleGroupChange = (selectedOptions) => {
        const selectedGroups = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    
        setprojectFormField((prevData) => {
            const updatedState = { ...prevData, people_group: selectedGroups };
    
            // ✅ Re-evaluate form validity
            let isValidForm =
                updatedState.project_name &&
                updatedState.project_type &&
                updatedState.visual_style.length > 0 &&
                updatedState.visual_style.length <= 3 &&
                selectedGroups.length > 0 && // ✅ Ensure at least one group is selected
                updatedState.language.length > 0;
    
            if (updatedState.visual_style.includes("AI Avatar") && !gender) {
                isValidForm = false;
            }
    
            setIsFormValid(isValidForm);
            return updatedState;
        });
    };
    
    const handleChangeGender = (e) => {
        const selectedGender = e.target.value;
        console.log("Selected Gender:", selectedGender);

        setGender(selectedGender); // Update gender state

        setprojectFormField((prevData) => {
            const updatedState = { ...prevData, gender: selectedGender };

            // ✅ Re-evaluate form validity
            let isValidForm =
                updatedState.project_name &&
                updatedState.project_type &&
                updatedState.visual_style.length > 0 &&
                updatedState.visual_style.length <= 3 &&
                (isUserGroupSelected
                    ? updatedState.people_group.length > 0  // If User Group is selected, check people_group
                    : updatedState.country.length > 0) && // Otherwise, check country
                updatedState.language.length > 0;

            setIsFormValid(isValidForm);
            return updatedState;
        });
        //setIsUserGroupSelected(false);
        //isUserGroupSelected(true);
    };

    


    // const handleLangChange = (selectedOptions) => {
    //     setprojectFormField((prevData) => ({
    //         ...prevData,
    //         language: selectedOptions
    //             ? selectedOptions.map((option) => option.value)
    //             : [],
    //     }));
    // };

    const handleLangChange = (selectedOption) => {
        setprojectFormField((prevData) => ({
            ...prevData,
            language: selectedOption ? [selectedOption.value] : [langOptions[0]?.value],  // ✅ Default to first option if none selected
        }));
    };


    const fetchDetail = async () => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams(location.search);
            const prj_id = queryParams.get('project_id');
    
            if (prj_id) {
                setprojectID(prj_id);
                const data = { "project_id": prj_id };
                await dispatch(display_script_func(data));
            } else if (queryParams.get('ratio')) {
                const newRatio = queryParams.get('ratio') || '16:9'; // Use a default value if null
                setprojectFormField((prevFields) => ({
                    ...prevFields,
                    ratio: newRatio, // Update the ratio field
                }));
            } else {
                setServerStep(1);
            }
        } catch (error) {
            console.error('Error fetching project details:', error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        if (loggedIn) {
            fetchDetail();
        }
    }, [loggedIn]);
    

    useEffect(() => {
        if (loggedIn) {
            const user_id = localStorage.getItem('user_id');
            if (user_id) {
                setloggedinUser(user_id);
                setprojectFormField(prevData => ({
                    ...prevData,
                    user_id: user_id
                }));
            }
        }

        const queryParams = new URLSearchParams(location.search);
        const prj_id = queryParams.get('project_id');
        if (prj_id && result.api_status == 209) {
            const {
                project_name,
                project_type,
                visual_style,
                people_group,
                country,
                language,
                ratio,
                visual_style_type,
                region_type
            } = result.data;
        
            setprojectFormField({
                user_id: loggedinUser || '',
                project_name: project_name || '',
                project_type: project_type || '',
                visual_style: visual_style || [],
                country: country || [],
                people_group: people_group || [],
                language: language || 'en',
                ratio: ratio || '16:9',
            });
            setIsUserGroupSelected(region_type)
        
            // Check if visual_style contains "AI Avatar" and set gender state
            if (visual_style && visual_style.includes('AI Avatar')) {
                setGender(visual_style_type || '');
            } else {
                setGender(''); // Reset gender if "AI Avatar" is not included
            }
            
        
            setServerStep(result.data.steps);
            setIsFormValid(true);
        } else {
            if (loading && result.status !== 'loading') {
                setLoading(false); // Stop loading once the result state is updated
                if (result.isAuthenticated && result.status === "idle") {
                    toast.success(result.data.message);
                    localStorage.setItem('project_id', result.data.project_id);
                    const timer = setTimeout(() => {
                        navigate(`/create-script?project_id=${result.data.project_id}`);
                    }, 1000);
                } else {
                    toast.error(result.error);
                }
            }
        }
    }, [result, loading, loggedIn, setIsFormValid]);


    const handleNavLinkClick = (event) => {
        event.preventDefault(); // Prevent the anchor tag from navigating
        if (isFormValid && formRef.current) {
            formRef.current.requestSubmit(); // Programmatically submit the form
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid) {
            setLoading(true);
            const project_sts = import.meta.env.VITE_STATUS_STEP_1;
            
            // Include the project_id in the formData if it exists
            const formData = {
                ...projectFormField,
                visual_style_type: gender,
                user_id: loggedinUser, // Ensure user_id is included
                project_id: projectID || "", // Include project_id if it exists
                steps: 1,
                project_status: project_sts,
                region_type: isUserGroupSelected
            };
            
            dispatch(createProject(formData)).unwrap();
        }
    };


    return (
        <>
            <SidebarPanel/>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="content__container new--Project--page">
                <Container fluid>
                    <Row>
                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <Col sm={12}>
                                <div className="inner_form" style={{ marginBottom: '40px' }}>
                                    <h2>Project Title</h2>
                                    <Form.Control
                                        type="text"
                                        placeholder="Project Title"
                                        name="project_name"
                                        value={projectFormField.project_name || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Col>
                            <Col sm={12} className="mb-3">
                                <h2>Video Project Type</h2>
                            </Col>

                            <Col sm={12}>
                                <div className="inner_form">
                                    <Form.Check
                                        label={<p className="mb-0">Create Test <small>(3 versions)</small></p>}
                                        name="project_type"
                                        type='radio'
                                        value='test'
                                        id='Create Test'
                                        checked={projectFormField.project_type === 'test'}
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        label="Create Single Video"
                                        name="project_type"
                                        type='radio'
                                        value='singlevideo'
                                        id='Create Single Video'
                                        checked={projectFormField.project_type === 'singlevideo'}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Col>
                            <Col sm={12} className="mb-2 mt-3">
                                <h2>Visual Styles</h2>
                            </Col>
                            <Col sm={12}>
                                <div className="inner_form">
                                    <Form.Check
                                        name="visual_style"
                                        type="checkbox"
                                        value="AI Avatar"
                                        id="AI Avatar"
                                        checked={projectFormField.visual_style.includes("AI Avatar")}
                                        onChange={handleChange}
                                        label={
                                            projectFormField.visual_style.includes("AI Avatar") && gender === "" ? (
                                            <>
                                                <Form.Check
                                                className="custom-check"
                                                label={"Man"}
                                                name="gender"
                                                type="radio"
                                                id={"Man"}
                                                value="man"
                                                onChange={handleChangeGender}
                                                />
                                                <Form.Check
                                                className="custom-check"
                                                label={"Woman"}
                                                name="gender"
                                                type="radio"
                                                id={"Woman"}
                                                value="woman"
                                                onChange={handleChangeGender}
                                                />
                                            </>
                                            ) : (
                                            "AI Avatar"
                                            )
                                        }
                                    />


                                    <Form.Check
                                        label="AI Video"
                                        name="visual_style"
                                        type='checkbox'
                                        value='AI Video'
                                        id='AI Video'
                                        checked={projectFormField.visual_style.includes('AI Video')}
                                        onChange={handleChange}
                                    />
                                    <Form.Check
                                        label="AI Images"
                                        name="visual_style"
                                        type='checkbox'
                                        value='AI Images'
                                        id='AI Images'
                                        checked={projectFormField.visual_style.includes('AI Images')}
                                        onChange={handleChange}
                                    />
                                </div>
                            </Col>
                            <Col sm={12} className="mb-2 mt-3">
                                <h2>Target Region / Language</h2>
                            </Col>
                        
                            <Col sm={12}>
                                <div className="inner_form">
                                    {/* <Form.Group className="w-100 mb-3">
                                        <div className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                id="toggle-switch"
                                                checked={isUserGroupSelected}
                                                onChange={() => {
                                                    const newToggleState = !isUserGroupSelected;
                                                    setIsUserGroupSelected(newToggleState);

                                                    // ✅ Validate the correct field based on toggle state
                                                    setIsFormValid(
                                                        newToggleState
                                                            ? projectFormField.people_group.length > 0 // ✅ If toggled ON, check `people_group`
                                                            : projectFormField.country.length > 0 // ✅ If toggled OFF, check `country`
                                                    );
                                                }}
                                            />
                                            <label htmlFor="toggle-switch">
                                                {isUserGroupSelected ? "User Group" : "Country"}
                                            </label>
                                        </div>
                                    </Form.Group> */}


                                    {/* Conditionally render the appropriate dropdown */}
                                    {isUserGroupSelected ? (
                                        <Form.Group className="form-group">
                                            <Form.Label>User Group</Form.Label>
                                            <Select
                                                name="people_group"
                                                options={groupOptions}
                                                isMulti
                                                className="form-control"
                                                value={groupOptions.filter((option) =>
                                                    projectFormField.people_group.includes(option.value)
                                                )}
                                                onChange={handleGroupChange}
                                                menuPlacement="auto"
                                            />
                                        </Form.Group>
                                    ) : (
                                        <Form.Group className="form-group">
                                            <Form.Label>Country</Form.Label>
                                            <Select
                                                name="country"
                                                options={countryOptions}
                                                isMulti
                                                className="form-control"
                                                value={countryOptions.filter((option) =>
                                                    projectFormField.country.includes(option.value)
                                                )}
                                                onChange={handleCountryChange}
                                                menuPlacement="auto"
                                            />
                                        </Form.Group>
                                    )}




                                    <Form.Group className="form-group">
                                        <Form.Label>Language</Form.Label>
                                        <Select
                                                name="language"
                                                options={langOptions}
                                                className="form-control"
                                                value={langOptions.find((option) => option.value === projectFormField.language[0]) || null}
                                                onChange={handleLangChange} // ✅ Use handleChange directly
                                                menuPlacement="auto"
                                            />


                                        {/* <Select
                                            name="language"
                                            options={langOptions}
                                            // isMulti
                                            className="form-control"
                                            value={langOptions.filter((option) =>
                                                projectFormField.language.includes(option.value)
                                            )}
                                            onChange={handleLangChange}
                                            menuPlacement="auto"
                                        /> */}
                                        {/* <Form.Select name="language" className="form-control" value={projectFormField.language} onChange={handleChange}>
                                            <option value="de">Deutsch</option>
                                            <option value="en" selected>English</option>
                                            <option value="fr">Français</option>
                                            <option value="it">Italiano</option>
                                            <option value="vi">Vietnamese</option>
                                            <option value="km">Khmer</option>
                                            <option value="th">Thai</option>
                                            <option value="lo">Lao</option>
                                        </Form.Select> */}
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label>Aspect Ratio</Form.Label>
                                        <Form.Select name="ratio" className="form-control" value={projectFormField.ratio ?? ""} onChange={handleChange}>
                                            <option value="">Select Ratio</option>
                                            {!projectFormField.visual_style.includes("AI Video") && (
                                                <option value="1:1">1:1</option>
                                            )}
                                            <option value="16:9">16:9</option>
                                            <option value="9:16">9:16</option>
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                            </Col>


                            {/* <Col sm={12} className="mb-2 mt-3">
                                <h2>Project details</h2>
                                <ListGroup horizontal className="project__details">
                                    <ListGroup.Item>
                                        <h3>Styles</h3>
                                        <ul>
                                            <li>AI Avatar</li>
                                            <li>AI Video</li>
                                            <li>AI Images</li>
                                        </ul>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h3>Countries</h3>
                                        <ul>
                                            <li>Vietnam</li>
                                            <li>Cambodia</li>
                                            <li>Thailand</li>
                                            <li>Laos</li>
                                        </ul>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h3>Languages</h3>
                                        <ul>
                                            <li>Vietnamese</li>
                                            <li>Khmer</li>
                                            <li>Thai</li>
                                            <li>Lao</li>
                                        </ul>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <h3>Aspect Ratio</h3>
                                        <ul>
                                            <li>1:1</li>
                                        </ul>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col> */}
                            <Col sm={12} className="mt-3 text-right fixed--bottom">
                                {projectID && (
                                    <Form.Control 
                                        type="hidden" 
                                        name="project_id" 
                                        value={projectID}
                                    />
                                )}
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={!isFormValid}
                                >
                                    Continue

                                    {loading && (
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
                            </Col>
                        </Form>
                    </Row>
                </Container>
            </div>
            <div className={isActive ? 'steps--collaped' : 'steps--sidebar'}>
                <Navbar expand="lg">
                    <Navbar.Toggle aria-controls="steps-navbar-nav" className={isActive ? 'button--Toggle' : 'btn--Click'} onClick={handleClick} />
                    {/* <Navbar.Toggle aria-controls="steps-navbar-nav" /> */}
                    <Navbar.Collapse id="steps-navbar-nav">
                        <Nav>
                            <Nav.Link className={ServerStep >= 1 ? "current_steps" : ""} href={`/create-project?project_id=${projectID}`} disabled={ServerStep < 1}>01.</Nav.Link>
                            <Nav.Link className={ServerStep >= 2 ? "active" : ""} href={`/create-script?project_id=${projectID}`} disabled={ServerStep < 2}>02.</Nav.Link>
                            <Nav.Link className={ServerStep >= 3 ? "active" : ""} href={`/script-translation?project_id=${projectID}`} disabled={ServerStep < 3}>03.</Nav.Link>
                            <Nav.Link className={ServerStep >= 4 ? "active" : ""} href={`/submit-translation?project_id=${projectID}`} disabled={ServerStep < 4}>04.</Nav.Link>
                            <Nav.Link className={ServerStep >= 5 ? "active" : ""} href={`/new-video-editor?project_id=${projectID}`} disabled={ServerStep < 5}>05.</Nav.Link>
                        </Nav>
                        <ListGroup>
                            <ListGroup.Item>
                                <h3>{projectFormField.project_name || projectData.project_name}</h3>
                                <p></p>
                                <h3>01. Create Project</h3>
                            </ListGroup.Item>
                            <ListGroup.Item><strong>Type</strong> <span>{projectFormField.project_type || projectData.project_type}</span></ListGroup.Item>
                            <ListGroup.Item><strong>Style</strong> <span>{projectFormField.visual_style.map((style) => (style === 'AI Avatar' ? `${style} ${gender}` : style)).join(', ')}</span></ListGroup.Item>
                            {isUserGroupSelected ? (
                                <ListGroup.Item><strong>People Group</strong> <span>{projectFormField.people_group.join(', ') || projectData.people_group}</span></ListGroup.Item>
                            ) : (
                                <ListGroup.Item><strong>Country</strong> <span>
                                    {
                                        Array.isArray(projectFormField.country)
                                            ? projectFormField.country
                                                .map((country) => countryOptions.find((option) => option.value === country)?.label || country)
                                                .join(', ')
                                            : countryOptions.find((option) => option.value === projectFormField.country)?.label || projectFormField.country
                                    }
                                        
                                </span></ListGroup.Item>
                            )}
                            
                            
                            
                            <ListGroup.Item><strong>Language</strong> <span>
                                {
                                    Array.isArray(projectFormField.language)
                                        ? projectFormField.language
                                            .map((lang) => langOptions.find((option) => option.value === lang)?.label || lang)
                                            .join(', ')
                                        : langOptions.find((option) => option.value === projectFormField.language)?.label || projectFormField.language
                                }
                            </span></ListGroup.Item>
                            <ListGroup.Item><strong>Aspect Ratio</strong> <span>{projectFormField.ratio || projectData.ratio}</span></ListGroup.Item>
                            <ListGroup.Item>
                                {/* <Button variant="info">Save Draft</Button> */}
                            </ListGroup.Item>
                        </ListGroup>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </>
    );
}
export default NewProjectStep;