import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Col, Container, Row, Form, Button, CardGroup, Modal, Card, Spinner, Tabs, Tab, Table } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { createFilegenerator, list_filegenerator } from "~/store/slices/filegenerator/action";
import toast, { Toaster } from 'react-hot-toast';
import './fileGeneratorStyle.css';
import { MdClose } from 'react-icons/md';
import { BsArrowRight } from "react-icons/bs";
import SidebarPanel from "../../components/Sidebar/Sidebar";
import { FileNameCountry, faceBookPageList, countryLanguageData } from "~/constants/options";

function FileGenerator() {
    const dispatch = useDispatch();
    const formRef = useRef(null);
    const [show, setShow] = useState(false);
    const { data, api_status, isAuthenticated } = useSelector((state: any) => state.filegenerator);
    const [theme, setTheme] = useState(""); // Store selected theme
    const [subtheme, setSubtheme] = useState(""); // Store selected subtheme
    const [formData, setFormData] = useState({}); // Store all form data
    const [selectedDate, setSelectedDate] = useState(new Date()); // Default to today's date
    const [selectedCountry, setSelectedCountry] = useState(null); // Selected country
    const [selectedLanguage, setSelectedLanguage] = useState(null); // Selected language
    const [selectedFBPage, setSelectedFBPage] = useState(null); // Selected FB Page
    const [spinnerLoading, setSpinnerLoading] = useState(false);
    const [subStages, setSubStages] = useState(["A", "B", "C"]); // Example sub-stages
    const [isFormValid, setIsFormValid] = useState(false);

    const handleClose = () => setShow(false);
    // Handle Country Change (Single Select)
    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
        setSelectedLanguage(null); // Reset language when country changes
        setSelectedFBPage(null); // Reset FB Page when country changes
    };

    // Get Available Languages for Selected Country
    const availableLanguages = [
        ...(selectedCountry
            ? (countryLanguageData.find((item) => item.countryCode.trim() === selectedCountry.value.trim())?.language || []).map((lang) => ({
                  value: lang.languageCode.trim(),
                  label: lang.languageName.trim(),
              }))
            : []
        ),
        { value: "EN", label: "(EN) English" } // Static option added at the end
    ];
    
    

    // Get Available FB Pages for Selected Country
    const availableFBPages = selectedCountry
        ? (faceBookPageList.find((item) => item.countryCode.trim() === selectedCountry.value.trim())?.pages || []).map((page) => ({
              value: page.trim(),
              label: page.trim(),
          }))
        : [];
    
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


    // Handle theme change and update subtheme options
    const handleThemeChange = (e) => {
        const selectedTheme = e.target.value;
        setTheme(selectedTheme);
        setSubtheme(""); // Reset subtheme selection
    };

    // Handle subtheme change
    const handleSubthemeChange = (e) => {
        setSubtheme(e.target.value);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setSpinnerLoading(true);

        const userData = localStorage.getItem('user');
        const user_id = localStorage.getItem('user_id');
        const user = userData ? JSON.parse(userData) : null;
        const username = user ? user.data : null;

    
        // Collect all form data
        const formData = {
            file_date: selectedDate,
            countryCode: selectedCountry?.value || "",
            country: selectedCountry?.label || "",
            languageCode: selectedLanguage?.value || "",
            lang: selectedLanguage?.label || "",
            fbpage: selectedFBPage?.value || "",
            localization: e.target.localization.value,
            videoTitle: e.target.video_title.value.toUpperCase().replace(/\s/g, ""),
            theme: theme.toUpperCase().replace(/\s/g, ""),
            subTheme: subtheme.toUpperCase().replace(/\s/g, ""),
            testNumber: e.target.test_number.value,
            stageNumber: e.target.stage_number.value.replace(/\s/g, ""),
            poNumber: e.target.po_number.value.toUpperCase().replace(/\s/g, ""),
            originalOrLocalized: e.target.localization.value.charAt(0), // Get the first character
        };
    
        // Ensure required fields are filled
        if (
            !formData.countryCode ||
            !formData.languageCode ||
            !formData.fbpage ||
            !formData.theme ||
            !formData.subTheme ||
            !formData.poNumber ||
            !formData.stageNumber ||
            !formData.testNumber
        ) {
            //setIsFormValid(true);
            toast.error("Please fill all required fields.");
            setSpinnerLoading(false);
            return;
        }
    
        // Generate Date Format (DDMMYY)
        const currentDate =
            selectedDate.getDate().toString().padStart(2, "0") +
            (selectedDate.getMonth() + 1).toString().padStart(2, "0") +
            selectedDate.getFullYear().toString().slice(-2);
    
        // Generate Naming Convention
        const fbpageFormatted = formData.fbpage.toUpperCase().replace(/\s/g, ""); // Only fbpage is uppercase
        const stageNumberFormatted = formData.stageNumber.replace(/([a-zA-Z]+)(\d+)/, "$1 $2"); // Ensures correct spacing

        const campaign = `${formData.countryCode}-${formData.languageCode}-${currentDate}-${formData.originalOrLocalized}*${fbpageFormatted}*-${formData.theme}-${formData.subTheme}-Test ${formData.testNumber}-${stageNumberFormatted}${subStages[0]} --VV -GP - ${formData.poNumber}`;
        const fileNameOne = `${formData.countryCode}-${formData.languageCode}-${currentDate}-${formData.originalOrLocalized}*${fbpageFormatted}*-${formData.theme}-${formData.subTheme}-Test ${formData.testNumber}-${stageNumberFormatted}${subStages[0]}--VV`;
        const fileNameTwo = `${formData.countryCode}-${formData.languageCode}-${currentDate}-${formData.originalOrLocalized}*${fbpageFormatted}*-${formData.theme}-${formData.subTheme}-Test ${formData.testNumber}-${stageNumberFormatted}${subStages[1]}--VV`;
        const fileNameThree = `${formData.countryCode}-${formData.languageCode}-${currentDate}-${formData.originalOrLocalized}*${fbpageFormatted}*-${formData.theme}-${formData.subTheme}-Test ${formData.testNumber}-${stageNumberFormatted}${subStages[2]}--VV`;
    
        formData.camp_name = campaign;
        formData.generated_filename = [fileNameOne, fileNameTwo, fileNameThree];
        formData.user_id= user_id;
        formData.user_name= username;

        setFormData(formData);

        console.log(formData);
        dispatch(createFilegenerator(formData));
    };




    useEffect(() => {
        // console.log(api_status);
        // console.log(data);
        if(api_status === 200){
            if(data.result && data.result.length > 0){
                toast.success("Data saved successfully");
                setSpinnerLoading(false);
                setShow(true);
                if (formRef.current) {
                    formRef.current.reset();
                }
            }
        } else if(api_status === 500){
            toast.error(data.message);
            setSpinnerLoading(false);
        }
    }, [data, api_status, isAuthenticated]);
    
    return (
        <>
            <SidebarPanel />
            <div className="content__container new--script--page">
                <Toaster position="top-right" reverseOrder={false} />
                <Container fluid>
                    <Row>
                        <Col sm={12}>
                            <h3 className="mb-4">File Generator</h3>
                            <Form ref={formRef} onSubmit={handleSubmit}>
                                <Row>
                                    <Col sm={6} lg={4}>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>Date</Form.Label>
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={(date) => setSelectedDate(date)}
                                                dateFormat="MM/dd/yyyy" // Format as needed
                                                className="form-control" // Bootstrap styling
                                                placeholderText="Select a date"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>

                                    {/* Country Dropdown (Single Select) */}
                                    <Col sm={6} lg={4}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Country</Form.Label>
                                            <Select
                                                name="country"
                                                options={FileNameCountry}
                                                value={selectedCountry}
                                                onChange={handleCountryChange}
                                                className="form-control"
                                                menuPlacement="auto"
                                                isClearable
                                            />
                                        </Form.Group>
                                    </Col>


                                    {/* Language Dropdown (Populated based on Selected Country) */}
                                    <Col sm={6} lg={4}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Language</Form.Label>
                                            <Select
                                                name="language"
                                                options={availableLanguages}
                                                value={selectedLanguage}
                                                onChange={(selectedOption) => setSelectedLanguage(selectedOption)}
                                                className="form-control"
                                                menuPlacement="auto"
                                                isClearable
                                            />
                                        </Form.Group>
                                    </Col>

                                    {/* FB Pages Dropdown (Populated based on Selected Country) */}
                                    <Col sm={6} lg={4}>
                                        <Form.Group className="form-group">
                                            <Form.Label>FB Pages</Form.Label>
                                            <Select
                                                name="fbpage"
                                                options={availableFBPages}
                                                value={selectedFBPage}
                                                onChange={(selectedOption) => setSelectedFBPage(selectedOption)}
                                                className="form-control"
                                                menuPlacement="auto"
                                                isClearable
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col sm={6} lg={4}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Localization</Form.Label>
                                            <Form.Select
                                                name="localization"
                                                className="form-control"
                                            >
                                                <option value="">Select Localization</option>
                                                <option value="Original (O)">Origin (O)</option>
                                                <option value="Localized (L)">Localized (L)</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col sm={6} lg={4}>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>Video Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="video_title"
                                                placeholder="Video Title"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>

                                    {/* Theme Dropdown */}
                                    <Col sm={6} lg={4}>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>Theme</Form.Label>
                                            <Form.Select className="form-control" name="theme" value={theme} onChange={handleThemeChange} required>
                                                <option value="">Select Theme</option>
                                                {Object.keys(themeSubthemeMap).map((themeKey) => (
                                                    <option key={themeKey} value={themeKey}>
                                                        {themeKey}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    {/* Subtheme Dropdown - Updates based on Theme Selection */}
                                    <Col sm={6} lg={4}>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>Subtheme</Form.Label>
                                            <Form.Select className="form-control" name="subtheme" value={subtheme} onChange={handleSubthemeChange} required>
                                                <option value="">Select Subtheme</option>
                                                {theme && themeSubthemeMap[theme]?.map((sub, index) => (
                                                    <option key={index} value={sub}>
                                                        {sub}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col sm={6} lg={4}>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>Test Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="test_number"
                                                placeholder="Test Number"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col sm={6} lg={4}>
                                        <Form.Group className="form-group">
                                            <Form.Label>Stage Number</Form.Label>
                                            <Form.Select
                                                name="stage_number"
                                                className="form-control"
                                            >
                                                <option value="">Stage Number</option>
                                                <option value="Stage1">Stage 1</option>
                                                <option value="Stage2">Stage 2</option>
                                                <option value="Stage3">Stage 3</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col sm={6} lg={4}>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>PO Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="po_number"
                                                placeholder="PO Number"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Group className="text-left mb-3 form-group">
                                            <Button variant="primary" type="submit">
                                                Generate
                                                {spinnerLoading && (
                                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="ml-2" />
                                                )}
                                            </Button>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Names</Modal.Title>
                    <button type="button" onClick={handleClose} className="btn-close" aria-label="Close"><MdClose /></button>
                </Modal.Header>
                <Modal.Body>
                        <Table responsive striped>
                            <tbody>
                                <tr><th> campaign Name</th></tr>
                                <tr>
                                    <td>{formData.camp_name}</td>
                                </tr>
                                <tr>
                                    <th> File Names </th>
                                </tr>
                                
                                <tr>
                                    <td><p className="generator_text">{formData.generated_filename?.[0] && formData.generated_filename[0]}</p></td>
                                </tr>
                                <tr>
                                    <td><p className="generator_text">{formData.generated_filename?.[1] && formData.generated_filename[1]}</p></td>
                                </tr>
                                
                                <tr>
                                    <td><p className="generator_text">{formData.generated_filename?.[2] && formData.generated_filename[2]}</p></td>
                                </tr>
                            </tbody>
                        </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" href="/file-generator-list">View List</Button>
                </Modal.Footer>
                
            </Modal>
        </>
    );
}

export default FileGenerator;
