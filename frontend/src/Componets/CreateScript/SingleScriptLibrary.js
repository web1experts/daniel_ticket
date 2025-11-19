import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Col, Container, Row, Form, Button, CardGroup, Card, Spinner, Tabs, Tab, Tooltip, Modal, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { single_script_lib, script_library_update } from "~/store/slices/project/action";
import SidebarPanel from "../Sidebar/Sidebar";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { jsPDF } from "jspdf";
import { MdClose } from 'react-icons/md';

function SingleScriptLibrary() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [openDownloadModal, setopenDownloadModal] = useState(false);
    const [spinnerloading, setSpinnerLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState(false);
    const [subthemes, setSubthemes] = useState([]);

    const { data, api_status, isAuthenticated } = useSelector((state: any) => state.project);
    
    const [formData, setFormData] = useState({ 
        script_id:'', 
        title:'',
        theme: '', 
        subtheme: '',
        content: '', 
        felt: '',
        lang: '',
        keywords: [] 
    });

    const [modalData, setModalData] = useState({
        script_id:'', 
        title:'',
        theme: '', 
        subtheme: '',
        content: '', 
        felt: '',
        lang: '',
        keywords: 'any' 
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        setModalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    
        // Update subthemes when theme changes
        if (name === "theme") {
            const newSubthemes = themeSubthemeMap[value] || [];
            setSubthemes(newSubthemes);
    
            // Reset subtheme in formData
            setModalData((prevData) => ({ 
                ...prevData, 
                subtheme: newSubthemes.length > 0 ? newSubthemes[0] : "" 
            }));
        }
    };


    const handleEditClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


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



    const handleLangChange = (selectedOptions) => {
        setModalData((prevData) => ({
            ...prevData,
            lang: selectedOptions ? selectedOptions.map((option) => option.value) : [],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSpinnerLoading(true);

        let keywordsArray: string[];

        if (Array.isArray(modalData.keywords)) {
            // If it's already an array
            keywordsArray = modalData.keywords;
        } else if (typeof modalData.keywords === 'string') {
            // If it's a comma-separated string
            keywordsArray = modalData.keywords.split(',').map(keyword => keyword.trim());
        } else {
            // If it's neither, initialize it as an empty array
            keywordsArray = [];
        }

        const script_data = {
            script_id: modalData.script_id,
            title: modalData.title,
            filter: true,
            content: modalData.content,
            theme: modalData.theme,
            subtheme: modalData.subtheme,
            felt_need: modalData.felt,
            lang: modalData.lang,
            keyword: keywordsArray,
        };

        //console.log(script_data);

        dispatch(script_library_update(script_data));
    };



    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const scriptid = queryParams.get('script');
        if (scriptid) {
            const data = { "script_id": scriptid };
            dispatch(single_script_lib(data));
        } 
    }, [dispatch]);



    useEffect(() => {
        if (data && api_status === 203) {
            setFormData({
                script_id: data._id, // Assuming you want to use _id as script_id
                title: data.title,
                theme: data.theme,
                subtheme: data.subtheme,
                content: data.content,
                felt: data.felt_need,
                lang: data.lang,
                keywords: Array.isArray(data.keyword) ? data.keyword : (data.keyword ? data.keyword.split(',').map(k => k.trim()) : []),
            });


            setModalData({
                script_id: data._id, // Assuming you want to use _id as script_id
                title: data.title,
                theme: data.theme,
                subtheme: data.subtheme,
                content: data.content,
                felt: data.felt_need,
                lang: data.lang,
                keywords: Array.isArray(data.keyword) ? data.keyword : (data.keyword ? data.keyword.split(',').map(k => k.trim()) : []),
            });
    
            
            if (data.theme) {
                setSubthemes(themeSubthemeMap[data.theme] || []);
            }
        } else if (data && api_status === 201) {
            setSpinnerLoading(false);
            
            setFormData({
                script_id: data._id, // Assuming you want to use _id as script_id
                title: data.title,
                theme: data.theme,
                subtheme: data.subtheme,
                content: data.content,
                felt: data.felt_need,
                lang: data.lang,
                keywords: Array.isArray(data.keyword) ? data.keyword : (data.keyword ? data.keyword.split(',').map(k => k.trim()) : []),
            });
            setShowModal(false);
        }
    }, [data, api_status, isAuthenticated]);

    const downloadTxtFile = async () => {
        try{
            const element = document.createElement("a");
            let content = `${formData.title }\n\n\n`
            content += `${formData.content}\n`;
            const file = new Blob([ content ], {type: 'text/plain;charset=utf-8'});
            element.href = URL.createObjectURL(file);
            element.download = Date.now() + ".txt";
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
            setTimeout(() => {
                setopenDownloadModal(false);
            }, 2000)
        }catch(e){
            toast.dismiss();
            toast.error("Something went wrong, Please try again");
        }
        
    }


    const downloadDocFile = async () => {
        try{
            const element = document.createElement("a");
            let content = `${formData.title}\n\n\n`
            content += `${formData.content}\n`;
            const file = new Blob([content], {type: 'application/msword;charset=utf-8'});
            element.href = URL.createObjectURL(file);
            element.download = Date.now() + ".docx";
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
            setTimeout(() => {
                setopenDownloadModal(false);
            }, 2000)
        } catch (e) {
            toast.dismiss()
            toast.error("Something went wrong, Please try again");
        }
    }
    
    const downloadAsPDF = async () => {
        try{
            const doc = new jsPDF();
            doc.setFontSize(22);
            doc.text(formData.title, 20, 20); // title

            doc.setFontSize(14);
            let content = doc.splitTextToSize(formData.content, 185)
            doc.text(content, 20, 30);
            doc.save(Date.now()+".pdf")
            setTimeout(() => {
                setopenDownloadModal(false);
            }, 2000)
        } catch (error) {
            console.log(error);
            toast.dismiss();
            toast.error("Error: ", error);
        }
    }

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

    const langLabels = getLabelsFromValues(formData.lang, options);

    return (
        <>
            <SidebarPanel />
            <div className="content__container new--script--page uploaded_script">
                <Toaster position="top-right" reverseOrder={false} />
                <Container fluid>

                    {/* Modal for Downloading Script */}
                    <Modal className="downloadModal" show={openDownloadModal} onHide={() => setopenDownloadModal(true)} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">Download</Modal.Title>
                            <span onClick={() => setopenDownloadModal(false)}><MdClose /></span>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col sm={10}>
                                    <p className="px-3"><strong>Choose a Format</strong></p>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                            Translation Document
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={downloadAsPDF}>  
                                                <svg viewBox="0 0 512 512" >
                                                    <path d="M444.875,109.792L338.208,3.125c-2-2-4.708-3.125-7.542-3.125h-224C83.135,0,64,19.135,64,42.667v426.667     C64,492.865,83.135,512,106.667,512h298.667C428.865,512,448,492.865,448,469.333v-352     C448,114.5,446.875,111.792,444.875,109.792z M341.333,36.417l70.25,70.25h-48.917c-11.76,0-21.333-9.573-21.333-21.333V36.417z      M426.667,469.333c0,11.76-9.573,21.333-21.333,21.333H106.667c-11.76,0-21.333-9.573-21.333-21.333V42.667     c0-11.76,9.573-21.333,21.333-21.333H320v64C320,108.865,339.135,128,362.667,128h64V469.333z"/>
                                                    <path d="M310.385,313.135c-9.875-7.771-19.26-15.76-25.51-22.01c-8.125-8.125-15.365-16-21.656-23.5     c9.813-30.323,14.115-45.958,14.115-54.292c0-35.406-12.792-42.667-32-42.667c-14.594,0-32,7.583-32,43.688     c0,15.917,8.719,35.24,26,57.698c-4.229,12.906-9.198,27.792-14.781,44.573c-2.688,8.052-5.604,15.51-8.688,22.406     c-2.51,1.115-4.948,2.25-7.302,3.427c-8.479,4.24-16.531,8.052-24,11.594C150.5,370.177,128,380.844,128,401.906     c0,15.292,16.615,24.76,32,24.76c19.833,0,49.781-26.49,71.656-71.115c22.708-8.958,50.938-15.594,73.219-19.75     c17.854,13.729,37.573,26.865,47.125,26.865c26.448,0,32-15.292,32-28.115c0-25.219-28.813-25.219-42.667-25.219     C337.031,309.333,325.49,310.604,310.385,313.135z M160,405.333c-6.094,0-10.219-2.875-10.667-3.427     c0-7.563,22.552-18.25,44.365-28.583c1.385-0.656,2.792-1.313,4.219-1.99C181.896,394.563,166.052,405.333,160,405.333z      M234.667,214.354c0-22.354,6.938-22.354,10.667-22.354c7.542,0,10.667,0,10.667,21.333c0,4.5-3,15.75-8.49,33.313     C239.135,233.75,234.667,222.698,234.667,214.354z M242.844,329c0.667-1.854,1.313-3.729,1.938-5.625     c3.958-11.875,7.521-22.542,10.698-32.146c4.427,4.875,9.198,9.865,14.313,14.979c2,2,6.958,6.5,13.563,12.135     C270.208,321.208,256.219,324.76,242.844,329z M362.667,334.552c0,4.792,0,6.781-9.896,6.844     c-2.906-0.625-9.625-4.583-17.917-10.229c3.01-0.333,5.229-0.5,6.479-0.5C357.094,330.667,361.563,332.208,362.667,334.552z"/>
                                                </svg>
                                                Pdf
                                            </Dropdown.Item>

                                            <Dropdown.Item onClick={downloadDocFile}>
                                                <svg viewBox="0 0 512 512">
                                                    <path d="M282.208,19.67c-3.648-3.008-8.48-4.256-13.152-3.392l-256,48C5.472,65.686,0,72.278,0,79.99v352    c0,7.68,5.472,14.304,13.056,15.712l256,48c0.96,0.192,1.984,0.288,2.944,0.288c3.68,0,7.328-1.28,10.208-3.68    c3.68-3.04,5.792-7.584,5.792-12.32v-448C288,27.222,285.888,22.71,282.208,19.67z M256,460.694L32,418.71V93.27l224-41.984    V460.694z"/>
                                                    <path d="M496,79.99H272c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h208v288H272c-8.832,0-16,7.168-16,16    c0,8.832,7.168,16,16,16h224c8.832,0,16-7.168,16-16v-320C512,87.158,504.832,79.99,496,79.99z"/>
                                                    <path d="M432,143.99H272c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h160c8.832,0,16-7.168,16-16    C448,151.158,440.832,143.99,432,143.99z"/>
                                                    <path d="M432,207.99H272c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h160c8.832,0,16-7.168,16-16    C448,215.158,440.832,207.99,432,207.99z"/>
                                                    <path d="M432,271.99H272c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h160c8.832,0,16-7.168,16-16    C448,279.158,440.832,271.99,432,271.99z"/>
                                                    <path d="M432,335.99H272c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h160c8.832,0,16-7.168,16-16    C448,343.158,440.832,335.99,432,335.99z"/>
                                                    <path d="M209.76,176.086c-8.48-0.864-16.704,5.344-17.664,14.112l-8.608,77.504l-24.512-65.344    c-4.704-12.48-25.312-12.48-29.984,0l-26.016,69.408l-7.136-50.048c-1.248-8.768-9.44-14.976-18.112-13.568    c-8.736,1.248-14.816,9.344-13.568,18.08l16,112c1.024,7.264,6.848,12.896,14.112,13.664c7.424,0.736,14.144-3.424,16.704-10.272    L144,253.558l33.024,88.064c2.368,6.272,8.384,10.368,14.976,10.368c0.672,0,1.312-0.032,1.984-0.16    c7.328-0.896,13.088-6.752,13.92-14.08l16-144C224.864,184.982,218.56,177.078,209.76,176.086z"/>
                                                </svg>
                                                Word
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={downloadTxtFile}>
                                                <svg viewBox="0 0 24 24">
                                                    <g><path d="m12.25 12c-.414 0-.75-.336-.75-.75v-.75h-7v.75c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.5c0-.414.336-.75.75-.75h8.5c.414 0 .75.336.75.75v1.5c0 .414-.336.75-.75.75z"/></g>
                                                    <g><path d="m8 18.75c-.414 0-.75-.336-.75-.75v-8c0-.414.336-.75.75-.75s.75.336.75.75v8c0 .414-.336.75-.75.75z"/></g>
                                                    <g><path d="m9.25 19h-2.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h2.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/></g>
                                                    <g><path d="m20.25 10.5h-4.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/></g>
                                                    <g><path d="m20.25 14.5h-4.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/></g>
                                                    <g><path d="m20.25 18.5h-4.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/></g>
                                                    <g><path d="m21.25 23h-18.5c-1.517 0-2.75-1.233-2.75-2.75v-16.5c0-1.517 1.233-2.75 2.75-2.75h18.5c1.517 0 2.75 1.233 2.75 2.75v16.5c0 1.517-1.233 2.75-2.75 2.75zm-18.5-20.5c-.689 0-1.25.561-1.25 1.25v16.5c0 .689.561 1.25 1.25 1.25h18.5c.689 0 1.25-.561 1.25-1.25v-16.5c0-.689-.561-1.25-1.25-1.25z"/></g>
                                                    <g><path d="m23.25 6h-22.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h22.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/></g>
                                                </svg>
                                                text
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </Modal.Body>
                    </Modal>
                    {/* End Modal for Downloading Script */}




                    {/* Modal for editing Script */}
                    <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                        <Modal.Header>
                            <Modal.Title>Edit Script</Modal.Title>
                            <span onClick={handleCloseModal} style={{ cursor: "pointer"}}><MdClose /></span>
                        </Modal.Header>
                        <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3 form-group">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="title"
                                            value={modalData.title}
                                            onChange={handleInputChange}
                                            placeholder="Title"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3 form-group">
                                        <Form.Label>Theme</Form.Label>
                                        <Form.Select
                                            className="form-control"
                                            name="theme"
                                            value={modalData.theme}
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
                                    <Form.Group className="mb-3 form-group">
                                        <Form.Label>Subtheme</Form.Label>
                                        <Form.Select
                                            className="form-control"
                                            name="subtheme"
                                            value={modalData.subtheme}
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
                                    <Form.Group className="mb-3 form-group">
                                        <Form.Label>Felt Need</Form.Label>
                                        <Form.Select
                                            className="form-control"
                                            name="felt"
                                            value={modalData.felt}
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
                                    <Form.Group className="mb-3 form-group">
                                        <Form.Label>Keywords (separated by commas)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="keywords"
                                            value={modalData.keywords}
                                            onChange={handleInputChange}
                                            placeholder="Enter keywords (e.g., Love, Peace, Freedom)"
                                            required
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group className="form-group">
                                        <Form.Label>Language</Form.Label>
                                        <Select
                                            name="lang"
                                            options={options}
                                            isMulti
                                            className="form-control"
                                            value={options.filter(option => (modalData.lang ?? []).includes(option.value))} // Provide default fallback
                                            onChange={handleLangChange}
                                            menuPlacement="auto"
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label>API Data</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={10}
                                            name="content"
                                            value={modalData.content}
                                            onChange={handleInputChange}
                                            placeholder="Enter your script here"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit">
                                    Update Script
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
                            </Modal.Footer>
                        </Form>
                        </Modal.Body>
                    </Modal>


                    <Row>
                        <Col sm={12}>
                            <h4 className="mb-4">Script Library: {formData.theme}</h4>
                        </Col>

                        <Col sm={6}>
                            <div className="scriptCol card">
                                <div className="card-body" id="scriptContent">
                                    <div className="card-title h5">
                                        <strong>{formData.title} </strong>
                                        <span className="edit_script" onClick={handleEditClick}  style={{ cursor: "pointer", marginLeft: "10px", float: "right" }}>
                                            {/* SVG for edit icon */}
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0 0 24 24">
                                                <path d="M 16.9375 1.0625 L 3.875 14.125 L 1.0742188 22.925781 L 9.875 20.125 L 22.9375 7.0625 C 22.9375 7.0625 22.8375 4.9615 20.9375 3.0625 C 19.0375 1.1625 16.9375 1.0625 16.9375 1.0625 z M 17.3125 2.6875 C 18.3845 2.8915 19.237984 3.3456094 19.896484 4.0214844 C 20.554984 4.6973594 21.0185 5.595 21.3125 6.6875 L 19.5 8.5 L 15.5 4.5 L 16.9375 3.0625 L 17.3125 2.6875 z M 4.9785156 15.126953 C 4.990338 15.129931 6.1809555 15.430955 7.375 16.625 C 8.675 17.825 8.875 18.925781 8.875 18.925781 L 8.9179688 18.976562 L 5.3691406 20.119141 L 3.8730469 18.623047 L 4.9785156 15.126953 z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <div className="mb-2 text-muted  card-subtitle h6"><strong>{formData.theme}</strong></div>
                                    <div className="mb-2 text-muted  card-subtitle h6"> {formData.subtheme} </div>
                                    <Card.Text className="mb-1">
                                        {/* <strong>Felt Need -</strong>  */}
                                        <small>{formData.felt}</small>
                                    </Card.Text>
                                    <p className="card-text">{formData.content}</p>
                                    <div className="d-inline card-title h5"> Keywords</div>
                                    <div className="mb-2 text-muted d-inline  card-subtitle h6"> {formData.keywords.join(', ')} </div>
                                    </div>
                            </div>
                        </Col>

                        <Col sm={6}>
                            <div className="card downloadFile">
                                <div className="card-body">
                                    <button type="submit" className="mb-5 btn btn-primary" onClick={() => setopenDownloadModal(true)}>
                                        <svg height="20" width="20" viewBox="0 0 24 24"><path d="m12 16c-.205 0-.401-.084-.542-.232l-5.25-5.5c-.456-.477-.117-1.268.542-1.268h2.75v-5.75c0-.689.561-1.25 1.25-1.25h2.5c.689 0 1.25.561 1.25 1.25v5.75h2.75c.659 0 .998.791.542 1.268l-5.25 5.5c-.141.148-.337.232-.542.232z" fill="#00a4b9"></path><path d="m22.25 22h-20.5c-.965 0-1.75-.785-1.75-1.75v-.5c0-.965.785-1.75 1.75-1.75h20.5c.965 0 1.75.785 1.75 1.75v.5c0 .965-.785 1.75-1.75 1.75z" fill="#546d79"></path><path d="m12 2h-1.25c-.689 0-1.25.561-1.25 1.25v5.75h-2.75c-.659 0-.998.791-.542 1.268l5.25 5.5c.141.148.337.232.542.232z" fill="#00a4b9"></path><path d="m12 18h-10.25c-.965 0-1.75.785-1.75 1.75v.5c0 .965.785 1.75 1.75 1.75h10.25z" fill="#546d79"></path></svg>
                                        &nbsp; Download Document
                                    </button>
                                    {/* <p><strong>Length:</strong> 30 sec</p> */}
                                    
                                    <p className="mb-4"><strong>Tags:</strong> {formData.keywords.join(', ')}</p>
                                    <p><strong>Language:</strong> {langLabels}</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}


export default SingleScriptLibrary;