import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Col, Container, Row, Form, Button, CardGroup, Card, Spinner, Tabs, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { project_theme_all, script_library_insert, list_keywords_ai } from "~/store/slices/project/action";
import toast, { Toaster } from 'react-hot-toast';
import { BsArrowRight } from "react-icons/bs";
import ScriptSidebarPanel from "./ScriptSidebar";

function MainLibrary() {
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
                            <h3 className="mb-4">Script Library</h3>
                            {/* Display Uploaded Data */}
                            <div className="scriptlibrary">
                            {data && data.length > 0 && (
                                data.reduce((acc: any[], themeItem: any, index: number) => {
                                    if (index % 3 === 0) {
                                        acc.push([]);
                                    }
                                    
                                    // Truncate content to 20 words
                                    const truncatedContent = themeItem.content.split(' ').slice(0, 60).join(' ') + (themeItem.content.split(' ').length > 20 ? '...' : '');

                                    // Construct URL with query string for MongoDB ID
                                    const detailUrl = `/single-script-library?script=${themeItem._id}`;

                                    const langLabels = getLabelsFromValues(themeItem.lang, options);

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
                                                <Card.Text className="mt-3">{truncatedContent}</Card.Text>
                                            </Card.Body>
                                            <Card.Footer>
                                                <Button variant="primary" href={detailUrl}>Read More <BsArrowRight /></Button>
                                            </Card.Footer>
                                        </Card>
                                    );
                                    return acc;
                                }, [])
                                .map((cardGroup, groupIndex) => (
                                    <CardGroup key={groupIndex}>
                                        {cardGroup}
                                    </CardGroup>
                                ))
                            )}

                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default MainLibrary;