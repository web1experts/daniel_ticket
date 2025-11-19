import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Button, Form, Spinner, Tabs, Tab, ListGroup } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';
import './translatorStyle.css';
import '../../App.css';
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SidebarPanel from "../Sidebar/Sidebar";
import { UpdateTranslator, EditTranslator, createTranslator, DeleteTranslator, CreateComment, ListComment } from "~/store/slices/translator/action";

import { filterMember } from "~/store/slices/user_role/action";
import toast, { Toaster } from 'react-hot-toast';
import TranslatorSidebarPanel from "./translatorSidebar";
import EditLanguageProject from "./EditLanguageProject";
import DownloadLanguageProject from "./DownloadLanguageProject";

function EditTranslatorProject() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [refreshSignal, setRefreshSignal] = useState(false);
    const [commentValue, setCommentValue] = useState(""); 
    const [genesisComments, setGenesisComments] = useState([]);
    const [loadFirstTime, setLoadFirstTime] = useState<boolean>(true);
    const [spinnerloading, setSpinnerLoading] = useState<boolean>(false);
    const [spinnerloadingcomment, setSpinnerLoadingComment] = useState<boolean>(false);
    const [users, setUsers] = useState([]);
    const { data, api_status, isAuthenticated } = useSelector((state: any) => state.translator);
    const apiResult = useSelector((state: any) => state.user);
    const fileInputRef = useRef(null); // Reference for file input
    const [formData, setFormData] = useState({
        trans_id: '',
        title: '',
        due_date: '',
        tasks: '', // Store selected checkboxes
        content: '',
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


    const handleCommentChange= (e) => {
        const { name, value } = e.target;
        setCommentValue(value);
    }

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
        
        try {
            if (!file) {
                const formButton = e.nativeEvent.submitter; // This gives you the button that triggered the form submission
                const buttonName = formButton.getAttribute("name");
                
                if(buttonName=="updateProject"){
                    const formDataToSend = {
                        trans_id: formData.trans_id,
                        title: formData.title,
                        due_date: formData.due_date,
                        tasks: formData.tasks,
                        lang: formData.lang,
                        users: formData.users,
                        content: formData.content,
                        desc: formData.desc
                    }
                    //console.log(formDataToSend);
                    setSpinnerLoading(true);
                    dispatch(UpdateTranslator(formDataToSend));
                }

                if(buttonName=="postComment"){
                    if(commentValue) { 
                        const rawData = localStorage.getItem('user');
                        const result = rawData ? JSON.parse(rawData) : {};
                        const commentData = {
                            comment: commentValue,
                            type: "translator",
                            type_id: formData.trans_id,
                            type_name: formData.title,
                            user_id: result.user_id,
                            user_name: result.data,
                        }
                        setSpinnerLoadingComment(true);
                        dispatch(CreateComment(commentData));
                    } else {
                        toast.error("Comment field is required field.");
                    } 
                } 
            } else {
                const formDataToSend = new FormData(); // Create a FormData object
                formDataToSend.append("trans_id", formData.trans_id);
                formDataToSend.append("title", formData.title);
                formDataToSend.append("due_date", formData.due_date);
                formDataToSend.append("tasks", formData.tasks); // Send tasks as a JSON string
                formDataToSend.append("lang", formData.lang); // Send languages as a JSON string
                formDataToSend.append("users", formData.users); // Send languages as a JSON string
                formDataToSend.append("desc", formData.desc);
                formDataToSend.append("comments", formData.comments);
                formDataToSend.append("status", "active");
                formDataToSend.append("upload", file); // Attach the binary file
                dispatch(createTranslator(formDataToSend));  //I have added the code in node js If trans_id will send to the code then its behaviour change it will update the record otherwise it will create the record.
            }
        } catch (error) {
            toast.error("An error occurred while creating the project.");
        }
    };



    const formatDateForInput = (isoDate) => {
        if (!isoDate) return ''; // Handle empty case
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2 digits
        const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
        return `${year}-${month}-${day}`; // Format as yyyy-MM-dd
    };


    const deleteTranslate = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this translator!",
            icon: "warning",
            buttons: ["Cancel", "Delete"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                // Call the onDelete function or API to delete the item
                dispatch(DeleteTranslator({ trans_id: id }));
            }
        });

    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const trans_id = queryParams.get('trans_id');
        if (trans_id && loadFirstTime) {
            const data = { "trans_id": trans_id };
            dispatch(EditTranslator(data));

            const filter = { "role": "translator" };
            dispatch(filterMember(filter));

            const filter_comments= {'type': "translator", "type_id": trans_id}
            dispatch(ListComment(filter_comments));
        }
    }, [dispatch, loadFirstTime]);


    useEffect(() => {
        if (api_status === 201 && isAuthenticated) {
            setFormData({
                trans_id: data._id,
                title: data.title,
                due_date: data.due_date,
                tasks: data.tasks, // Store selected checkboxes
                content: data.content,
                lang: data.lang,
                users: data.users,
                desc: data.desc,
                comments: data.comments
            });
            console.log(formData);
            setSpinnerLoading(false);
        } else if (api_status === 208 && isAuthenticated) {
            setCommentValue("");
            const filter_comments= {'type': "translator", "type_id": formData.trans_id}
            setSpinnerLoadingComment(false);
            dispatch(ListComment(filter_comments));
        } else if (api_status === 209 && isAuthenticated) {
            setGenesisComments(data);
            setSpinnerLoading(false);
            setCommentValue("");
        } else if (api_status === 202 && isAuthenticated) {
            toast.success("Project Updated successfully!");
            setRefreshSignal(true);
            //navigate("/translators");
            // setFormData({
            //     trans_id: data._id,
            //     title: data.title,
            //     due_date: data.due_date,
            //     tasks: data.tasks, // Store selected checkboxes
            //     content: data.content,
            //     lang: data.lang,
            //     users: data.users,
            //     comments: data.comments
            // });
            setSpinnerLoading(false);
        } else if (data && data.length > 0 && api_status === 203 && isAuthenticated) {
            //navigate("/translators");
        }


        if (apiResult.status == "idle") {
            if (apiResult.data.status == 204) {
                const transformedUsers = (apiResult.data.data || []).map((user) => ({
                    value: user._id, // Set value to _id
                    label: user.name, // Set label to name
                }));
                setUsers(transformedUsers);
            }
        }
    }, [data, api_status, isAuthenticated, setFormData, apiResult]);



    const timeAgo = (timestamp) => {
        const now = new Date();
        const past = new Date(timestamp);
        const diffInSeconds = Math.floor((now - past) / 1000);
    
        if (diffInSeconds < 60) {
            return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
        }
        
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
        }
        
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
        }
        
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 30) {
            return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
        }
        
        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) {
            return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
        }
        
        const diffInYears = Math.floor(diffInMonths / 12);
        return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
    };

    return (
        <>
            <TranslatorSidebarPanel />
            <div className="content__container translator--page">
                <Toaster position="top-right" reverseOrder={false} />
                <Container fluid>
                    <Row>
                        <Col sm={12} className="mb-4">
                            <h2>
                                <Button className="back--arrow mr-3 px-0" variant="link" href="/translators">
                                    <span><BsArrowLeft /></span>
                                </Button>
                                {formData.title}
                            </h2>
                        </Col>

                        <Col sm={12}>
                            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                                <Row>
                                    <Col sm={12}>
                                        <Tabs defaultActiveKey="edit">
                                            <Tab eventKey="edit" title="Project Details">
                                                <Row>
                                                    <Col md={6}>
                                                        <Form.Group className="mb-3 form-group">
                                                            <Form.Label>Project title</Form.Label>
                                                            <Form.Control type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Project name" required />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3 form-group">
                                                            <Form.Label>Due Date</Form.Label>
                                                            <Form.Control
                                                                type="date"
                                                                name="due_date"
                                                                onChange={handleInputChange}
                                                                value={formatDateForInput(formData.due_date)} // Format date for input
                                                                placeholder="DD/MM/YYYY"
                                                            />
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
                                                                    checked={Array.isArray(formData.tasks) && formData.tasks.includes('Script')}
                                                                />
                                                                <Form.Check
                                                                    type='checkbox'
                                                                    inline
                                                                    id='check-Consideration'
                                                                    label='Consideration Pathway'
                                                                    value='Consideration Pathway'
                                                                    onChange={handleCheckboxChange}
                                                                    checked={Array.isArray(formData.tasks) && formData.tasks.includes('Consideration Pathway')}
                                                                />
                                                                <Form.Check
                                                                    type='checkbox'
                                                                    id='check-Headline'
                                                                    inline
                                                                    label='Headline/CTA'
                                                                    value='Headline/CTA'
                                                                    onChange={handleCheckboxChange}
                                                                    checked={Array.isArray(formData.tasks) && formData.tasks.includes('Headline/CTA')}
                                                                />
                                                                <Form.Check
                                                                    type='checkbox'
                                                                    inline
                                                                    id='check-General'
                                                                    label='General Document'
                                                                    value='General Document'
                                                                    onChange={handleCheckboxChange}
                                                                    checked={Array.isArray(formData.tasks) && formData.tasks.includes('General Document')}
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
                                                                value={options.filter(option => formData.lang?.includes(option.value))}
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
                                                                value={
                                                                    users.filter((option) =>
                                                                        Array.isArray(formData.users) ? formData.users.includes(option.value) : false
                                                                    )
                                                                }
                                                                onChange={handleUsersChange}
                                                                menuPlacement="auto"
                                                            />
                                                        </Form.Group>

                                                        <Form.Group className="mb-3 form-group">
                                                            <Form.Label>Description</Form.Label>
                                                            <Form.Control as="textarea" name="desc" value={formData.desc} onChange={handleInputChange} rows={5} placeholder="Add a comment.." />
                                                        </Form.Group>
                                                        

                                                            <Form.Group className="mb-0 text-right form-group pb-5 mt-3">
                                                                <Button variant="primary" className="mr-2" type="submit" name="updateProject">
                                                                    Update Project
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
                                                                {/* <Button href={`/edit-language?trans_id=${formData.trans_id}`} variant="secondary" type="submit">Translation</Button> */}
                                                                <Button className="ml-2" variant="danger" onClick={() => deleteTranslate(data._id)}>Delete</Button>
                                                            </Form.Group>
                                                       
                                                    </Col>
                                                    <Col sm={6}>
                                                        <div className="translate--comments">
                                                            <ListGroup id='comments'>
                                                                {genesisComments.map((comentdt, index) => (
                                                                
                                                                    <ListGroup.Item>
                                                                        <div className='user--img'>
                                                                            <img src='images/style13.png' />
                                                                            <h3>{comentdt.user_name} <small>{timeAgo(comentdt.updatedAt)}</small></h3>
                                                                        </div>
                                                                        <div className='user--entry'>
                                                                            <p>{comentdt.comment}</p>
                                                                        </div>
                                                                    </ListGroup.Item>
                                                                ))}
                                                            </ListGroup>

                                                            <Form.Group className="mt-0 comments_area">
                                                                <Form.Label>Comments</Form.Label>
                                                                <Form.Control as="textarea" name="comments" value={commentValue} onChange={handleCommentChange} rows={5} />
                                                            
                                                                <Button variant="primary" className="mr-2 mt-3" name="postComment" type="submit">
                                                                    Post Comment
                                                                    {spinnerloadingcomment && (
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
                                                        </div>

                                                        
                                                    </Col>
                                                    
                                                </Row>
                                            </Tab>

                                            <Tab eventKey="translation" title="Translation">
                                                <EditLanguageProject refreshSignal={refreshSignal} setRefreshSignal={setRefreshSignal} />
                                            </Tab>

                                            <Tab eventKey="translation_download" title="Update">
                                                <DownloadLanguageProject/>
                                            </Tab>
                                        </Tabs>
                                    </Col>
                                    {/* <Col md={6}>
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
                                                    id="upload-docs"
                                                    onChange={handleFileChange} // Attach the handler here
                                                />
                                            </label>
                                        </Form.Group>
                                    </Col> */}
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default EditTranslatorProject;
