import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Col, Container, Row, Form, Button, CardGroup, Card, Spinner, Tabs, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { project_theme_all, script_library_insert, list_keywords_ai } from "~/store/slices/project/action";
import toast, { Toaster } from 'react-hot-toast';
import { BsArrowRight } from "react-icons/bs";
import ScriptSidebarPanel from "./ScriptSidebar";

function ScriptLibrary() {
    const dispatch = useDispatch();
    const { data, api_status, isAuthenticated } = useSelector((state: any) => state.project);
    const [formData, setFormData] = useState({ title:'', theme: '', subtheme: '', felt:'', keywords: [], lang: '' });
    const [csvData, setCsvData] = useState([]);  // State to store split sentences
    const [filterthemes, setFilterThemes] = useState("");
    const [spinnerloading, setSpinnerLoading] = useState<boolean>(false);
    const [progressBar, setprogressBar] = useState<boolean>(false);
    const [uploadfile, setuploadfile] = useState<boolean>(false);
    const [scriptKeywords, setscriptKeywords] = useState([]);

    const [subthemes, setSubthemes] = useState([]);
    const [inputValue, setInputValue] = useState("");



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
        const { name, value, checked } = e.target;  // Destructure the event target
        setFormData({
            ...formData,
            [name]: value,
        });
        if (name === "theme") {
            setSubthemes(themeSubthemeMap[value] || []);
            setFormData((prevData) => ({ ...prevData, subtheme: "" })); // Reset subtheme
        }
    };

    
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
    
        // Define the allowed extensions
        const allowedExtensions = ['pdf', 'rtf', 'srt', 'tsv', 'xlsx', 'xls', 'csv', 'doc', 'txt', 'docx'];
    
        if (file) {
            // Extract the file extension
            const fileExtension = file.name.split('.').pop().toLowerCase();
    
            // Check if the file extension is allowed
            if (!allowedExtensions.includes(fileExtension)) {
                toast.error(`Invalid file type! Only ${allowedExtensions.join(', ')} files are allowed.`);
                return; // Exit the function if the extension is not allowed
            }
    
            // Prepare file data
            setprogressBar(true);
            setuploadfile(true);
            const formData = new FormData();
            formData.append('upload', file);
    
            // Dispatch the action to upload the file
            dispatch(list_keywords_ai(formData));
        }
    };


    const handleLangChange = (selectedOptions) => {
        setFormData((prevData) => ({
            ...prevData,
            lang: selectedOptions ? selectedOptions.map((option) => option.value) : [],
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!scriptKeywords || scriptKeywords.length === 0) {
            toast.error("Please select at least one keyword.");
            setSpinnerLoading(false);
            return;  // Stop the form submission
        }

        setSpinnerLoading(true);
        const keywordsArray = scriptKeywords;

        const script_data = {
            title:formData.title,
            filter: false,
            theme: formData.theme,
            subtheme: formData.subtheme,
            felt_need: formData.felt,
            lang: formData.lang,
            keyword: keywordsArray, // Adding keywords as an array
            content: csvData // Sending the array of sentences in "scripts"
        };
        console.log(script_data);
        dispatch(script_library_insert(script_data));
    };

    const handleDoubleClick = (index) => {
        console.log(index);
        setscriptKeywords((prevKeywords) => 
            prevKeywords.filter((_, i) => i !== index) // Remove the item at the specified index
        );
    };

    const handleAddKeyword = (e) => {
        const { value } = e.target; // Get the input value from the event target
        setInputValue(value); // Update input value state
    };

    const addKeywordToList = () => {
        if (inputValue.trim() !== "") {
            setscriptKeywords((prevKeywords) => [...prevKeywords, inputValue]);
            setInputValue(""); // Clear the input field after adding
        }
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

    


    useEffect(() => {
        dispatch(project_theme_all());
    }, [dispatch]);

    useEffect(() => {
        if (data && data.length > 0 && api_status === 201 && isAuthenticated) {
            setFilterThemes(data);
        } else if (api_status === 203 && isAuthenticated) {
            dispatch(project_theme_all());
            toast.success("Script saved successfully.");
            setuploadfile(false);
            setSpinnerLoading(false);
            setFormData({
                title:"",
                theme: "",
                subtheme: "",
                lang: "",
                keywords: "",
            });
        } else if (data && api_status === 400) {
            setSpinnerLoading(false);
            if(data.message){
                toast.error(data.message);
            }
            dispatch(project_theme_all());
        } else if (api_status === 205 && isAuthenticated) {
            setCsvData(data.content);
            setscriptKeywords(data.keywords);
            setprogressBar(false);
            setuploadfile(true);
        }
    }, [data, api_status, isAuthenticated, setFormData]);

    return (
        <>
            <ScriptSidebarPanel />
            <div className="content__container new--script--page uploaded_script">
                <Toaster position="top-right" reverseOrder={false} />
                <Container fluid>
                    <Row>
                        <Col sm={12}>
                            <h3 className="mb-4">Upload Script</h3>
                            {/* <h5 className="mb-3">Select Script type</h5> */}

                            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                                <Row>
                                    <Col md={12}>
                                        <Form.Group className="mb-3 form-group" style={{
                                            visibility: uploadfile ? 'hidden' : 'visible',  // Control visibility
                                            position: uploadfile ? 'absolute' : 'relative'
                                        }}>
                                            <label className="upload-contain" for="upload-docs">

                                                <svg id="color" viewBox="0 0 24 24"><path d="m14.25 0h-11.5c-1.52 0-2.75 1.23-2.75 2.75v15.5c0 1.52 1.23 2.75 2.75 2.75h6.59c-.54-1.14-.84-2.41-.84-3.75 0-1.15.22-2.25.64-3.26.2-.51.45-1 .74-1.45.65-1.01 1.49-1.87 2.48-2.54.51-.35 1.05-.64 1.63-.86.93-.39 1.95-.61 3.01-.63v-5.76c0-1.52-1.23-2.75-2.75-2.75z" fill="#eceff1"></path><g fill="#90a4ae"><path d="m14 9c0 .05 0 .1-.01.14-.58.22-1.12.51-1.63.86h-8.36c-.55 0-1-.45-1-1s.45-1 1-1h9c.55 0 1 .45 1 1z"></path><path d="m9.88 12.54c-.29.45-.54.94-.74 1.45-.04.01-.09.01-.14.01h-5c-.55 0-1-.45-1-1s.45-1 1-1h5c.38 0 .72.22.88.54z"></path><path d="m8 6h-4c-.552 0-1-.448-1-1s.448-1 1-1h4c.552 0 1 .448 1 1s-.448 1-1 1z"></path></g><path d="m17.25 24c-3.722 0-6.75-3.028-6.75-6.75s3.028-6.75 6.75-6.75 6.75 3.028 6.75 6.75-3.028 6.75-6.75 6.75z" fill="#272727"></path><path d="m17.25 21c-.552 0-1-.448-1-1v-5.5c0-.552.448-1 1-1s1 .448 1 1v5.5c0 .552-.448 1-1 1z" fill="#fff"></path><path d="m20 18.25h-5.5c-.552 0-1-.448-1-1s.448-1 1-1h5.5c.552 0 1 .448 1 1s-.448 1-1 1z" fill="#fff"></path></svg>

                                                <h3>Drag script anywhere to Upload</h3>
                                                <p><small>Supported Format ( pdf | rtf | srt | tsv | xlsx | xls | csv | doc | txt | docx )</small></p>

                                                <Form.Control
                                                    type="file"
                                                    accept=".pdf,.rtf,.srt,.tsv,.xlsx,.xls,.csv,.doc,.txt,.docx"
                                                    onChange={handleFileChange}
                                                    required
                                                    id="upload-docs"
                                                    hidden
                                                />

                                                <span>OR</span>

                                                <p className="mb-0"><span>Click to Upload</span></p>

                                            </label>
                                        </Form.Group>
                                    </Col>
                                    
                                    {progressBar ? (
                                        <Col md={12}>
                                            <div className="custom_progressBar mt-5">
                                                <h3 className="text-center">File Processing...</h3>
                                                <div className="box-container">
                                                    <div className="box"></div>
                                                    <div className="box"></div>
                                                    <div className="box"></div>
                                                    <div className="box"></div>
                                                    <div className="box"></div>
                                                </div>
                                            </div>
                                        </Col>
                                    ) : (
                                        <>

                                        <Col md={6}>
                                            <Form.Group className="mb-3 form-group" style={{
                                                visibility: uploadfile ? 'visible' : 'hidden',  // Control visibility
                                                position: uploadfile ? 'relative' : 'absolute'
                                            }}>
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
                                        
                                        <Col md={6}>
                                            <Form.Group className="mb-3 form-group" style={{
                                                visibility: uploadfile ? 'visible' : 'hidden',  // Control visibility
                                                position: uploadfile ? 'relative' : 'absolute'
                                            }}>
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
                                        
                                        <Col md={6}>
                                            <Form.Group className="mb-3 form-group" style={{
                                                visibility: uploadfile ? 'visible' : 'hidden',  // Control visibility
                                                position: uploadfile ? 'relative' : 'absolute'
                                            }}>
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

                                        <Col md={6}>
                                            <Form.Group className="mb-3 form-group" style={{
                                                visibility: uploadfile ? 'visible' : 'hidden',  // Control visibility
                                                position: uploadfile ? 'relative' : 'absolute'
                                            }}>
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
                                        
                                        <Col md={6}>
                                            <Form.Group className="mb-3 form-group" style={{
                                                visibility: uploadfile ? 'visible' : 'hidden',  // Control visibility
                                                position: uploadfile ? 'relative' : 'absolute'
                                            }}>
                                                <Form.Label>Keywords (separated by commas)</Form.Label>
                                                <div className="form-row mx-0">
                                                    <Form.Control type="text" placeholder="Enter keywords (e.g: Love)" value={inputValue} onChange={handleAddKeyword}/>
                                                    <Button variant="secondary" className="ml-md-3 mt-2 mt-md-0" onClick={addKeywordToList}>Add</Button>
                                                </div>
                                            </Form.Group>   
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group className="mb-3 form-group" style={{
                                                    visibility: uploadfile ? 'visible' : 'hidden',  // Control visibility
                                                    position: uploadfile ? 'relative' : 'absolute'
                                                }}>
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
                                            <Form.Group className="mb-3 form-group" style={{
                                                visibility: uploadfile ? 'visible' : 'hidden',  // Control visibility
                                                position: uploadfile ? 'relative' : 'absolute'
                                            }}>
                                                <div className="generate_script_ai">
                                                    <div className="inner_form">
                                                        {scriptKeywords.map((sentence, index) => (
                                                            <div className="key--tags" key={index} onDoubleClick={() => handleDoubleClick(index)}>
                                                                <Form.Check
                                                                    key={index}
                                                                    label={sentence}
                                                                    name="keywords"
                                                                    type="checkbox"
                                                                    value={sentence}
                                                                    id={sentence}
                                                                    onChange={handleInputChange}
                                                                    checked
                                                                    disabled
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        
                                        <Col md={12}>
                                            <Form.Group className="mb-3 form-group" style={{
                                                visibility: uploadfile ? 'visible' : 'hidden',  // Control visibility
                                                position: uploadfile ? 'relative' : 'absolute'
                                            }}>
                                                <Button variant="primary" type="submit">Submit
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
                                        </>
                                    )}
                                </Row>
                            </Form>
                            
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default ScriptLibrary;