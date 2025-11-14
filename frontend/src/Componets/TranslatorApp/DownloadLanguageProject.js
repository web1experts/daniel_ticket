import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Button, Form, Spinner, ListGroup, Navbar, Nav, ButtonGroup, Dropdown, Modal } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';

import './translatorStyle.css';
import jsPDF from "jspdf";
import "jspdf-autotable";
//import "@fontsource/noto-sans-jp/files/noto-sans-jp-all-400-normal.woff2";
import { encode } from "base64-arraybuffer";
import * as XLSX from 'xlsx';

import '../../App.css';
import { useNavigate } from "react-router-dom";
import { UpdateTranslator, EditTranslator, translator_language_API } from "~/store/slices/translator/action";
import toast, { Toaster } from 'react-hot-toast';
 
function DownloadLanguageProject() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Transtype, setTranstype] = useState("ai");
    const [spinnerloading, setSpinnerLoading] = useState(false);
    const [loadingTime, setLoadingTime] = useState<boolean>(true);
    const [translatedSentences, setTranslatedSentences] = useState([]);
    const [englishSentence, setEnglishSentence] = useState([]);
    const [languageCode, setLanguageCode] = useState([]);

    const [selectedLang, setSelectedLang] = useState([]);

    const [isConsideration, setIsConsideration] = useState(false);
    const [considerationBox, setConsiderationBox] = useState([]);
    

    const [langContent, setLangContent] = useState("");
    const [EditMTSentence, setEditMTSentence] = useState("");
    const { data, api_status, isAuthenticated } = useSelector((state: any) => state.translator);
    const [languageCheckboxes, setLanguageCheckboxes] = useState([]);

    const languages = [
        { code: "", name: "Select Language" },
        { code: "en", name: "English" },
        { code: "sqi_Latn", name: "Albanian" },
        { code: "pes_Arab", name: "Farsi (Persian)" },
        { code: "ita_Latn", name: "Italian" },
        { code: "jpn_Jpan", name: "Japanese" },
        { code: "lit_Latn", name: "Lithuanian" }
    ];


    const getLanguagesWithContent = () => {
        // Ensure langContent and selectedLang exist and are arrays
        if (!Array.isArray(langContent) || !Array.isArray(selectedLang)) return [];
    
        // Map all selected languages
        return selectedLang.map((langCode) => {
            const langObj = langContent.find((content) => Object.keys(content)[0] === langCode);
            const hasContent = langObj && Object.values(langObj)[0]?.content?.length > 0;
    
            return {
                code: langCode,
                name: languages.find((lang) => lang.code === langCode)?.name || langCode, // Find language name, fallback to code
                hasContent: !!hasContent, // Boolean to check content presence
                status: hasContent ? "Completed" : "Pending", // Status text
            };
        });
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const trans_id = queryParams.get('trans_id');
        if (trans_id && loadingTime) {
            const requestData = { trans_id };
            dispatch(EditTranslator(requestData));
            setLoadingTime(false);
        }
    }, [dispatch, loadingTime]);

    useEffect(() => {
        if (api_status === 201 && isAuthenticated) {
            setSelectedLang(data.lang);
            if (data.other) {
                setLangContent(data.other);
            }


            if (Array.isArray(data.consideration) && data.consideration.length !== 0) {
                setIsConsideration(true);
                setConsiderationBox(data.consideration);
            } else {
                setIsConsideration(false);
            }

            const sentences = data.content?.split('.').map(sentence => sentence.trim()).filter(Boolean) || [];
            setEnglishSentence(sentences);
            
        } 
    }, [data, api_status, isAuthenticated]);


    useEffect(() => {
        if (Array.isArray(langContent) && langContent.length > 0) {
            const timeoutId = setTimeout(() => {
                try {
                    const updatedLanguages = getLanguagesWithContent();
                    setLanguageCheckboxes(updatedLanguages); // Update state with filtered languages
                } catch (error) {
                    console.error("Error updating languages:", error);
                    toast.error("Failed to update languages. Please try again.");
                }
            }, 500); // Adjust timeout as needed
    
            // Cleanup timeout on re-render or unmount
            return () => clearTimeout(timeoutId);
        } else {
            // If no langContent, set an empty array
            setLanguageCheckboxes([]);
        }
    }, [langContent, selectedLang]);



    const downloadTxtFile = async () => {
        try {
            if (languageCode.length === 0) {
                toast.error("Please select at least one language to download.");
                return;
            }
    
            let content = "";
    
            // Loop through selected languages
            languageCode.forEach((code) => {
                if (code === "en") {
                    // Add English sentences from englishSentence state
                    content += "English\n\n";
                    englishSentence.forEach((sentence, index) => {
                        content += `${index + 1}. ${sentence}\n`;
                    });
    
                    // Add Consideration Pathway if enabled
                    if (isConsideration && considerationBox.length > 0) {
                        content += "\nConsideration Pathway\n\n"; // Add section header
                        considerationBox.forEach((item, index) => {
                            content += `${index + 1}. ${item}\n`; // Add content from considerationBox
                        });
                    }
    
                    content += "\n"; // Add spacing between languages
                } else {
                    // Add other languages from langContent
                    const languageData = langContent.find((item) => Object.keys(item)[0] === code);
                    if (languageData) {
                        const { content: sentences = [] } = languageData[code];
                        const languageName = languages.find((lang) => lang.code === code)?.name || code;
                        content += `${languageName}\n\n`; // Add language name as the title
                        sentences.forEach((sentence, index) => {
                            content += `${index + 1}. ${sentence}\n`; // Add serial number and sentence
                        });
                        content += "\n"; // Add spacing between languages
                    }
                }
            });
    
            if (!content) {
                toast.error("No content found for the selected languages.");
                return;
            }
    
            // Create and download the file
            const element = document.createElement("a");
            const file = new Blob([content], { type: "text/plain;charset=utf-8" });
            element.href = URL.createObjectURL(file);
            element.download = `${Date.now()}.txt`;
            document.body.appendChild(element); // Required for FireFox
            element.click();
        } catch (e) {
            console.error(e);
            toast.dismiss();
            toast.error("Something went wrong, Please try again.");
        }
    };
    
    

    const downloadDocFile = async () => {
        try {
            if (languageCode.length === 0) {
                // Check if no language is selected and show a toast error
                toast.error("Please select at least one language to download.");
                return;
            }
    
            let content = "";
    
            // Loop through selected languages
            languageCode.forEach((code) => {
                if (code === "en") {
                    // Add English sentences from englishSentence state
                    content += "English\n\n";
                    englishSentence.forEach((sentence, index) => {
                        content += `${index + 1}. ${sentence}\n`;
                    });
    
                    // Add Consideration Pathway content if isConsideration is true
                    if (isConsideration && considerationBox.length > 0) {
                        content += "\nConsideration Pathway\n\n"; // Add section header
                        considerationBox.forEach((item, index) => {
                            content += `${index + 1}. ${item}\n`; // Add content from considerationBox
                        });
                    }
    
                    content += "\n"; // Add spacing between languages
                } else {
                    // Add other languages from langContent
                    const languageData = langContent.find(item => Object.keys(item)[0] === code);
                    if (languageData) {
                        const { content: sentences = [] } = languageData[code];
                        const languageName = languages.find(lang => lang.code === code)?.name || code;
                        content += `${languageName}\n\n`; // Add language name as the title
                        sentences.forEach((sentence, index) => {
                            content += `${index + 1}. ${sentence}\n`; // Add serial number and sentence
                        });
                        content += "\n"; // Add spacing between languages
                    }
                }
            });
    
            if (!content) {
                toast.error("No content found for the selected languages.");
                return;
            }
    
            // Create and download the file
            const element = document.createElement("a");
            const file = new Blob([content], { type: "application/msword;charset=utf-8" });
            element.href = URL.createObjectURL(file);
            element.download = `${Date.now()}.docx`;
            document.body.appendChild(element); // Required for Firefox
            element.click();
        } catch (e) {
            console.error(e);
            toast.dismiss();
            toast.error("Something went wrong, Please try again.");
        }
    };
    
    
    
    const downloadAsPDF = async () => {
        try {
            if (languageCode.length === 0) {
                toast.error("Please select at least one language to download.");
                return;
            }
    
            const doc = new jsPDF();
    
            // Add a title to the PDF
            doc.setFontSize(18);
            doc.text("Translated Content", 14, 20);
    
            let yPosition = 30; // Start Y position for the content
    
            // Loop through each selected language
            for (const code of languageCode) {
                const languageName = languages.find((lang) => lang.code === code)?.name || code;
    
                // Add a header for the language
                doc.setFontSize(16);
                doc.text(languageName, 14, yPosition);
                yPosition += 10;
    
                // Retrieve the content for the language
                const content =
                    code === "en"
                        ? englishSentence
                        : langContent.find((item) => Object.keys(item)[0] === code)?.[code]?.content || [];
    
                // Add the content with serial numbers
                doc.setFontSize(12);
                if (content.length > 0) {
                    content.forEach((sentence, index) => {
                        doc.text(`${index + 1}. ${sentence}`, 14, yPosition);
                        yPosition += 7;
    
                        // Move to a new page if the content overflows
                        if (yPosition > 280) {
                            doc.addPage();
                            yPosition = 20;
                        }
                    });
                } else {
                    doc.text("No content available.", 14, yPosition);
                    yPosition += 10;
                }
    
                // Add Consideration Pathway content if isConsideration is true and language is English
                if (code === "en" && isConsideration && considerationBox.length > 0) {
                    doc.setFontSize(14);
                    doc.text("Consideration Pathway", 14, yPosition);
                    yPosition += 10;
    
                    doc.setFontSize(12);
                    considerationBox.forEach((item, index) => {
                        doc.text(`${index + 1}. ${item}`, 14, yPosition);
                        yPosition += 7;
    
                        // Move to a new page if the content overflows
                        if (yPosition > 280) {
                            doc.addPage();
                            yPosition = 20;
                        }
                    });
    
                    yPosition += 10; // Add spacing after Consideration Pathway
                }
    
                yPosition += 10; // Add spacing between languages
            }
    
            // Save the PDF file
            doc.save(`${Date.now()}.pdf`);
        } catch (e) {
            console.error("Error generating PDF:", e);
            toast.dismiss();
            toast.error("Something went wrong, Please try again.");
        }
    };
    



    const downloadSRTFile = async () => {
        try {
            if (languageCode.length === 0) {
                // Show an error if no language is selected
                toast.error("Please select at least one language to download.");
                return;
            }
    
            let content = "";
    
            // Loop through selected languages
            languageCode.forEach((code) => {
                if (code === "en") {
                    // Add English sentences from englishSentence state
                    content += "English\n\n";
                    englishSentence.forEach((sentence, index) => {
                        // Format SRT subtitle block for English
                        content += `${index + 1}\n`;
                        content += `00:00:${index.toString().padStart(2, "0")},000 --> 00:00:${(index + 1).toString().padStart(2, "0")},000\n`;
                        content += `${sentence}\n\n`;
                    });
    
                    // Add Consideration Pathway if enabled
                    if (isConsideration && considerationBox.length > 0) {
                        content += "Consideration Pathway\n\n";
                        considerationBox.forEach((item, index) => {
                            const startTime = index + englishSentence.length; // Adjust start time
                            content += `${startTime + 1}\n`;
                            content += `00:00:${startTime.toString().padStart(2, "0")},000 --> 00:00:${(startTime + 1).toString().padStart(2, "0")},000\n`;
                            content += `${item}\n\n`;
                        });
                    }
                } else {
                    // Add other languages from langContent
                    const languageData = langContent.find(item => Object.keys(item)[0] === code);
                    if (languageData) {
                        const { content: sentences = [] } = languageData[code];
                        const languageName = languages.find(lang => lang.code === code)?.name || code;
                        content += `${languageName}\n\n`; // Add language name as the title
                        sentences.forEach((sentence, index) => {
                            // Format SRT subtitle block for the language
                            content += `${index + 1}\n`;
                            content += `00:00:${index.toString().padStart(2, "0")},000 --> 00:00:${(index + 1).toString().padStart(2, "0")},000\n`;
                            content += `${sentence}\n\n`;
                        });
                    }
                }
            });
    
            if (!content.trim()) {
                toast.error("No content available for the selected languages.");
                return;
            }
    
            // Create and download the SRT file
            const element = document.createElement("a");
            const file = new Blob([content], { type: "text/srt;charset=utf-8" });
            element.href = URL.createObjectURL(file);
            element.download = `${Date.now()}.srt`;
            document.body.appendChild(element); // Required for FireFox
            element.click();
        } catch (e) {
            console.error("Error generating SRT file:", e);
            toast.dismiss();
            toast.error("Something went wrong, Please try again.");
        }
    };
    
    
    

    const downloadXLSXFile = async () => {
        try {
            if (languageCode.length === 0) {
                toast.error("Please select at least one language to download.");
                return;
            }
    
            // Prepare the headers dynamically based on isConsideration
            let headers = ["Serial No"];
            if (isConsideration) {
                headers.push("Consideration Pathway");
            }
            headers.push("English");
    
            const languageNames = languageCode
                .filter((code) => code !== "en") // Exclude "en" since it's explicitly added
                .map((code) => languages.find((lang) => lang.code === code)?.name || code);
            headers.push(...languageNames); // Add other language names
    
            // Prepare data for rows
            const rows = [];
            rows.push(headers); // Add headers as the first row
    
            // Determine the max number of rows (sentences + consideration pathway items)
            const maxRows = Math.max(
                isConsideration ? considerationBox.length : 0,
                englishSentence.length,
                ...languageCode.map((code) => {
                    const langData = langContent.find((item) => Object.keys(item)[0] === code);
                    return langData ? langData[code].content.length : 0;
                })
            );
    
            // Loop through the max number of rows and build rows
            for (let i = 0; i < maxRows; i++) {
                const row = [i + 1]; // Serial number
    
                // Add Consideration Pathway content if isConsideration is true
                if (isConsideration) {
                    const consideration = considerationBox[i] || ""; // Handle missing Consideration Pathway items
                    row.push(consideration);
                }
    
                // Add English sentence
                const english = englishSentence[i] || ""; // Handle missing sentences
                row.push(english);
    
                // Add sentences for other languages
                languageCode.forEach((code) => {
                    if (code !== "en") {
                        const langData = langContent.find((item) => Object.keys(item)[0] === code);
                        const content = langData ? langData[code].content : [];
                        const sentence = content[i] || ""; // Handle missing sentences
                        row.push(sentence);
                    }
                });
    
                rows.push(row);
            }
    
            // Create a worksheet from the rows
            const worksheet = XLSX.utils.aoa_to_sheet(rows);
    
            // Create a new workbook and append the worksheet
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Translation");
    
            // Generate the Excel file and download it
            XLSX.writeFile(workbook, `${Date.now()}.xlsx`);
        } catch (e) {
            console.error("Error generating XLSX file:", e);
            toast.dismiss();
            toast.error("Something went wrong, Please try again.");
        }
    };
    
    
    

    const downloadCSVFile = async () => {
        try {
            if (languageCode.length === 0) {
                toast.error("Please select at least one language to download.");
                return;
            }
    
            // Prepare the headers dynamically based on isConsideration
            let headers = ["Serial No"];
            if (isConsideration) {
                headers.push("Consideration Pathway");
            }
            headers.push("English");
    
            const languageNames = languageCode
                .filter((code) => code !== "en") // Exclude "en" since it's explicitly added
                .map((code) => languages.find((lang) => lang.code === code)?.name || code);
            headers.push(...languageNames); // Add other language names
    
            // Start building CSV content
            let csvContent = `${headers.join(",")}\n`; // Add headers
    
            // Determine the max number of rows (sentences + consideration pathway items)
            const maxRows = Math.max(
                isConsideration ? considerationBox.length : 0,
                englishSentence.length,
                ...languageCode.map((code) => {
                    const langData = langContent.find((item) => Object.keys(item)[0] === code);
                    return langData ? langData[code].content.length : 0;
                })
            );
    
            // Loop through the max number of rows and build the CSV content
            for (let i = 0; i < maxRows; i++) {
                const row = [i + 1]; // Serial number
    
                // Add Consideration Pathway content if isConsideration is true
                if (isConsideration) {
                    const consideration = considerationBox[i]?.replace(/"/g, '""') || ""; // Escape quotes
                    row.push(`"${consideration}"`);
                }
    
                // Add English sentence
                const english = englishSentence[i]?.replace(/"/g, '""') || ""; // Escape quotes
                row.push(`"${english}"`);
    
                // Add sentences for other languages
                languageCode.forEach((code) => {
                    if (code !== "en") {
                        const langData = langContent.find((item) => Object.keys(item)[0] === code);
                        const content = langData ? langData[code].content : [];
                        const sentence = content[i]?.replace(/"/g, '""') || ""; // Escape quotes
                        row.push(`"${sentence}"`);
                    }
                });
    
                csvContent += `${row.join(",")}\n`; // Add row to CSV content
            }
    
            // Create and download the CSV file
            const element = document.createElement("a");
            const file = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
            element.href = URL.createObjectURL(file);
            element.download = `${Date.now()}.csv`;
            document.body.appendChild(element); // Required for Firefox
            element.click();
        } catch (e) {
            console.error("Error generating CSV file:", e);
            toast.dismiss();
            toast.error("Something went wrong, Please try again.");
        }
    };
    
    
    
    
    

    const downloadRTFFile = async () => {
        try {
            if (languageCode.length === 0) {
                toast.error("Please select at least one language to download.");
                return;
            }
    
            // Build RTF Header
            let rtfContent = `{\rtf1\\ansi\\deff0\n`;
            rtfContent += `\\b Translated Content\\b0\\par\n\n`; // Title
    
            // Prepare the headers
            const headers = ["Serial No"];
            const languageNames = languageCode.map((code) =>
                languages.find((lang) => lang.code === code)?.name || code
            );
            headers.push(...languageNames);
            rtfContent += headers.join(" \\tab ") + "\\par\n"; // Add headers with tab spacing
    
            // Determine the max number of sentences across all languages
            const maxSentences = Math.max(
                englishSentence.length,
                ...languageCode.map((code) => {
                    const langData = langContent.find((item) => Object.keys(item)[0] === code);
                    return langData ? langData[code].content.length : 0;
                })
            );
    
            // Loop through the max number of sentences and add rows
            for (let i = 0; i < maxSentences; i++) {
                const row = [i + 1]; // Serial number
                languageCode.forEach((code) => {
                    if (code === "en") {
                        // Add English sentences
                        row.push(englishSentence[i] || ""); // Handle empty cells
                    } else {
                        // Add sentences for other languages
                        const langData = langContent.find((item) => Object.keys(item)[0] === code);
                        const content = langData ? langData[code].content : [];
                        row.push(content[i] || ""); // Handle empty cells
                    }
                });
                rtfContent += row.join(" \\tab ") + "\\par\n"; // Add row with tab spacing
            }
    
            // Add Consideration Pathway content if enabled
            if (isConsideration && considerationBox.length > 0) {
                rtfContent += `\\b Consideration Pathway\\b0\\par\n`; // Add section header
                considerationBox.forEach((item, index) => {
                    const row = [maxSentences + index + 1, "Consideration Pathway"];
                    languageCode.forEach(() => row.push(item)); // Add the item for each language
                    rtfContent += row.join(" \\tab ") + "\\par\n"; // Add row with tab spacing
                });
            }
    
            rtfContent += `}`; // Close RTF content
    
            // Create and download the file
            const element = document.createElement("a");
            const file = new Blob([rtfContent], { type: "application/rtf;charset=utf-8" });
            element.href = URL.createObjectURL(file);
            element.download = `${Date.now()}.rtf`;
            document.body.appendChild(element); // Required for Firefox
            element.click();
        } catch (e) {
            console.error("Error generating RTF file:", e);
            toast.dismiss();
            toast.error("Something went wrong, Please try again.");
        }
    };
    
    


    const handleCheckboxChange = (code, isChecked) => {
        setLanguageCode(prev => {
            if (isChecked) {
                // Add the language code if checked
                return [...prev, code];
            } else {
                // Remove the language code if unchecked
                return prev.filter(langCode => langCode !== code);
            }
        });
    };
    
    
    

    return (
        <>
            <div className="Translation--page">
                <Row>
                    <Col sm={12} lg={12}>
                        {/* <h4>Download</h4> */}
                    </Col>
                    <Col sm={12} className="mt-4 mt-md-0">
                        <form>
                            <Row>
                                <Col sm={12}>
                                    <h4 className="mb-3">Script Language</h4>
                                    <div className="form-check-group">
                                        <label key="en" className="mr-3">
                                            <input
                                                type="checkbox"
                                                checked={languageCode.includes("en")} // Check if the language code is in the array
                                                onChange={(e) => handleCheckboxChange("en", e.target.checked)} // Handle checkbox state
                                            />
                                            &nbsp;English
                                        </label>
                                    </div>
                                </Col>
                                <Col sm={12}>
                                    {languageCheckboxes.length > 0 && (
                                        <>
                                            <h4 className="mt-3 mb-3">Translate Language</h4>
                                            <div className="form-check-group">
                                                {languageCheckboxes.map((language) => (
                                                    <label key={language.code} className="mr-3">
                                                        <input
                                                            type="checkbox"
                                                            disabled={!language.hasContent} // Disable if no content
                                                            checked={languageCode.includes(language.code)} // Check if the language code is in the array
                                                            onChange={(e) =>
                                                                handleCheckboxChange(language.code, e.target.checked)
                                                            } // Handle checkbox state
                                                        />
                                                        &nbsp;{language.name} - {language.status}
                                                    </label>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </Col>
                            </Row>
                            <ButtonGroup className="mt-4">
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                        Export 
                                        {spinnerloading && (
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
                                        )}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={downloadAsPDF}>
                                            <svg height={20} width={20} viewBox="0 0 512 512" >
                                                <path d="M444.875,109.792L338.208,3.125c-2-2-4.708-3.125-7.542-3.125h-224C83.135,0,64,19.135,64,42.667v426.667     C64,492.865,83.135,512,106.667,512h298.667C428.865,512,448,492.865,448,469.333v-352     C448,114.5,446.875,111.792,444.875,109.792z M341.333,36.417l70.25,70.25h-48.917c-11.76,0-21.333-9.573-21.333-21.333V36.417z      M426.667,469.333c0,11.76-9.573,21.333-21.333,21.333H106.667c-11.76,0-21.333-9.573-21.333-21.333V42.667     c0-11.76,9.573-21.333,21.333-21.333H320v64C320,108.865,339.135,128,362.667,128h64V469.333z"/>
                                                <path d="M310.385,313.135c-9.875-7.771-19.26-15.76-25.51-22.01c-8.125-8.125-15.365-16-21.656-23.5     c9.813-30.323,14.115-45.958,14.115-54.292c0-35.406-12.792-42.667-32-42.667c-14.594,0-32,7.583-32,43.688     c0,15.917,8.719,35.24,26,57.698c-4.229,12.906-9.198,27.792-14.781,44.573c-2.688,8.052-5.604,15.51-8.688,22.406     c-2.51,1.115-4.948,2.25-7.302,3.427c-8.479,4.24-16.531,8.052-24,11.594C150.5,370.177,128,380.844,128,401.906     c0,15.292,16.615,24.76,32,24.76c19.833,0,49.781-26.49,71.656-71.115c22.708-8.958,50.938-15.594,73.219-19.75     c17.854,13.729,37.573,26.865,47.125,26.865c26.448,0,32-15.292,32-28.115c0-25.219-28.813-25.219-42.667-25.219     C337.031,309.333,325.49,310.604,310.385,313.135z M160,405.333c-6.094,0-10.219-2.875-10.667-3.427     c0-7.563,22.552-18.25,44.365-28.583c1.385-0.656,2.792-1.313,4.219-1.99C181.896,394.563,166.052,405.333,160,405.333z      M234.667,214.354c0-22.354,6.938-22.354,10.667-22.354c7.542,0,10.667,0,10.667,21.333c0,4.5-3,15.75-8.49,33.313     C239.135,233.75,234.667,222.698,234.667,214.354z M242.844,329c0.667-1.854,1.313-3.729,1.938-5.625     c3.958-11.875,7.521-22.542,10.698-32.146c4.427,4.875,9.198,9.865,14.313,14.979c2,2,6.958,6.5,13.563,12.135     C270.208,321.208,256.219,324.76,242.844,329z M362.667,334.552c0,4.792,0,6.781-9.896,6.844     c-2.906-0.625-9.625-4.583-17.917-10.229c3.01-0.333,5.229-0.5,6.479-0.5C357.094,330.667,361.563,332.208,362.667,334.552z"/>
                                            </svg>
                                            &nbsp;
                                            Pdf
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={downloadDocFile}>
                                            <svg height={20} width={20} viewBox="0 0 512 512">
                                                <path d="M282.208,19.67c-3.648-3.008-8.48-4.256-13.152-3.392l-256,48C5.472,65.686,0,72.278,0,79.99v352    c0,7.68,5.472,14.304,13.056,15.712l256,48c0.96,0.192,1.984,0.288,2.944,0.288c3.68,0,7.328-1.28,10.208-3.68    c3.68-3.04,5.792-7.584,5.792-12.32v-448C288,27.222,285.888,22.71,282.208,19.67z M256,460.694L32,418.71V93.27l224-41.984    V460.694z"/>
                                                <path d="M496,79.99H272c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h208v288H272c-8.832,0-16,7.168-16,16    c0,8.832,7.168,16,16,16h224c8.832,0,16-7.168,16-16v-320C512,87.158,504.832,79.99,496,79.99z"/>
                                                <path d="M432,143.99H272c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h160c8.832,0,16-7.168,16-16    C448,151.158,440.832,143.99,432,143.99z"/>
                                                <path d="M432,207.99H272c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h160c8.832,0,16-7.168,16-16    C448,215.158,440.832,207.99,432,207.99z"/>
                                                <path d="M432,271.99H272c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h160c8.832,0,16-7.168,16-16    C448,279.158,440.832,271.99,432,271.99z"/>
                                                <path d="M432,335.99H272c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h160c8.832,0,16-7.168,16-16    C448,343.158,440.832,335.99,432,335.99z"/>
                                                <path d="M209.76,176.086c-8.48-0.864-16.704,5.344-17.664,14.112l-8.608,77.504l-24.512-65.344    c-4.704-12.48-25.312-12.48-29.984,0l-26.016,69.408l-7.136-50.048c-1.248-8.768-9.44-14.976-18.112-13.568    c-8.736,1.248-14.816,9.344-13.568,18.08l16,112c1.024,7.264,6.848,12.896,14.112,13.664c7.424,0.736,14.144-3.424,16.704-10.272    L144,253.558l33.024,88.064c2.368,6.272,8.384,10.368,14.976,10.368c0.672,0,1.312-0.032,1.984-0.16    c7.328-0.896,13.088-6.752,13.92-14.08l16-144C224.864,184.982,218.56,177.078,209.76,176.086z"/>
                                            </svg>
                                            &nbsp;
                                            Doc
                                        </Dropdown.Item>

                                        <Dropdown.Item onClick={downloadTxtFile}>
                                            <svg height={20} width={20} viewBox="0 0 24 24">
                                                <g><path d="m12.25 12c-.414 0-.75-.336-.75-.75v-.75h-7v.75c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.5c0-.414.336-.75.75-.75h8.5c.414 0 .75.336.75.75v1.5c0 .414-.336.75-.75.75z"/></g>
                                                <g><path d="m8 18.75c-.414 0-.75-.336-.75-.75v-8c0-.414.336-.75.75-.75s.75.336.75.75v8c0 .414-.336.75-.75.75z"/></g>
                                                <g><path d="m9.25 19h-2.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h2.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/></g>
                                                <g><path d="m20.25 10.5h-4.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/></g>
                                                <g><path d="m20.25 14.5h-4.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/></g>
                                                <g><path d="m20.25 18.5h-4.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/></g>
                                                <g><path d="m21.25 23h-18.5c-1.517 0-2.75-1.233-2.75-2.75v-16.5c0-1.517 1.233-2.75 2.75-2.75h18.5c1.517 0 2.75 1.233 2.75 2.75v16.5c0 1.517-1.233 2.75-2.75 2.75zm-18.5-20.5c-.689 0-1.25.561-1.25 1.25v16.5c0 .689.561 1.25 1.25 1.25h18.5c.689 0 1.25-.561 1.25-1.25v-16.5c0-.689-.561-1.25-1.25-1.25z"/></g>
                                                <g><path d="m23.25 6h-22.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h22.5c.414 0 .75.336.75.75s-.336.75-.75.75z"/></g>
                                            </svg>
                                            &nbsp;
                                            Text
                                        </Dropdown.Item>


                                        <Dropdown.Item onClick={downloadSRTFile}>
                                            <svg height={20} width={20} viewBox="0 0 256 256"><title/><g id="srt"><g><path d="M184,168a8.009,8.009,0,0,0,8-8V112a8.009,8.009,0,0,0-8-8H48a8.009,8.009,0,0,0-8,8v48a8.009,8.009,0,0,0,8,8Zm-49.822-47.941h25.029v5.328h-9.324v26.168h-6.359V125.387h-9.346Zm-29.717,0h13.385a22.915,22.915,0,0,1,7.336.849,7.245,7.245,0,0,1,3.664,3.019,9.082,9.082,0,0,1,1.375,4.963,8.411,8.411,0,0,1-2.084,5.854,10.008,10.008,0,0,1-6.23,2.911,14.852,14.852,0,0,1,3.4,2.643,35.982,35.982,0,0,1,3.621,5.113l3.846,6.145h-7.605l-4.6-6.854a44.5,44.5,0,0,0-3.352-4.63,4.886,4.886,0,0,0-1.912-1.311,10.485,10.485,0,0,0-3.2-.354H110.82v13.148h-6.359ZM91.854,140.5a5.242,5.242,0,0,0-2.288-1.364q-1.118-.387-5.092-1.375-5.114-1.267-7.176-3.115a8.194,8.194,0,0,1-2.9-6.338,8.1,8.1,0,0,1,1.364-4.5,8.538,8.538,0,0,1,3.932-3.19,15.758,15.758,0,0,1,6.2-1.1q5.93,0,8.927,2.6a9.178,9.178,0,0,1,3.147,6.939l-6.359.279a5.4,5.4,0,0,0-1.751-3.491,6.412,6.412,0,0,0-4.028-1.063,7.267,7.267,0,0,0-4.34,1.139,2.293,2.293,0,0,0-1.01,1.955,2.416,2.416,0,0,0,.945,1.912q1.2,1.011,5.844,2.105a30.856,30.856,0,0,1,6.864,2.267,8.844,8.844,0,0,1,3.48,3.2,9.915,9.915,0,0,1-.247,10.087,9.014,9.014,0,0,1-4.254,3.513,17.836,17.836,0,0,1-6.854,1.149q-5.974,0-9.174-2.761a12.005,12.005,0,0,1-3.824-8.046l6.188-.6a7.545,7.545,0,0,0,2.267,4.576,6.85,6.85,0,0,0,4.608,1.461,7.085,7.085,0,0,0,4.63-1.3,3.868,3.868,0,0,0,1.558-3.04A2.869,2.869,0,0,0,91.854,140.5Z"/><path d="M121.24,132.992a3.427,3.427,0,0,0,1.783-1.332,4.1,4.1,0,0,0,.645-2.363,3.774,3.774,0,0,0-.85-2.567,3.893,3.893,0,0,0-2.395-1.235q-.773-.107-4.641-.107H110.82v7.992h4.705A24.3,24.3,0,0,0,121.24,132.992Z"/><path d="M200,8H64A16.018,16.018,0,0,0,48,24V96h8V24a8.009,8.009,0,0,1,8-8H200a8.009,8.009,0,0,1,8,8V191.029a8.1,8.1,0,0,1-.065.971H172a12.013,12.013,0,0,0-12,12v35.935a8.1,8.1,0,0,1-.971.065H64a8.009,8.009,0,0,1-8-8V176H48v56a16.018,16.018,0,0,0,16,16h95.029a15.893,15.893,0,0,0,11.313-4.687l40.971-40.971A15.893,15.893,0,0,0,216,191.029V24A16.018,16.018,0,0,0,200,8Z"/></g></g></svg> SRT
                                        </Dropdown.Item>


                                        <Dropdown.Item onClick={downloadXLSXFile}>
                                        <svg height="20" width="20" viewBox="0 0 24 24">
                                                <path d="M5 2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm2 14h2v-3h6v3h2V8h-2v3H9V8H7v8zm8-6V8h-6v2h6z"></path>
                                            </svg>
                                            &nbsp; XLSX
                                        </Dropdown.Item>

                                        <Dropdown.Item onClick={downloadRTFFile}>
                                            <svg height="20" width="20" viewBox="0 0 24 24">
                                                <path d="M5 2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm2 14h2v-3h6v3h2V8h-2v3H9V8H7v8zm8-6V8h-6v2h6z"></path>
                                            </svg>
                                            &nbsp; RTF
                                        </Dropdown.Item>

                                        <Dropdown.Item onClick={downloadCSVFile}>
                                            <svg height={20} width={20} class="bi bi-filetype-csv" fill="currentColor" viewBox="0 0 16 16"><path d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM3.517 14.841a1.13 1.13 0 0 0 .401.823c.13.108.289.192.478.252.19.061.411.091.665.091.338 0 .624-.053.859-.158.236-.105.416-.252.539-.44.125-.189.187-.408.187-.656 0-.224-.045-.41-.134-.56a1.001 1.001 0 0 0-.375-.357 2.027 2.027 0 0 0-.566-.21l-.621-.144a.97.97 0 0 1-.404-.176.37.37 0 0 1-.144-.299c0-.156.062-.284.185-.384.125-.101.296-.152.512-.152.143 0 .266.023.37.068a.624.624 0 0 1 .246.181.56.56 0 0 1 .12.258h.75a1.092 1.092 0 0 0-.2-.566 1.21 1.21 0 0 0-.5-.41 1.813 1.813 0 0 0-.78-.152c-.293 0-.551.05-.776.15-.225.099-.4.24-.527.421-.127.182-.19.395-.19.639 0 .201.04.376.122.524.082.149.2.27.352.367.152.095.332.167.539.213l.618.144c.207.049.361.113.463.193a.387.387 0 0 1 .152.326.505.505 0 0 1-.085.29.559.559 0 0 1-.255.193c-.111.047-.249.07-.413.07-.117 0-.223-.013-.32-.04a.838.838 0 0 1-.248-.115.578.578 0 0 1-.255-.384h-.765ZM.806 13.693c0-.248.034-.46.102-.633a.868.868 0 0 1 .302-.399.814.814 0 0 1 .475-.137c.15 0 .283.032.398.097a.7.7 0 0 1 .272.26.85.85 0 0 1 .12.381h.765v-.072a1.33 1.33 0 0 0-.466-.964 1.441 1.441 0 0 0-.489-.272 1.838 1.838 0 0 0-.606-.097c-.356 0-.66.074-.911.223-.25.148-.44.359-.572.632-.13.274-.196.6-.196.979v.498c0 .379.064.704.193.976.131.271.322.48.572.626.25.145.554.217.914.217.293 0 .554-.055.785-.164.23-.11.414-.26.55-.454a1.27 1.27 0 0 0 .226-.674v-.076h-.764a.799.799 0 0 1-.118.363.7.7 0 0 1-.272.25.874.874 0 0 1-.401.087.845.845 0 0 1-.478-.132.833.833 0 0 1-.299-.392 1.699 1.699 0 0 1-.102-.627v-.495Zm8.239 2.238h-.953l-1.338-3.999h.917l.896 3.138h.038l.888-3.138h.879l-1.327 4Z" fill-rule="evenodd"/></svg> CSV
                                        </Dropdown.Item>
                                        
                                        {/* <Dropdown.Item onClick={(e) => handleSaveTrans(e, 'active')}>Srt</Dropdown.Item>
                                        <Dropdown.Item onClick={(e) => handleSaveTrans(e, 'active')}>Xlsx</Dropdown.Item>
                                        <Dropdown.Item onClick={(e) => handleSaveTrans(e, 'active')}>Rtf</Dropdown.Item>
                                        <Dropdown.Item onClick={(e) => handleSaveTrans(e, 'active')}>Csv</Dropdown.Item> */}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </ButtonGroup>
                        </form>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default DownloadLanguageProject;
