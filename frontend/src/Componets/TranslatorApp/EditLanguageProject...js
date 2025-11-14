import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Button, Form, Spinner, ListGroup, Navbar, Nav, ButtonGroup, Dropdown, Modal } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';
import { HiDotsVertical } from "react-icons/hi";
import './translatorStyle.css';
import { FaChevronRight } from "react-icons/fa";
import '../../App.css';
import * as XLSX from 'xlsx';

import { jsPDF } from "jspdf";


import { useNavigate } from "react-router-dom";
import SidebarPanel from "../Sidebar/Sidebar";
import { UpdateTranslator, EditTranslator, translator_language_API } from "~/store/slices/translator/action";
import { filterMember } from "~/store/slices/user_role/action";
import TranslatorSidebarPanel from "./translatorSidebar";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
 
//function EditLanguageProject() {
const EditLanguageProject = ({ refreshSignal, setRefreshSignal }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Transtype, setTranstype] = useState("ai");


    const [startTimes, setStartTimes] = useState([]);
    const [considerationBox, setConsiderationBox] = useState([]);

    const [spinnerloading, setSpinnerLoading] = useState(false);
    const [btn1spinnerloading, setBtn1SpinnerLoading] = useState(false);
    const [btn2spinnerloading, setBtn2SpinnerLoading] = useState(false);
    const [isRefresh, setIsRefresh] = useState<boolean>(true);

    const [isCheckConsideration, setisCheckConsideration]= useState<boolean>(false);

    const [editHandling, setEditHandling] = useState<boolean>(true);

    const [translationLoading, setTranslationLoading] = useState(false);
    const [translatedSentences, setTranslatedSentences] = useState([]);
    const [editedSentence, setEditedSentence] = useState([]);
    const [languageCode, setLanguageCode] = useState("");
    const [EngLabelContent, setEngLabelContent] = useState("");

    const [switcherState, setSwitcherState] = useState(false);

    const [translatedlanguagecontent, setTranslatedLanguageContent] = useState("");
    const [selectedLanguageCode, setSelectedLanguageCode] = useState("");
    
    const [isExport, setIsExport]= useState(false);

    const [isMoreRow, setMoreRows]= useState(false);

    
    const [showModal, setShowModal] = useState(false);
    const [EditAISentence, setEditAISentence] = useState("");
    const [EditMTSentence, setEditMTSentence] = useState("");
    const [EditAIIndex, setEditAIIndex] = useState(null);

    const { data, api_status, isAuthenticated } = useSelector((state: any) => state.translator);
    const [formData, setFormData] = useState({
        trans_id: '',
        title: '',
        content: '',
        other: ''
    });

    const languages = [
        { code: "", name: "Select Language" },
        { code: "sqi_Latn", name: "Albanian" },
        { code: "pes_Arab", name: "Farsi (Persian)" },
        { code: "ita_Latn", name: "Italian" },
        { code: "jpn_Jpan", name: "Japanese" },
        { code: "lit_Latn", name: "Lithuanian" }
    ];

    

    const renderManualInputFields = () => {
        const handleInputChange = (value, index) => {
            const updatedSentences = [...EditMTSentence];
            updatedSentences[index] = value; // Update the specific index
            setEditMTSentence(updatedSentences); // Update the state
        };
        
        return (
            <div className="list--size">
                {editedSentence.map((sentence, index) => (
                    <Form.Control
                        key={index}
                        type="text"
                        placeholder={`Edit sentence ${index + 1}`}
                        value={EditMTSentence[index] || ""} // Render current value or empty if not set
                        onChange={(e) => handleInputChange(e.target.value, index)}
                    />
                ))}
            </div>
        );
    };
    
    

    const handleSelectChange = (e) => {
        const selectedLanguageCode = e.target.value.trim(); // Get the selected language code and trim any spaces
        setLanguageCode(selectedLanguageCode);
        const languageData = fillObjectsData(selectedLanguageCode);
    };


    const handleSwitcherChange = (e) => {
        setSwitcherState((prevState) => !prevState);
    };


    const fillObjectsData = (languageCode) => {
        if (translatedlanguagecontent && translatedlanguagecontent.length > 0) {

            setIsExport(false);
            
            // Find the object that contains the selected language code
            const matchingLanguage = translatedlanguagecontent.find(
                (item) => item[languageCode] !== undefined
            );
    
            if (matchingLanguage) {
                setIsExport(true);
                const selectedData = matchingLanguage[languageCode];
                
                // Update the states with the found data
                setLanguageCode(selectedData.lang_code);
                setTranstype(selectedData.trans_type);
    
                if (selectedData.trans_type === "ai") {
                    setTranslatedSentences(selectedData.content || []);
                } else {
                    setEditMTSentence(selectedData.content || []);
                }
                return selectedData; // Return the found data if needed
            }
        }
    
        // Reset states if no matching data is found
        setTranslatedSentences([]);
        setEditMTSentence([]);
        return null; // Return null for no data
    };
    

    const translateLangfunc = async () => {
        const trans_type = "ai"; // Define the second value
        setTranstype(trans_type);
        translateSentences(languageCode, trans_type);
    }
    
    const translateManualfunc = async () => {
        const trans_type = "manual"; // Define the second value
        setTranstype(trans_type);
        translateSentences(languageCode, trans_type);
    }


    const translateSentences = async (selectedLanguageCode, trans_type) => {
        try {
            
            if(trans_type=="ai"){
                setTranslationLoading(true);
                setTranslatedSentences([]); // Clear the previous translations for a fresh start
                const API_data= {
                    "lang_code": languageCode, 
                    "content": editedSentence
                };
                setSpinnerLoading(true);
                dispatch(translator_language_API(API_data));
            } else {
                return renderManualInputFields();
            }
        } catch (error) {
            console.error("Error translating sentences:", error);
            toast.error("Failed to translate content.");
        } finally {
            setTranslationLoading(false);
        }
    };

    const renderScriptContent = () => {
        const sentences = editedSentence;
        return (
            <ListGroup className="list--size">
                {sentences.map((group, index) => {
                    // Check if group is not null/undefined and ensure it ends with a dot
                    const content = group && typeof group === "string"
                        ? group.trim().endsWith(".") 
                            ? group 
                            : `${group.trim()}.` 
                        : group; // Keep group unchanged if it's not a string
                    return <ListGroup.Item key={index}>
                        {content}
                        <Dropdown>
                            <Dropdown.Toggle as="span" className="dots-icon">
                                <HiDotsVertical style={{ cursor: 'pointer' }} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu align="end">
                                <Dropdown.Item onClick={() => handleEdit(content, index, "main")}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDelete(index, "main")}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>    
                    </ListGroup.Item>;
                })}
            </ListGroup>
        );
    };
    



    const handleConsiderationContent = (e, index) => {
        const updatedStartTimes = [...considerationBox];
        updatedStartTimes[index] = e.target.value;
        setConsiderationBox(updatedStartTimes); // Ensure you have a state variable for startTimes
    };
    
    


    const renderScriptInputFields = () => {
        const sentences = editedSentence;
        
        return (
            <>
            <h4 className="mt-2">Consideration Pathway</h4>
            <div className="script-input-fields">
                {sentences.map((group, index) => (
                    <div key={index} className="script-field">
                        <div className="time-inputs">
                            <label>
                                <input
                                    type="text"
                                    name={`startTime-${index}`}
                                    placeholder={`Edit Box ${index+1}`}
                                    className="form-control time-input"
                                    value={considerationBox[index]}
                                    onChange={(e) => handleConsiderationContent(e, index)}
                                />
                            </label>
                        </div>
                    </div>
                ))}
            </div>
            </>
        );
    };


    const renderTranslatedContent = () => {
        return (
            <ListGroup className="list--size">
                {translatedSentences.map((sentence, index) => (
                    <ListGroup.Item key={index}>
                        {sentence} {/* Render each translated sentence */}


                        <Dropdown>
                            <Dropdown.Toggle as="span" className="dots-icon">
                                <HiDotsVertical style={{ cursor: 'pointer' }} />
                            </Dropdown.Toggle>

                            <Dropdown.Menu align="end">
                                <Dropdown.Item onClick={() => handleEdit(sentence, index, "translated")}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDelete(index, "translated")}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ListGroup.Item>
                ))}
                {translationLoading && <Spinner animation="border" size="sm" />} {/* Show spinner during translation */}
            </ListGroup>
        );
    };


    const handleEdit = (sentence, index, type) => {
        setEngLabelContent("");
        setEditHandling(type);
        if(type=="translated"){
            setEngLabelContent(editedSentence[index]);
            setEditAISentence(sentence);  // Set the current sentence to edit
            setEditAIIndex(index);        // Set the index of the sentence being edited
            setShowModal(true);         // Open the modal
        } else {
            setEditAISentence(sentence);  // Set the current sentence to edit
            setEditAIIndex(index);        // Set the index of the sentence being edited
            setShowModal(true);         // Open the mo
        }
    };


   

    const handleDelete = (index, type) => {
        if(type=="translated"){
            // Clone the current translated sentences to avoid direct mutation
            const updatedSentences = [...translatedSentences];
            // Remove the sentence at the specified index
            updatedSentences.splice(index, 1);
            // Update the state with the modified sentences
            setTranslatedSentences(updatedSentences);
        } else {
            // Clone the current translated sentences to avoid direct mutation
            const updatedSentences = [...editedSentence];
            // Remove the sentence at the specified index
            updatedSentences.splice(index, 1);
            // Update the state with the modified sentences
            setEditedSentence(updatedSentences);
        }
    }


    const handleSaveEdit = () => {
        if(editHandling=="translated"){
            const updatedSentences = [...translatedSentences];
            updatedSentences[EditAIIndex] = EditAISentence.trim();
            setTranslatedSentences(updatedSentences);
        } else {
            const updatedSentences = [...editedSentence];
            updatedSentences[EditAIIndex] = EditAISentence.trim();
            setEditedSentence(updatedSentences);
        }
        setEditAISentence("");
        setEngLabelContent("");
        setEditAIIndex(null);
        setShowModal(false);
    };



    const handleSaveTrans = async (e, status) => {
        e.preventDefault();
        const queryParams = new URLSearchParams(location.search);
        const trans_id = queryParams.get('trans_id');
        let trans_save= "";

        if(Transtype=="ai"){
            trans_save = { 
                "trans_id": trans_id,
                "other" : {
                    [languageCode]: {
                        "content": translatedSentences,
                        "lang_code": languageCode,
                        "trans_type":Transtype
                    },
                    "consideration_content":considerationBox
                }
            };
        } else {
            trans_save = { 
                "trans_id": trans_id, 
                "other" : {
                    [languageCode]: {
                        "content": EditMTSentence,
                        "lang_code": languageCode,
                        "trans_type":Transtype
                    }
                }
            };
        }

        if(status=="submit"){
            //setBtn2SpinnerLoading(true);
        } else {
            setBtn1SpinnerLoading(true);
            trans_save["status"]= status
        }

        
        if(switcherState){
            trans_save["consideration"]= considerationBox;
        } else {
            trans_save["consideration"]= [];
        }

        if(isMoreRow){
            const dotSeparatedString = convertToDotSeparatedString(editedSentence);
            trans_save["content"]= dotSeparatedString;
        }
        

        dispatch(UpdateTranslator(trans_save));
    }



    const convertToDotSeparatedString = (sentences) => {
        // Ensure each sentence ends with a dot
        const processedSentences = sentences.map(sentence => {
            return sentence.trim().endsWith('.') ? sentence.trim() : `${sentence.trim()}.`;
        });
    
        // Join the processed sentences into a single string with spaces
        return processedSentences.join(' ');
    };
    

    
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const trans_id = queryParams.get('trans_id');

        if (trans_id && refreshSignal) {
            const requestData = { trans_id };
            dispatch(EditTranslator(requestData));
            setRefreshSignal(false);
        }
    }, [dispatch, refreshSignal, setRefreshSignal]);

    useEffect(() => {
        if (api_status === 201 && isAuthenticated) {
            if (data.tasks?.includes("Consideration Pathway")) {
                setisCheckConsideration(true);
            } else {
                setisCheckConsideration(false);
            }

            // Update form data
            setFormData({
                trans_id: data._id,
                title: data.title,
                content: data.content,
                other: data.other,
            });

            if (Array.isArray(data.consideration) && data.consideration.length !== 0) {
                setSwitcherState(true);
                setConsiderationBox(data.consideration);
            } else {
                setSwitcherState(false);
            }
            
            // Set translated language content
            if (data.other) {
                setTranslatedLanguageContent(data.other);
            }

            // Set initial language codes
            if (data.lang) {
                const firstlang= data.lang[0];
                setSelectedLanguageCode(data.lang);
                setLanguageCode(firstlang);
                
                if (data.other) {
                    const matchingLanguage = data.other.find(
                        (item) => item[firstlang] !== undefined
                    );

                    if (matchingLanguage) {
                        const selectedData = matchingLanguage[firstlang];
                        setTranstype(selectedData.trans_type);
                        setIsExport(true);
                        if (selectedData.trans_type === "ai") {
                            setTranslatedSentences(selectedData.content || []);
                        } else {
                            setEditMTSentence(selectedData.content || []);
                        }
                    }
                }
            }
    
            
    
            // Split content into sentences and set edited sentences
            const sentences = data.content?.split('.').map(sentence => sentence.trim()).filter(Boolean) || [];
            setEditedSentence(sentences);
        } else if (api_status === 202 && isAuthenticated) {
            setBtn1SpinnerLoading(false);
            setBtn2SpinnerLoading(false);
            //toast.success("Trans Project Updated successfully!");
        } else if (api_status === 205 && isAuthenticated) {
            setSpinnerLoading(false);
            setTranslatedSentences(data);
            renderTranslatedContent();
        }
    }, [data, api_status, isAuthenticated]);


    const handleAddRow = () => {
        // Append a blank array to `editedSentence`
        setEditedSentence((prevSentences) => [...prevSentences, []]);
        if (Transtype === "ai") {
            setTranslatedSentences((prevTranslatedSentences) => [...prevTranslatedSentences, []]); // Append a blank array
        } else {
            setEditMTSentence((prevEditMTSentence) => [...prevEditMTSentence, ""]); // Append a blank string for `EditMTSentence`
        }

        setMoreRows(true);
    };
    


    return (
        <>
            {/* <TranslatorSidebarPanel /> */}
            {/* <Toaster position="top-right" reverseOrder={false} /> */}
            <div className="Translation--page">
                    <Row>
                        {/* <Col sm={12} className="mb-4">
                            <h2>
                                <Button
                                    className="back--arrow mr-3 px-0"
                                    variant="link"
                                    href={`/edit-translators?trans_id=${formData.trans_id}`}
                                >
                                    <span><BsArrowLeft /></span>
                                </Button>
                                {formData.title}
                            </h2>
                        </Col> */}

                        {switcherState &&
                        <Col sm={12} lg={3}>
                            {renderScriptInputFields()}
                        </Col>
                        }


                        <Col sm={12} lg={switcherState ? 4 : 6}>
                            <h4>
                                <div className="switcher-container">
                                    English

                                    {isCheckConsideration && (
                                        <>
                                        <label className="switch switch mt-2">
                                            <input 
                                                type="checkbox" 
                                                checked={switcherState} 
                                                onChange={handleSwitcherChange} 
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                        <span>{switcherState ? "Show" : "Hide"}</span>
                                        </>
                                    )}
                                </div>
                            </h4>
                            
                            {formData.content
                                ? renderScriptContent()
                                : <p>Loading script...</p>}
                        </Col>

                        


                        {/* <Col sm={12} lg={2} className="text-center d-flex align-items-center">
                            <span className="translate__arrow"><FaChevronRight /></span>
                        </Col> */}


                        <Col sm={12} lg={switcherState ? 4 : 6} className="mt-4 mt-md-0">
                            <div className="form-group d-flex translated_area">
                                <Form.Select
                                    className="form-control mb-0"
                                    onChange={handleSelectChange} // Update state on change
                                    value={languageCode}
                                >
                                    {languages
                                        .filter(language => selectedLanguageCode.includes(language.code)) // Filter matching languages
                                        .map(filteredLanguage => (
                                            <option key={filteredLanguage.code} value={filteredLanguage.code}>
                                                {filteredLanguage.name}
                                            </option>
                                        ))}
                                </Form.Select>
                                <Dropdown className="mb-0 ml-3">
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">Translate</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={translateLangfunc}>Translate with AI</Dropdown.Item>
                                        <Dropdown.Item onClick={translateManualfunc}>Manual Translations</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                                
                                {spinnerloading && (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="spinner--circle"
                                    >
                                        <span className="sr-only">Please Wait...</span>
                                    </Spinner>
                                )}
                            {Transtype === "ai" ? (
                                renderTranslatedContent() // Show AI-generated sentences
                            ) : Transtype === "manual" ? (
                                renderManualInputFields() // Show manual input fields for editing
                            ) : (
                                <p></p>
                            )}
                        </Col>

                        <Col sm={12} className="fixed--bottom mt-3 text-center">
                            <button className="btn btn-info" onClick={handleAddRow}>Add More Row</button>
                        </Col>

                        <Col sm={12} className="fixed--bottom mt-3">
                            <ButtonGroup className="justify-content-end d-flex">
                                <Button variant="primary" className="mr-2" onClick={(e) => handleSaveTrans(e, 'submit')}>
                                    Submit
                                    {/* {btn1spinnerloading && (
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="ml-3 mt-2"
                                        >
                                            <span className="ml-3 mt-2 sr-only">Please Wait...</span>
                                        </Spinner>
                                    )} */}
                                </Button>

                                <Form.Group className="form-group mb-0">
                                    <Form.Control type="checkbox" name="complete" id="mark-complete" hidden />
                                    <label className="mark--complete" onClick={(e) => handleSaveTrans(e, 'completed')} title="Mark as Completed" for="mark-complete"></label>
                                </Form.Group>

                                
                                
                            </ButtonGroup>
                        </Col>
                    </Row>
                {/* Edit Modal */}
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header>
                        <Modal.Title>Edit Sentence</Modal.Title>
                        <button type="button" onClick={() => setShowModal(false)} className="btn-close" aria-label="Close">&times;</button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>{EngLabelContent}</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3} 
                                    value={EditAISentence} 
                                    onChange={(e) => setEditAISentence(e.target.value)} 
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSaveEdit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default EditLanguageProject;
