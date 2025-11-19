import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Col, Container, Row, Form, Button, CardGroup, Modal, Card, Spinner, Tabs, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { project_scripts_func, project_scripts_ai, script_generator_insert, project_theme_all } from "~/store/slices/project/action";
import toast, { Toaster } from 'react-hot-toast';
import { BsArrowRight } from "react-icons/bs";
import ScriptSidebarPanel from "./ScriptSidebar";

function ScriptLibrary() {
    const dispatch = useDispatch();
    const { data, api_status, isAuthenticated } = useSelector((state: any) => state.project);
    
    // State for form data
    const [formData, setFormData] = useState({ title: '', theme: '', subtheme: '',  felt:'', keywords: '', lang: '' });
    
    // State for Modal data
    const [modalData, setModalData] = useState({
        title:'',
        api_data: '',
        theme: '',
        subtheme: '',
        felt: '',
        lang: '',
        keywords: '',
    });
    
    const [filterthemes, setFilterThemes] = useState([]);
    const [spinnerloading, setSpinnerLoading] = useState<boolean>(false);
    const [spinnerbtnloading, setSpinnerbtnLoading] = useState<boolean>(false);
    const [loadFirstTime, setLoadFirstTime] = useState<boolean>(true);
    const [show, setShow] = useState(false); // Modal visibility

    const [subthemes, setSubthemes] = useState([]);

    // Function to close the modal
    


    const themeSubthemeMap = {
        Relationship: [
            "Lonliness", "Darkness", "Failure", "Hurt", "Hardship", "Growth", 
            "Jesus", "Creator", "Choice", "Love", "Response", "Comfort", 
            "Peace", "Gospel", "Strength", "Healing", "Vulnerability", 
            "Faith", "Trust", "Friendship"
        ],
        "Purpose / Meaning": [
            "Failure", "Self focused", "Insecure", "Unplanned Pregnancy", "Marriage", 
            "Rebellion", "Self Hatred", "Addiction", "Denial", "Hope", 
            "Grace", "Confidence", "Freedom", "Compassion", "Destiny", 
            "Prayer", "Purpose", "Growth"
        ],
        Identity: [
            "Fear", "Desperation", "Destiny", "Hope", "Control", 
            "Freedom", "Anxiety", "Homosexuality", "Trust", 
            "Self Image", "Beauty", "Faith"
        ],
        "Suffering / Physical Need": [
            "Unconditional Love", "Restoration", "Brokenness", "Loneliness", "Worthless", 
            "Sadness", "Sexual Abuse", "Rejection", "Money", "Depression", 
            "Anxiety", "Abuse", "Emotional Abuse", "Reliable", "Comfort", 
            "Beauty", "Identity", "Trauma", "Forgiveness", "Relationship", 
            "Acceptance", "Emptiness", "Porn", "Suicide", "Sex Addiction", 
            "Drugs", "Infertility", "Home"
        ],
        "God / Spiritual": [
            "Redemption", "Salvation", "Pain", "Good vs Evil", "Hurt", 
            "Kindness", "Justice", "Grace", "Creation", "Creator", 
            "Sacrifice", "Truth", "Sin", "God", "Jesus", 
            "Suffering", "Prayer", "Love"
        ],
        Death: ["Unknown", "Pain", "Suffering"],
        Peace: ["Grace", "Freedom", "Calm", "Goodwill"],
        Hope: ["Freedom", "Trust", "Love", "Jesus", "Happiness"],
        Love: [
            "Forgiveness", "Mother's Love", "Father's Love", "Friendship", 
            "Family", "Romantic", "General"
        ],
    };

    const options = [
        { value: "de", label: "Deutsch" },
        { value: "en", label: "English" },
        { value: "fr", label: "Français" },
        { value: "it", label: "Italiano" },
        { value: "vi", label: "Vietnamese" },
        { value: "km", label: "Khmer" },
        { value: "th", label: "Thai" },
        { value: "lo", label: "Lao" }
    ];



    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // If theme changes, update subthemes
        if (name === "theme") {
            setSubthemes(themeSubthemeMap[value] || []);
            setFormData((prevData) => ({ ...prevData, subtheme: "" })); // Reset subtheme
        }
    };

    // Handle modal input change
    const handleModalChange = (e) => {
        setModalData({
            ...modalData,
            [e.target.name]: e.target.value,
        });
    };

    const handleClose = () => {
        setShow(false);
        setSpinnerLoading(false);
    };


    
    const handleLangChange = (selectedOptions) => {
        setFormData((prevData) => ({
            ...prevData,
            lang: selectedOptions ? selectedOptions.map((option) => option.value) : [],
        }));
    };
    

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setSpinnerLoading(true);

        // Split the keywords by comma and trim
        const keywordsArray = formData.keywords.split(',').map(keyword => keyword.trim());

        const script_data = {
            title:formData.title,
            filter: true,
            theme: formData.theme,
            subtheme: formData.subtheme,
            felt_need: formData.felt,
            lang: formData.lang,
            keywords: keywordsArray,
        };

        
        dispatch(project_scripts_ai(script_data));
    };

    // Handle modal form submission
    const handleModalSubmit = (e) => {
        e.preventDefault();
        setSpinnerbtnLoading(true);
        // Modify data for submission
        const modifiedData = {
            title: modalData.title,
            content: modalData.api_data,  // Convert textarea back to an array
            theme: modalData.theme,
            subtheme: modalData.subtheme,
            felt_need: modalData.felt,
            lang: modalData.lang,
            keyword: modalData.keywords.split(',').map(keyword => keyword.trim()),  // Split by commas and trim
        };

        //console.log(modifiedData);
        dispatch(script_generator_insert(modifiedData));
    };


    const getLabelsFromValues = (values, options) => {
        // Ensure `values` is an array; if not, default to an empty array
        if (!Array.isArray(values)) {
            return '';
        }
    
        return values
            .map(value => {
                const match = options.find(option => option.value === value);
                return match ? match.label : null; // Return the label if found, otherwise null
            })
            .filter(label => label) // Remove any null values
            .join(', '); // Join the labels with a comma
    };


    // Fetch project scripts initially
    useEffect(() => {
        let data = { filter: false };
        if (loadFirstTime) {
            dispatch(project_theme_all(data));
        }
    }, [dispatch, loadFirstTime]);

    // Update state based on API data response
    useEffect(() => {
        if (data && api_status === 201 && isAuthenticated) {
            setFilterThemes(data);  
        } else if (api_status === 203 && isAuthenticated) {
            toast.success("Script saved successfully.");
            setSpinnerLoading(false);
            setFormData({
                title:"",
                theme: "",
                subtheme: "",
                felt: "",
                keywords: "",
                lang: ""
            });
            dispatch(project_theme_all(data));
            setSpinnerbtnLoading(false);
            handleClose();  // Close the modal after submission
        } else if (api_status === 205 && isAuthenticated) {
            setModalData({
                title: data.title,
                api_data: data.api_data,  // Convert the array back to a string with newlines for the textarea
                theme: data.theme,
                subtheme: data.subtheme,
                felt: data.felt_need,
                keywords: data.keywords.join(', '),  // Convert array to string
                lang: data.lang
            });
            setSpinnerLoading(false);
            setShow(true);  // Open the modal after populating the data
        } 
    }, [data, api_status, isAuthenticated, setSpinnerLoading]);

    

    return (
        <>
            <ScriptSidebarPanel />
            <div className="content__container new--script--page">
                <Toaster position="top-right" reverseOrder={false} />
                <Container fluid>
                    <Row>
                        <Col sm={12}>
                            <h3 className="mb-4">Script Generator</h3>
                            <h4 className="mb-3">Select Script type</h4>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col sm={6} lg={4}>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                placeholder="Title"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6} lg={4}>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>Theme</Form.Label>
                                            <Form.Select
                                                className="form-control"
                                                name="theme"
                                                value={formData.theme}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select Theme</option>
                                                <option value="Relationship">Relationship</option>
                                                <option value="Purpose / Meaning">Purpose / Meaning</option>
                                                <option value="Identity">Identity</option>
                                                <option value="Suffering / Physical Need">Suffering / Physical Need</option>
                                                <option value="God / Spiritual">God / Spiritual</option>
                                                <option value="Death">Death</option>
                                                <option value="Peace">Peace</option>
                                                <option value="Hope">Hope</option>
                                                <option value="Love">Love</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6} lg={4}>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>Subtheme</Form.Label>
                                            <Form.Select
                                                className="form-control"
                                                name="subtheme"
                                                value={formData.subtheme}
                                                onChange={handleInputChange}
                                                disabled={!subthemes.length} // Disable if no subthemes available
                                                required
                                            >
                                                <option value="">Select Subtheme</option>
                                                {subthemes.map((subtheme) => (
                                                    <option key={subtheme} value={subtheme}>
                                                        {subtheme}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6} lg={4}>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>Felt Need</Form.Label>
                                            <Form.Select
                                                className="form-control"
                                                name="felt"
                                                value={formData.felt}
                                                onChange={handleInputChange}
                                            >
                                                <option value="">Select Felt Need</option>
                                                <option value="Lonely">Lonely</option>
                                                <option value="Empty">Empty</option>
                                                <option value="Broken">Broken</option>
                                                <option value="Shame">Shame</option>
                                                <option value="Angry">Angry</option>
                                                <option value="Fear">Fear</option>
                                                <option value="Happy">Happy</option>
                                                <option value="Sad">Sad</option>
                                                <option value="Surprise">Surprise</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={6} lg={4}>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>Keywords (separated by commas)</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="keywords"
                                                value={formData.keywords}
                                                onChange={handleInputChange}
                                                placeholder="Enter keywords (e.g., Love, Peace, Freedom)"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    
                                    <Col sm={6} lg={4}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Language</Form.Label>
                                            <Select
                                                name="lang" // Update name to people_group
                                                options={options}
                                                isMulti
                                                className="form-control"
                                                value={options.filter(option => formData.lang.includes(option.value))} // Set selected values
                                                onChange={handleLangChange}
                                                menuPlacement="auto"
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Group className="text-left mb-3 form-group">
                                            <Button variant="primary" type="submit">
                                                Save Script
                                                {spinnerloading && (
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
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>

                            {/* Modal for Editing API Data */}
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Script Data</Modal.Title>
                                </Modal.Header>
                                <Form onSubmit={handleModalSubmit}>
                                    <Modal.Body>
                                        <Form.Group>
                                            <Form.Label>API Data</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={8}
                                                name="api_data"
                                                value={modalData.api_data}
                                                onChange={handleModalChange}
                                            />
                                        </Form.Group>

                                        {/* Hidden fields for theme, subtheme, keywords */}
                                        <br/>
                                        <Form.Control type="hidden" name="theme" value={modalData.theme} />
                                        <Form.Control type="hidden" name="subtheme" value={modalData.subtheme} />
                                        <Form.Control type="hidden" name="keywords" value={modalData.keywords} />
                                        <Form.Control type="hidden" name="title" value={modalData.title} />
                                        <Form.Control type="hidden" name="felt_need" value={modalData.felt} />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" type="submit">
                                            Save Changes
                                            {spinnerbtnloading && (
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
                                    </Modal.Footer>
                                </Form>
                            </Modal>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default ScriptLibrary;
