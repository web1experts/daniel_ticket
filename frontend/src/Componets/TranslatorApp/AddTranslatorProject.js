import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Button, Form, Spinner } from "react-bootstrap";
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import { createTranslator } from "~/store/slices/translator/action";
import { filterMember } from "~/store/slices/user_role/action";
import toast, { Toaster } from 'react-hot-toast';
import TranslatorSidebarPanel from "./translatorSidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './translatorStyle.css';
import '../../App.css';

function AddTranslatorProject() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loadFirstTime, setLoadFirstTime] = useState<boolean>(true);
    const [spinnerloading, setSpinnerLoading] = useState<boolean>(false);
    const [users, setUsers] = useState([]);
    const { data, api_status, isAuthenticated } = useSelector((state: any) => state.translator);
    const apiResult = useSelector((state: any) => state.user);
    const fileInputRef = useRef(null); // Reference for file input
    const [formData, setFormData] = useState({
        title: '',
        due_date: '',
        tasks: []   , // Store selected checkboxes
        lang: [],
        users: [],
        desc: '',
        comments: ''
    });
    const [file, setFile] = useState(null); // Store file separately

    const options = [
        { value: "sqi_Latn", label: "Albanian" },
        { value: "pes_Arab", label: "Farsi (Persian)" },
        { value: "ita_Latn", label: "Italian" },
        { value: "jpn_Jpan", label: "Japanese" },
        { value: "lit_Latn", label: "Lithuanian" }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLangChange = (selectedOptions) => {
        setFormData((prevData) => ({
            ...prevData,
            lang: selectedOptions ? selectedOptions.map((option) => option.value) : [],
        }));
    };


    const handleUsersChange = (selectedOptions) => {
        setFormData({
            ...formData,
            users: selectedOptions ? selectedOptions.map((option) => option.value) : [],
        });
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            tasks: checked
                ? [...prev.tasks, value] // Add the value if checked
                : prev.tasks.filter((task) => task !== value), // Remove if unchecked
        }));
    };

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files?.[0];
        if (uploadedFile) {
            const allowedExtensions = ['pdf', 'rtf', 'srt', 'tsv', 'xlsx', 'xls', 'csv', 'doc', 'txt', 'docx'];
            const fileExtension = uploadedFile.name.split('.').pop().toLowerCase();
            console.log(fileExtension);

            if (!allowedExtensions.includes(fileExtension)) {
                toast.error(`Invalid file type! Only ${allowedExtensions.join(', ')} files are allowed.`);
                return;
            }

            setFile(uploadedFile); // Store the file
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(file);
        if (!file) {
            toast.error("Please upload a valid file.");
            return;
        }
        setSpinnerLoading(true);
        const formDataToSend = new FormData(); // Create a FormData object
        formDataToSend.append("title", formData.title);
        formDataToSend.append("due_date", formData.due_date);
        formDataToSend.append("tasks", formData.tasks); // Send tasks as a JSON string
        formDataToSend.append("lang", formData.lang); // Send languages as a JSON string
        formDataToSend.append("users", formData.users); // Send languages as a JSON string
        formDataToSend.append("desc", formData.desc);
        formDataToSend.append("status", "active");
        formDataToSend.append("upload", file); // Attach the binary file
        try {
            // Dispatch the action with the FormData
            dispatch(createTranslator(formDataToSend));
        } catch (error) {
            toast.error("An error occurred while creating the project.");
        }
    };


    useEffect(() => {
        if (loadFirstTime) {
            const data= {
                "role": "translator"
            };

            dispatch(filterMember(data));
        }
    }, [dispatch, loadFirstTime]);


    useEffect(() => {
        if (api_status === 201 && isAuthenticated) {
            toast.success("Project created successfully!");
            setFormData({
                title: '',
                due_date: '',
                tasks: [], // Store selected checkboxes
                lang: [],
                users: [],
                desc: '',
                comments: ''
            });
            // if (fileInputRef.current) {
            //     fileInputRef.current.value = ''; // Clear the file input
            // }
            setFile(null);
            setSpinnerLoading(false);
            const project_id= data.data._id;
            navigate(`/edit-translators?trans_id=${project_id}`);
        }

        if(apiResult.status=="idle"){
            if (apiResult.data.status == 204) {
                const transformedUsers = (apiResult.data.data || []).map((user) => ({
                    value: user._id, // Set value to _id
                    label: user.name, // Set label to name
                }));
                setUsers(transformedUsers);
            }
        }
    }, [data, api_status, isAuthenticated, setFormData, apiResult]);

    return (
        <>
            <TranslatorSidebarPanel />
            <div className="content__container projects--page translator--page pb-5">
                <Toaster position="top-right" reverseOrder={false} />
                <Container fluid>
                    <Row>
                        <Col sm={12} className="mb-4">
                            <h2><Button className="back--arrow mr-3 px-0" variant="link" href="/translators"><span><BsArrowLeft /></span></Button> Add Project</h2>
                        </Col>
                        <Col sm={12}>
                            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-0 form-group h-100">
                                            <label className="upload-contain h-100 customUploader" htmlFor="upload-docs">
                                            <svg id="color" viewBox="0 0 24 24"><path d="m14.25 0h-11.5c-1.52 0-2.75 1.23-2.75 2.75v15.5c0 1.52 1.23 2.75 2.75 2.75h6.59c-.54-1.14-.84-2.41-.84-3.75 0-1.15.22-2.25.64-3.26.2-.51.45-1 .74-1.45.65-1.01 1.49-1.87 2.48-2.54.51-.35 1.05-.64 1.63-.86.93-.39 1.95-.61 3.01-.63v-5.76c0-1.52-1.23-2.75-2.75-2.75z" fill="#eceff1"></path><g fill="#90a4ae"><path d="m14 9c0 .05 0 .1-.01.14-.58.22-1.12.51-1.63.86h-8.36c-.55 0-1-.45-1-1s.45-1 1-1h9c.55 0 1 .45 1 1z"></path><path d="m9.88 12.54c-.29.45-.54.94-.74 1.45-.04.01-.09.01-.14.01h-5c-.55 0-1-.45-1-1s.45-1 1-1h5c.38 0 .72.22.88.54z"></path><path d="m8 6h-4c-.552 0-1-.448-1-1s.448-1 1-1h4c.552 0 1 .448 1 1s-.448 1-1 1z"></path></g><path d="m17.25 24c-3.722 0-6.75-3.028-6.75-6.75s3.028-6.75 6.75-6.75 6.75 3.028 6.75 6.75-3.028 6.75-6.75 6.75z" fill="#272727"></path><path d="m17.25 21c-.552 0-1-.448-1-1v-5.5c0-.552.448-1 1-1s1 .448 1 1v5.5c0 .552-.448 1-1 1z" fill="#fff"></path><path d="m20 18.25h-5.5c-.552 0-1-.448-1-1s.448-1 1-1h5.5c.552 0 1 .448 1 1s-.448 1-1 1z" fill="#fff"></path></svg>
                                                <h3>Drag Translate anywhere to Upload</h3>
                                                <p><small>Supported Format ( pdf | rtf | srt | tsv | xlsx | xls | csv | doc | txt | docx )</small></p>
                                                <Form.Control
                                                    type="file"
                                                    name="upload"
                                                    accept=".pdf,.rtf,.srt,.tsv,.xlsx,.xls,.csv,.doc,.txt,.docx"
                                                    ref={fileInputRef}
                                                    required
                                                    id="upload-docs"
                                                    onChange={handleFileChange} // Attach the handler here
                                                />
                                            </label>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>Project title</Form.Label>
                                            <Form.Control type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Project name" required />
                                        </Form.Group>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>Due Date</Form.Label>
                                            <Form.Control type="date" name="due_date" value={formData.due_date} onChange={handleInputChange} placeholder="DD/MM/YYYY" />
                                        </Form.Group>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>Translation Tasks</Form.Label>
                                            <div className="form-check-group">
                                            <Form.Check
                                                type='checkbox'
                                                id='check-script'
                                                inline
                                                label='Script'
                                                value='Script'
                                                onChange={handleCheckboxChange}
                                                checked={formData.tasks.includes('Script')} // Bind to state
                                            />
                                            <Form.Check
                                                type='checkbox'
                                                inline
                                                id='check-Consideration'
                                                label='Consideration Pathway'
                                                value='Consideration Pathway'
                                                onChange={handleCheckboxChange}
                                                checked={formData.tasks.includes('Consideration Pathway')} // Bind to state
                                            />
                                            <Form.Check
                                                type='checkbox'
                                                id='check-Headline'
                                                inline
                                                label='Headline/CTA'
                                                value='Headline/CTA'
                                                onChange={handleCheckboxChange}
                                                checked={formData.tasks.includes('Headline/CTA')} // Bind to state
                                            />
                                            <Form.Check
                                                type='checkbox'
                                                inline
                                                id='check-General'
                                                label='General Document'
                                                value='General Document'
                                                onChange={handleCheckboxChange}
                                                checked={formData.tasks.includes('General Document')} // Bind to state
                                            />
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>Languages</Form.Label>
                                            <Select
                                                name="lang"
                                                options={options}
                                                isMulti
                                                className="form-control"
                                                value={options.filter(option => formData.lang.includes(option.value))}
                                                onChange={handleLangChange}
                                                menuPlacement="auto"
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>Translator Users</Form.Label>
                                            <Select
                                                name="users"
                                                options={users} // Populate dropdown with transformed users
                                                isMulti
                                                className="form-control"
                                                value={users.filter((option) => formData.users.includes(option.value))} // Filter selected values
                                                onChange={handleUsersChange}
                                                menuPlacement="auto"
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3 form-group">
                                            <Form.Label>Descriptions</Form.Label>
                                            <Form.Control as="textarea" name="desc" value={formData.desc} onChange={handleInputChange} rows={4} placeholder="Add a descriptions.." />
                                        </Form.Group>

                                        <Form.Group className="mb-0 text-right form-group">
                                            <Button variant="primary" type="submit">
                                                Create Project
                                                {spinnerloading && (
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
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default AddTranslatorProject;
