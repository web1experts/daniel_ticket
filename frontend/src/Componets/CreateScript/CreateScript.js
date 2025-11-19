import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import $ from 'jquery'
import { Col, Container, Row, Form, ListGroup, Button, Navbar, Nav, Tabs, Tab, CardGroup, Card, Spinner } from "react-bootstrap";
import { FiArrowRight } from "react-icons/fi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { project_webcontent, project_theme_all, project_theme, project_scripts_func, project_scripts_aieight, script_save_func, display_script_func } from "~/store/slices/project/action";
import { useDispatch, useSelector } from 'react-redux';
import './createScriptStyle.css';
import '../../App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import SidebarPanel from "../Sidebar/Sidebar";
import SearchScriptLibrary from "./ScriptLibraryProject";
import toast, { Toaster } from 'react-hot-toast';
import { parseJSON } from "date-fns";


function CreateScriptStep() {
    const location = useLocation();
    const [isCollapse, setisCollapse] = useState(false);
    const [url, setUrl] = useState(""); 
    const navigate = useNavigate();
    const [isDisabled, setIsDisabled] = useState(true);
    const [themefield, setthemefield] = useState(""); 
    
    const [keywordfield, setkeywordfield] = useState(""); 

    const [scriptkeywordfield, setscriptkeywordfield] = useState(""); 
    const [scriptTitle, setscriptTitle] = useState(""); 

    const [activeTab, setActiveTab] = useState("Input"); // Default tab
    const [inputContent, setInputContent] = useState("");

    const [content, setContent] = useState("");
    const [gencontent, setGenContent] = useState("");
    const [themes, setThemes] = useState("");
    const [scripts, setScripts] = useState("");
    const [filterthemes, setFilterThemes] = useState("");
    const selectRef = useRef<HTMLSelectElement>(null);
    const usersPerPage = 12;
    const [selectedScript, setSelectedScript] = useState('');
    const [theme_library, setThemeLibrary] = useState('');
    const [subtheme_library, setSubthemeLibrary] = useState('');
    const [language, setLanguage] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    const [subthemes, setSubthemes] = useState([]);
    const [subthemefield, setsubthemefield] = useState(""); 
    const [activeClass, setactiveClass] = useState(""); 
    

    const [isActive, setIsActive] = useState(false);
    const [uniqueSubthemes, setUniqueSubthemes] = useState<string[]>([]);

    const [activeScriptIndex, setActiveScriptIndex] = useState(null);
    
    const dispatch = useDispatch();

    const { data, api_status, isAuthenticated } = useSelector((state: any) => state.project);
    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [spinnerloading, setSpinnerLoading] = useState<boolean>(false);
    const [spinnerGenerativeScript, setGenerativeScript] = useState<boolean>(false);
    const [spinnerThemScript, setspinnerThemScript] = useState<boolean>(false);
    const [activeCardText, setActiveCardText] = useState('');

    const [projectID, setprojectID] = useState("");
    const [projectName, setprojectName] = useState("");

    const [ServerStep, setServerStep] = useState(1);

    // const handleClick = event => {
    //     setIsActive(current => !current);
    // };

    const handleClickSidebar = event => {
        setisCollapse(current => !current);
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value); 
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.trim() === "") {
            setIsFormValid(false); 
        } else {
            setIsFormValid(true); 
        }
    
        setContent(e.target.value);
    };


    const handleGenContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedScript(e.target.value); 
    };

    const [SearchData, setSearchData] = useState({ 
        script_id:'', 
        title:'',
        theme: '', 
        subtheme: '',
        content: '', 
        felt: '',
        lang: '',
        keywords: [] 
    });



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

    const langs = [
        { value: "de", label: "Deutsch" },
        { value: "en", label: "English" },
        { value: "fr", label: "Français" },
        { value: "it", label: "Italiano" },
        { value: "vi", label: "Vietnamese" },
        { value: "km", label: "Khmer" },
        { value: "th", label: "Thai" },
        { value: "lo", label: "Lao" }
    ];

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
        // Update subthemes based on selected theme
        if (themefield && themeSubthemeMap[themefield]) {
            setSubthemes(themeSubthemeMap[themefield]);
            setsubthemefield(""); // Reset subtheme when theme changes
        } else {
            setSubthemes([]);
        }
    }, [themefield]);

    //Generative Script Fields
    const handlekeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setkeywordfield(e.target.value); // Update the URL state as the user types
    };

    const handlesubthemefieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setsubthemefield(e.target.value); // Update the URL state as the user types
    };

    const handlethemefieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setthemefield(e.target.value); // Update the URL state as the user types
    };
    //End Generative Script Fields
    

    const handleClick = async () => {
        if(url){
            setGenerativeScript(true);
            setError(null); // Reset error state
            dispatch(project_webcontent({ targetUrl: url }));
        } else {
            toast.error("Please enter a valid URL");
        }
    };


    // const handleSearchInput = (e) => {
    //     const { name, value } = e.target;
    
    //     setSearchData((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    
    //     // Update subthemes when theme changes
    //     if (name === "theme") {
    //         const newSubthemes = themeSubthemeMap[value] || [];
    //         setSubthemes(newSubthemes);
    
    //         // Reset subtheme in formData
    //         setSearchData((prevData) => ({ 
    //             ...prevData, 
    //             subtheme: newSubthemes.length > 0 ? newSubthemes[0] : "" 
    //         }));
    //     }
    // };

    // const handleLangChange = (selectedOptions) => {
    //     setSearchData((prevData) => ({
    //         ...prevData,
    //         lang: selectedOptions ? selectedOptions.map((option) => option.value) : [],
    //     }));
    // };

    // const fetchThemeData = async (page = 1) => {
    //     setspinnerThemScript(true);
    //     let filter = !!(scriptTitle || themefield || subthemefield || language || scriptkeywordfield);

    //     let data = { 
    //         "page": page, 
    //         "limit": usersPerPage, 
    //         "filter": filter,
    //         "title": scriptTitle,
    //         "theme_lib": themefield, 
    //         "subtheme_lib": subthemefield, 
    //         "lang_lib": language,
    //         "keywords": scriptkeywordfield 
    //     };
        
    //     dispatch(project_theme(data));
    // };


    const fetchScriptData = async () => {
        setLoading(true);
        let data = { "filter": false };
        await dispatch(project_scripts_func(data));
        setLoading(false);
    };


    // const submit_library = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     // let data = { 
    //     //     "page": 1, 
    //     //     "limit": usersPerPage, 
    //     //     "filter": true, 
    //     //     "title": scriptTitle,
    //     //     "theme_lib": themefield, 
    //     //     "subtheme_lib": subthemefield, 
    //     //     "lang_lib": language,
    //     //     "keywords": scriptkeywordfield 
    //     // };

    //     // setspinnerThemScript(true);
    //     // await dispatch(project_theme(data));
    //     fetchThemeData();
    // };


    //Generative Script Submit Button
    const submit_generativescript = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!themefield || !subthemefield) {
            toast.error("Theme and Subtheme are required. Please select them before proceeding.");
            return; // Stop execution if validation fails
        }

        setGenerativeScript(true);
        // Simulate an async operation or API call
        let data = { "filter": true, "theme_scr": themefield, "subtheme_scr": subthemefield, "keywords_scr": keywordfield, "project_id": projectID };
        setLoading(true);
        await dispatch(project_scripts_aieight(data));
    };
    //End Generative Script Submit Button

    const handleUseScript = (content: string, index: number) => {
        const formattedContent = content.split('.').map((sentence, index) => (
            sentence.trim() ? `${index + 1}. ${sentence.trim()}.` : ""
        )).join('\n').trimEnd();
        
        setactiveClass(index);

        setSelectedScript(formattedContent); // Set the combined content into the textarea
        setIsFormValid(true);
        setIsDisabled(false);
    };



    const handleUseScriptLib = (index, cardText) => {
        // Set the active index for the clicked button
        setActiveScriptIndex(index);
    
        // Set the active card text
        setActiveCardText(cardText);
    
        // Ensure form validation state is true
        setIsFormValid(true);
    };


    const handleTabSelect = (selectedTab) => {
        setthemefield("");
        setActiveTab(selectedTab); // Update active tab state
        setGenerativeScript(false);
    
        if (selectedTab === "Input") {
            const script_content = (document.getElementById("user_used_script") as HTMLInputElement)?.value;
            console.log(script_content.length);
            if(script_content.length==0){
                setIsFormValid(false);
            } else {
                setIsFormValid(true);
            }
        } else if (selectedTab === "Generative") {
            const script_content = (document.getElementById("user_used_script_generative") as HTMLInputElement)?.value;
            console.log(script_content);
            if(script_content){
                setIsFormValid(true);
            } else {
                setIsFormValid(false);
            }
        } else if (selectedTab === "Script") {
            setActiveScriptIndex((prevIndex) => {
                return prevIndex;  // Or update based on your logic
            });
            
            if(activeCardText.length==0){
                setIsFormValid(false);
            } else {
                setIsFormValid(true);
            }
        }
    };


    const handleScriptSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSpinnerLoading(true);

        let script_content = "";  // Declare variable outside for scope
        let script_type = "";  // Declare variable outside for scope
        let sentence_ar: string[] = [];
        let project_script: string[] = [];
        const prj_sts = import.meta.env.VITE_STATUS_STEP_2;
        
        

        if (activeTab === "Input") {
            const script_content = (document.getElementById("user_used_script") as HTMLInputElement)?.value;
            sentence_ar = script_content.split('\n\n').filter(paragraph => paragraph.trim() !== '');
            script_type = "input_script";
            const script_url = (document.getElementById("generate_url") as HTMLInputElement)?.value;
            project_script = {
                "script_type": script_type,
                "script_content": script_content,
                "sentence_ar": sentence_ar,
                "script_url": script_url
            };
        } else if (activeTab === "Generative") {
            const script_content = (document.getElementById("user_used_script_generative") as HTMLInputElement)?.value;
            sentence_ar = script_content.split('\n').filter(line => line.trim() !== '');
            script_type = "generative_script";

            project_script = {
                "script_type": script_type,
                "script_content": script_content,
                "sentence_ar": sentence_ar,
                "script_keywords": keywordfield,
                "theme": themefield,
                "subtheme": subthemefield,
                "active_index": activeClass
            };
        } else if (activeTab === "Script") {
            script_content = activeCardText;  // Use the active card text
            const script_index= activeScriptIndex;
            
            
            sentence_ar = script_content.split('.').filter(sentence => sentence.trim() !== '');
            script_type = "library_script";

            const themeSearchScript= {
                "page": 1, 
                "limit": usersPerPage, 
                "filter": true, 
                "title": SearchData.title,
                "theme_lib": SearchData.theme, 
                "subtheme_lib": SearchData.subtheme, 
                "lang_lib": SearchData.lang,
                "keywords": SearchData.keywords 
            };

            project_script = {
                "script_type": script_type,
                "script_content": script_content,
                "sentence_ar": sentence_ar,
                "script_index": script_index,
                "theme_script_search": themeSearchScript
            };
        }


        const storedProjectId = projectID; // Get the project_id from localStorage
        if (storedProjectId) {
            const script_save = {
                project_script: project_script,
                project_id: storedProjectId,  
                steps:2,
                project_status:prj_sts
            };
            // Use stored project ID
            dispatch(script_save_func(script_save));
        } else {
            toast.error("Please create new one or edit this project");    
        }
    };


    const fetchDetail = async () => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams(location.search);
            const prj_id = queryParams.get('project_id');
            setprojectID(prj_id);
            if (prj_id) {
                const data = { "project_id": prj_id };
                await dispatch(display_script_func(data));
            }
        } catch (error) {
            console.error('Error fetching project details:', error);
        } finally {
            setLoading(false);
        }
    };


    // useEffect(() => {
    //     fetchThemeData(); // Run only once when the component mounts
    // }, []);

    // useEffect(() => {
    //     if (scriptTitle || themefield || subthemefield || language || scriptkeywordfield) {
    //         fetchThemeData();
    //     }
    // }, [scriptTitle, themefield, subthemefield, language, scriptkeywordfield]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const projectId = queryParams.get('project_id');
        setprojectID(projectId);
        //dispatch(project_theme_all());
        fetchScriptData();
        fetchDetail();
    }, [dispatch]);


    useEffect(() => {
        // console.log(api_status);
        // console.log(data);

        if(data && api_status === 209){
            if(data.project_script && data.project_script.length > 0){
                //setgetScript(data.project_script[0]);
                setServerStep(data.steps);
                setprojectName(data.project_name);
                if (data.project_script[0].script_type === "input_script") {
                    setActiveTab("Input");
                    setUrl(data.project_script[0]['script_url']);
                    setContent(data.project_script[0]['script_content']);
                    
                    if(data.project_script[0]['script_content']){
                        setIsFormValid(true);  // Set form as valid if script content exists
                    } else {
                        setIsFormValid(false);  // Set form as valid if script content exists
                    }

                    
                } else if (data.project_script[0].script_type === "generative_script") {
                    setActiveTab("Generative");
                    setactiveClass(data.project_script[0]['active_index']);
                    setthemefield(data.project_script[0]['theme']);

                    setTimeout(() => {
                        setsubthemefield(data.project_script[0]['subtheme']);
                    }, 500);

                    
                    setkeywordfield(data.project_script[0]['script_keywords']);

                    const combinedContent = data.project_script[0]['generative_search_script'];
                    const combinedContentString = data.project_script[0]['script_content'];
                    let cleanedContent=[];
                    if(combinedContent){
                        cleanedContent = combinedContent.map(sentence => {
                            return sentence.replace(/^\d+\.\s*/, '');  // Remove leading numbers and period (e.g., "1. ")
                        });
                    } 
                    
                    const scriptData = cleanedContent;
                    setSelectedScript(combinedContentString);
                    setScripts(scriptData);
                    setIsFormValid(true);
                } else {
                    setActiveTab("Script");
                    const server_index = data.project_script[0]['script_index'];
                    const server_content = data.project_script[0]['script_content'];

                    if(data.project_script[0]['theme_script_search']){
                        const project_script= data.project_script[0]['theme_script_search'];
                        setthemefield(project_script.theme_lib);
                        setsubthemefield(project_script.subtheme_lib);
                        setscriptTitle(project_script.title);
                        setLanguage(project_script.lang_lib);
                        setscriptkeywordfield(project_script.keywords);
                    }
                    

                    setActiveScriptIndex(server_index);
                    setActiveCardText(server_content);
                    setIsFormValid(true); // Otherwise, set it as invalid
                }
            }
        } else if (api_status === 205 && isAuthenticated) {
            setGenerativeScript(false);
            setLoading(false);
            let parsedApiData = data.api_data;
            const scriptData = parsedApiData;
            console.log(scriptData);
            setScripts(scriptData);
        } else if (api_status === 200 && isAuthenticated) {
            if(data.length!=0){
                toast.success("Website content retrieved successfully");
                const formattedContent = data.map((item: any) => `${item.heading}\n${item.paragraph}`).join("\n\n");
                setContent(formattedContent);
            } else {
                const formattedContent=[];
                setContent(formattedContent);
                toast.error("Failed to retrieve data from the URL");
            }
            setIsDisabled(false);
            setIsFormValid(true);
            setGenerativeScript(false);
        } else if (api_status === 201 && isAuthenticated) {
            setThemes(data);
            const subthemes = data.map((themeItem: any) => themeItem.subtheme);
            const uniqueSubthemesArray = Array.from(new Set(subthemes));
            setUniqueSubthemes(uniqueSubthemesArray);
        } else if (api_status === 204 && isAuthenticated) {
                //setScripts(data);
        } else if (api_status === 206 && isAuthenticated) {
            setTimeout(() => {
                setSpinnerLoading(false);
                navigate(`/script-translation?project_id=${data[0].project_id}`);
            }, 1000);
        } else if (api_status === 201 && data.length === 0 && isAuthenticated) {
            toast.error("Cannot find any paragraph, You can paste content here manually.");
            setContent("");
        } else if(data && api_status === 500){
            setSpinnerLoading(false);
            setGenerativeScript(false);
            toast.error(data.message);
        }
        setLoading(false);
    }, [data, api_status, isAuthenticated, filterthemes, setSearchData]);

    return (
        <>
            <SidebarPanel/>
            
            <div className="content__container new--script--page">
            <Toaster position="top-right" reverseOrder={false} />
                <Container fluid>
                    <Row>
                        <Col sm={12}>
                            <h4 className="mb-3">Select Script type</h4>
                            <Tabs defaultActiveKey="Input" activeKey={activeTab} onSelect={handleTabSelect}>
                                <Tab eventKey="Input" title="Input Script">
                                    <h5>Generate Script with AI</h5>
                                    <p>Provide a URL to an article or blog here to import its text and media, or add your text below. AI will turn every sentence into a scene in your video.</p>
                                    <Form>
                                        <Form.Group className="mb-3 d-md-flex align-items-center">
                                            
                                            <Form.Control type="text" placeholder="Paste URL Here" id="generate_url" value={url} onChange={handleUrlChange}/>
                                            <Button variant="secondary" className="ml-md-3 mt-2 mt-md-0" onClick={handleClick} disabled={spinnerGenerativeScript}>
                                                Import
                                                {spinnerGenerativeScript && (
                                                
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                        className="ml-2"
                                                    >
                                                        <span className="sr-only">Please Wait...</span>
                                                    </Spinner>
                                                )}
                                            </Button>
                                        </Form.Group>
                                        <Form.Group className="mb-3 paste--content_script">
                                            <Form.Control 
                                            className="inputScript"
                                            as="textarea" 
                                            id="user_used_script"
                                            rows={15} 
                                            placeholder="Paste content here. Every sentence with punctuation will be turned into a new scene." 
                                            value={content}
                                            onChange={handleContentChange}
                                        />
                                        </Form.Group>
                                    </Form>
                                </Tab>
 
                                <Tab eventKey="Generative" className="min__height" title="Generative Script">
                                    <h5>Generate Script with AI</h5>
                                    <Form onSubmit={submit_generativescript}>
                                        <Row>
                                            <Col sm={12} md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Themes</Form.Label>
                                                    <Form.Select
                                                        className="form-control"
                                                        value={themefield}
                                                        onChange={(e) => setthemefield(e.target.value)}
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
                                            <Col sm={12} md={6}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Sub-themes</Form.Label>
                                                    <Form.Select
                                                        className="form-control"
                                                        value={subthemefield}
                                                        onChange={(e) => setsubthemefield(e.target.value)}
                                                        disabled={!subthemes.length} // Disable if no subthemes available
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
                                            <Col sm={12} md={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Keywords <small><i>[optional] (e.g. Meaning, question, answer, enlightenment)</i></small></Form.Label>
                                                    <Form.Control type="text" id="generative_keywords" placeholder="Meaning, question, creation, heaven and earth" value={keywordfield} onChange={(e) => setkeywordfield(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Form.Group className="text-right">
                                            {loading}
                                            
                                            <Button variant="secondary" type="submit" disabled={spinnerGenerativeScript}>
                                                Generate Text
                                                {spinnerGenerativeScript && (
                                                
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                        className="ml-2"
                                                    >
                                                        <span className="sr-only">Please Wait...</span>
                                                    </Spinner>
                                                )}
                                            </Button>
                                        </Form.Group>
                                    </Form>

                                    
                                    
                                    {scripts && scripts.length > 0 && (
                                        <div className="generate--script mt-4">
                                            <div className="main--scroll">
                                                {scripts && scripts.map((scriptItem: string, mindex: number) => (
                                                    <div className="inner--script" key={mindex}>
                                                        <h4 className={mindex + 1 === 1 ? "" : "mt-5"}>Script {mindex + 1}</h4>
                                                        <div className="script--desc">
                                                            <div className="script--scroll">
                                                            {scriptItem.split('.').map((sentence, index) => (
                                                                sentence.trim() && <p key={index}>{index + 1}. {sentence.trim()}.</p> // Display each sentence in <p> tag
                                                            ))}
                                                            </div>
                                                            <Button variant={activeClass === mindex ? "primary" : "secondary"} onClick={() => handleUseScript(scriptItem, mindex)}>Use this Script</Button>
                                                        </div>
                                                    </div>
                                                ))}

                                            </div>
                                            <div className="generate--block">
                                                <h4>Generated Script</h4>
                                                <div className="paste--content">
                                                    <Form.Control 
                                                        as="textarea" 
                                                        rows={15} 
                                                        id="user_used_script_generative"
                                                        placeholder="Copy and Paste content here from the generated scripts. Every sentence with punctuation will be turned into a new scene." 
                                                        onChange={handleGenContentChange}
                                                        value={selectedScript}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Tab>

                                <Tab eventKey="Script" className="tab--script" title="Script Library">
                                    <SearchScriptLibrary 
                                        SearchData={SearchData} 
                                        setSearchData={setSearchData}
                                        handleUseScriptLib={handleUseScriptLib} 
                                        activeIndex={setActiveScriptIndex}
                                    />
                                </Tab>
                            </Tabs>
                            <p></p>
                            
                            <Form className="fixed--bottom mt-3" onSubmit={handleScriptSubmit}>
                                <Form.Group className="d-flex justify-content-between">
                                    <div className="text-left">
                                        <Button className="rounded" href={`/create-project?project_id=${projectID}`} variant="secondary">Back</Button>
                                    </div>
                                    
                                    <div className="text-right">
                                        {projectID && (
                                            <Form.Control 
                                                type="hidden" 
                                                name="project_id" 
                                                value={projectID}
                                            />
                                        )}
                                        <Button variant="primary" disabled={!isFormValid} type="submit">
                                            Continue 
                                            {spinnerloading ? (
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
                                            ) : (
                                                <FiArrowRight className="ml-2" />
                                            )}
                                        </Button>
                                    </div>                    
                                </Form.Group>
                            </Form>
                            <p></p>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className={isCollapse ? 'steps--collaped' : 'steps--sidebar'}>
                <Navbar expand="lg">
                    <Navbar.Toggle aria-controls="steps-navbar-nav" className={isCollapse ? 'button--Toggle' : 'btn--Click'} onClick={handleClickSidebar} />
                    {/* <Navbar.Toggle aria-controls="steps-navbar-nav" /> */}
                    <Navbar.Collapse id="steps-navbar-nav">
                        <Nav>
                            <Nav.Link className={ServerStep >= 1 ? "active" : ""} href={`/create-project?project_id=${projectID}`} disabled={ServerStep < 1}>01.</Nav.Link>
                            <Nav.Link className={ServerStep >= 2 ? "current_steps" : ""} href={`/create-script?project_id=${projectID}`} disabled={ServerStep < 2}>02.</Nav.Link>
                            <Nav.Link className={ServerStep >= 3 ? "active" : ""} href={`/script-translation?project_id=${projectID}`} disabled={ServerStep < 3}>03.</Nav.Link>
                            <Nav.Link className={ServerStep >= 4 ? "active" : ""} href={`/submit-translation?project_id=${projectID}`} disabled={ServerStep < 4}>04.</Nav.Link>
                            <Nav.Link className={ServerStep >= 5 ? "active" : ""} href={`/new-video-editor?project_id=${projectID}`} disabled={ServerStep < 5}>05.</Nav.Link>
                        </Nav>
                        <ListGroup>
                            <ListGroup.Item>
                                <h3>{projectName}</h3>
                                <p></p>
                                <h3>02. Make a Script</h3>
                            </ListGroup.Item>
                            
                            {activeTab && (
                                <>
                                <ListGroup.Item>
                                    <strong>Script Type: </strong> 
                                    {activeTab === "Script" ? `${activeTab} Library` : `${activeTab} Script`}
                                </ListGroup.Item>

                                </>
                            )}
                            
                            <ListGroup.Item action href="/review-guidelines" disabled></ListGroup.Item>
                            
                        </ListGroup>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </>
    );
}

export default CreateScriptStep;