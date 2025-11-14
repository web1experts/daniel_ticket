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
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';


function SearchScriptLibrary({ SearchData, setSearchData, handleUseScriptLib, activeIndex }) {
    const location = useLocation();
    const usersPerPage = 12;
    const dispatch = useDispatch();
    const [subthemes, setSubthemes] = useState([]);
    const [language, setLanguage] = useState('');
    const [filterthemes, setFilterThemes] = useState("");
    const [activeScriptIndex, setActiveScriptIndex] = useState(null);
    const [spinnerThemScript, setspinnerThemScript] = useState<boolean>(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [activeCardText, setActiveCardText] = useState('');

    const { data, api_status, isAuthenticated } = useSelector((state: any) => state.project);
    
    

    

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

    


    const handleSearchInput = (e) => {
        const { name, value } = e.target;
    
        setSearchData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    
        // Update subthemes when theme changes
        if (name === "theme") {
            const newSubthemes = themeSubthemeMap[value] || [];
            handleThemeChange(value);
            setSubthemes(newSubthemes);
    
            // Reset subtheme in formData
            setSearchData((prevData) => ({ 
                ...prevData, 
                subtheme: newSubthemes.length > 0 ? newSubthemes[0] : "" 
            }));
        } else {
            setSearchData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    

    const handleScriptSelection = (index, cardText) => {
        setActiveScriptIndex(index);
        setActiveCardText(cardText);
        handleUseScriptLib(index, cardText); 
    };

    const handleLangChange = (selectedOptions) => {
        const updatedLang = selectedOptions ? selectedOptions.map((option) => option.value) : [];
        setSearchData((prevData) => ({
            ...prevData,
            lang: updatedLang,
        }));
    };



    const submit_library = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!SearchData.theme || !SearchData.subtheme) {
            toast.error("Theme and Subtheme are required. Please select them before proceeding.");
            return; // Stop execution if validation fails
        }

        setspinnerThemScript(true);
        let data = { 
            "page": 1, 
            "limit": usersPerPage, 
            "filter": true,
            "title": SearchData.title,
            "theme_lib": SearchData.theme, 
            "subtheme_lib": SearchData.subtheme, 
            "lang_lib": SearchData.lang,
            "keywords": SearchData.keywords 
        };
        
        setSearchData((prevData) => ({
            ...prevData,
            keywords: SearchData.keywords,
        }));

        dispatch(project_theme(data));
    };

    const handleThemeChange = (theme) => {
        if (!theme) return;
    
        const newSubthemes = themeSubthemeMap[theme] || [];
        setSubthemes(newSubthemes);
    
        // ✅ Ensure subtheme is set if available
        setSearchData((prevData) => ({
            ...prevData,
            theme, // Ensure theme is updated
            subtheme: newSubthemes.length > 0 ? newSubthemes[0] : "" // Select first subtheme if available
        }));
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
        if (data && api_status === 209) {
            if (data.project_script && data.project_script.length > 0) {
                const server_index = data.project_script[0]['script_index'];
                const server_content = data.project_script[0]['script_content'];
    
                if (data.project_script[0]['theme_script_search']) {
                    let project_script = data.project_script[0]['theme_script_search'];
    
                    const keywords = typeof project_script.keywords === 'string' ? project_script.keywords : '';
    
                    // ✅ Set theme first
                    setSearchData((prevData) => ({
                        ...prevData,
                        title: project_script.title,
                        theme: project_script.theme_lib, // ✅ Set theme from API
                        subtheme: project_script.subtheme_lib, // Reset subtheme initially
                        felt: project_script.felt_need,
                        keywords: keywords, 
                        lang: project_script.lang
                    }));
    
                    // ✅ Manually trigger theme change event
                    handleThemeChange(project_script.theme);
    
                    let filter = { 
                        "page": 1, 
                        "limit": usersPerPage, 
                        "filter": project_script.filter,
                        "title": project_script.title,
                        "theme_lib": project_script.theme_lib, 
                        "subtheme_lib": project_script.subtheme_lib, 
                        "lang_lib": project_script.lang_lib,
                        "keywords": project_script.keywords 
                    };
                    dispatch(project_theme(filter));
                }
    
                setActiveScriptIndex(server_index);
                setActiveCardText(server_content);
            }
        } else if (api_status === 202 && isAuthenticated) {
            setspinnerThemScript(false);
            setFilterThemes(data.theme);

            setSearchData({
                script_id: "", // Assuming you want to use _id as script_id
                title: data.filter.title,
                theme: data.filter.theme,
                subtheme: data.filter.subtheme,
                content: data.filter.content,
                felt: data.filter.felt_need,
                lang: data.filter.lang,
                keywords: Array.isArray(data.filter.keyword) ? data.filter.keyword : (data.filter.keyword ? data.filter.keyword.split(',').map(k => k.trim()) : [])
            });

            if(data.theme.length==0){
                setIsFormValid(false);
            } 
        } 
    }, [data, api_status, isAuthenticated, setFilterThemes, setSearchData, usersPerPage]);

    useEffect(() => {
        if (SearchData.theme) {
            handleThemeChange(SearchData.theme);
        }
    }, [SearchData.theme]);
    

    return (
        <>
            <Form onSubmit={submit_library}>
                
                    <Form.Group className="form-group">
                        <Form.Label>Theme</Form.Label>
                        <Form.Select
                            className="form-control"
                            value={SearchData.theme}
                            name="theme"
                            onChange={handleSearchInput}
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
                    {/* 🔹 Subtheme Selection (Auto-populated based on Theme) */}
                    <Form.Group className="form-group">
                        <Form.Label>Sub-theme</Form.Label>
                        <Form.Select
                            className="form-control"
                            value={SearchData.subtheme}
                            name="subtheme"
                            onChange={handleSearchInput}
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
                    <Form.Group className="form-group">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={SearchData.title}
                            onChange={handleSearchInput}
                        />

                    </Form.Group>
                
                    <Form.Group className="form-group">
                        <Form.Label>Language</Form.Label>
                 
                        <Select
                            name="lang"
                            options={options}
                            isMulti
                            className="form-control"
                            value={options.filter(option => (SearchData.lang || []).includes(option.value))} // Safely access lang
                            onChange={handleLangChange}
                            menuPlacement="auto"
                        />

                    </Form.Group>
                    <Form.Group className="form-group">
                        <Form.Label>Keywords</Form.Label>
                        <Form.Control
                            type="text"
                            name="keywords"
                            placeholder="Love, Help"
                            value={SearchData.keywords}
                            onChange={handleSearchInput}
                        />
                    </Form.Group>
                    <Form.Group className="text-right mb-3 form-group">
                        <Button variant="secondary" type="submit">
                            Search
                            {spinnerThemScript && (
                            
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

            {/* Wrapping cards in groups of 2 */}
            
            {filterthemes && filterthemes.length > 0 && (
                <CardGroup key="cardgroup">

                {filterthemes.reduce((acc: any[], themeItem: any, index: number) => {
                if (index % 3 === 0) {
                    // Add new CardGroup for every group of 3
                    acc.push([]);
                }
                const truncatedContent = themeItem.content.split(' ').slice(0, 60).join(' ') + (themeItem.content.split(' ').length > 20 ? '...' : '');
                const detailUrl = `/single-script-library?script=${themeItem._id}`;
                const langLabels = getLabelsFromValues(themeItem.lang, options);
                // Add the themeItem to the current CardGroup
                acc[acc.length - 1].push(
                    <Card key={themeItem._id}>
                        <Card.Body>
                            
                            <Card.Title>{themeItem.title}</Card.Title>
                            <Card.Title className="mb-2 card-subtitle"><strong><small>{themeItem.theme}</small></strong></Card.Title>
                            <Card.Title  className="mb-2 text-muted card-subtitle"><small>{themeItem.subtheme}</small></Card.Title>
                            <Card.Text className="mb-1"><strong>Felt Need -</strong> <small>{themeItem.felt_need}</small></Card.Text>
                            <Card.Text className="mb-1"><strong>Language -</strong> <small>{langLabels}</small></Card.Text>
                            <Card.Text>
                                <strong>Keywords -</strong> 
                                <small>
                                {themeItem.keyword.length > 2 
                                ? `${themeItem.keyword.slice(0, 2).join(', ')} ...` 
                                : themeItem.keyword.join(', ')}
                                </small>
                            </Card.Text>
                            <Card.Text>{truncatedContent}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            {/* <a href={detailUrl}>Read More</a> */}
                            <Button 
                                variant="primary" 
                                onClick={() => handleScriptSelection(index, themeItem.content)} 
                                className={`used_script_liab ${
                                    activeScriptIndex === index
                                    ? 'btn_activate' 
                                    : ''
                                }`}
                                style={{ padding: '.6rem 1.5rem' }}
                            >
                                Use this Script
                            </Button>
                        </Card.Footer>
                    </Card>
                );
                return acc;
                }, [])
                .map((cardGroup, groupIndex) => (
                
                    <>
                    {cardGroup}</>
                
                ))
            }
                </CardGroup>
            )}
        </>
    );
    
}

export default SearchScriptLibrary;
