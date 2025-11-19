import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, Button, Table, ListGroup, Dropdown, Form, Pagination } from "react-bootstrap";
import { CiClock2 } from 'react-icons/ci';
import { FaChevronDown, FaPlus, FaRegUser } from "react-icons/fa";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { HiOutlineUserGroup } from 'react-icons/hi';
import { BsAspectRatio } from 'react-icons/bs';
import { RxColumns } from 'react-icons/rx';
import { list_project } from "~/store/slices/project/action";
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

import 'bootstrap/dist/css/bootstrap.min.css';
import './projectListStyle.css';
import '../../App.css';
import SidebarPanel from "../Sidebar/Sidebar";

function ProjectList() {

    const [expandedRow, setExpandedRow] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const dispatch = useDispatch();
    
    const { data, loading, error, totalPages } = useSelector((state: any) => state.project);
    const hasFetchedData = useRef(false);

    useEffect(() => {
        if (!hasFetchedData.current) {
            dispatch(list_project({ page: currentPage, limit: itemsPerPage }));
            hasFetchedData.current = true;
        }
    }, [dispatch, currentPage, itemsPerPage]);

    const RowExpand = rowId => {
        setExpandedRow(expandedRow === rowId ? null : rowId);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        dispatch(list_project({ page: pageNumber, limit: itemsPerPage }));
    };
   

    // const projects = [
    //     { id: 1, title: "When Someone You Love Dies", projectId: "S01337337-V1", contentType: "Direct Testing", aspectRatio: "9:16 / 1:1", videos: 6, buttonLabel: "Hold: Translation", buttonVariant: "danger", image: "images/Screenshot1.png" },
    //     { id: 2, title: "When Someone You Love Dies", projectId: "S01337337-V1", contentType: "Direct Testing", aspectRatio: "9:16 / 1:1", videos: 6, buttonLabel: "In-progress", buttonVariant: "warning", image: "images/Screenshot2.png" },
    //     { id: 3, title: "When Someone You Love Dies", projectId: "S01337337-V1", contentType: "Direct Testing", aspectRatio: "9:16 / 1:1", videos: 6, buttonLabel: "Editing", buttonVariant: "success", image: "images/Screenshot3.png" },
    //     { id: 4, title: "When Someone You Love Dies", projectId: "S01337337-V1", contentType: "Direct Testing", aspectRatio: "9:16 / 1:1", videos: 6, buttonLabel: "Awaiting Approval", buttonVariant: "warning", image: "images/Screenshot4.png" },
    //     { id: 5, title: "When Someone You Love Dies", projectId: "S01337337-V1", contentType: "Direct Testing", aspectRatio: "9:16 / 1:1", videos: 6, buttonLabel: "Download Ready", buttonVariant: "secondary", image: "images/Screenshot5.png" },
    //     { id: 6, title: "When Someone You Love Dies", projectId: "S01337337-V1", contentType: "Direct Testing", aspectRatio: "9:16 / 1:1", videos: 6, buttonLabel: "Hold: Translation", buttonVariant: "danger", image: "images/Screenshot6.png" },
    //     { id: 7, title: "When Someone You Love Dies", projectId: "S01337337-V1", contentType: "Direct Testing", aspectRatio: "9:16 / 1:1", videos: 6, buttonLabel: "Drafts", buttonVariant: "warning", image: "images/Screenshot7.png" },
    //     { id: 8, title: "When Someone You Love Dies", projectId: "S01337337-V1", contentType: "Direct Testing", aspectRatio: "9:16 / 1:1", videos: 6, buttonLabel: "Complete", buttonVariant: "info", image: "images/Screenshot8.png" }
    // ];
    
    return (
        <>
            <SidebarPanel/>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="content__container projects--page pb-5">
                <Container fluid>
                    <Row>
                        <Col sm={12} className="mb-4">
                            <h2>Project List</h2>
                        </Col>
                        <Col sm={12} className="mb-4">
                            <ListGroup horizontal>
                                <ListGroup.Item>Filters:</ListGroup.Item>
                                <ListGroup.Item>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="Lastworked"><CiClock2 /> Last worked on</Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Form>
                                                <Form.Check
                                                    label="Today"
                                                    name="worked"
                                                    type='radio'
                                                    id='today'
                                                    // checked
                                                />
                                                <Form.Check
                                                    label="This week"
                                                    name="worked"
                                                    type='radio'
                                                    id='Thisweek'
                                                />
                                                <Form.Check
                                                    label="This month"
                                                    name="worked"
                                                    type='radio'
                                                    id='Thismonth'
                                                />
                                                <Form.Check
                                                    label="This year"
                                                    name="worked"
                                                    type='radio'
                                                    id='Thisyear'
                                                />
                                                <Form.Check
                                                    label="Set up"
                                                    name="worked"
                                                    type='radio'
                                                    id='Set up'
                                                />
                                            </Form>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="content"><MdOutlineChatBubbleOutline /> Content Type</Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Form>
                                                <Form.Check
                                                    label="Direct Testing"
                                                    name="content"
                                                    type='radio'
                                                    id='Direct Testing'
                                                    // checked
                                                />
                                                <Form.Check
                                                    label="Direct Organic"
                                                    name="content"
                                                    type='radio'
                                                    id='Direct Organic'
                                                />
                                                <Form.Check
                                                    label="OBJ 1 Testing"
                                                    name="content"
                                                    type='radio'
                                                    id='OBJ 1 Testing'
                                                />
                                            </Form>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="author"><FaRegUser /> Author</Dropdown.Toggle>
                                        {/* <Dropdown.Menu>
                                            <Form>
                                                <Form.Check
                                                    label="Today"
                                                    name="worked"
                                                    type='radio'
                                                    id='today'
                                                    // checked
                                                />
                                                <Form.Check
                                                    label="This week"
                                                    name="worked"
                                                    type='radio'
                                                    id='Thisweek'
                                                />
                                                <Form.Check
                                                    label="This month"
                                                    name="worked"
                                                    type='radio'
                                                    id='Thismonth'
                                                />
                                                <Form.Check
                                                    label="This year"
                                                    name="worked"
                                                    type='radio'
                                                    id='Thisyear'
                                                />
                                                <Form.Check
                                                    label="Set up"
                                                    name="worked"
                                                    type='radio'
                                                    id='Set up'
                                                />
                                            </Form>
                                        </Dropdown.Menu> */}
                                    </Dropdown>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="status"><HiOutlineUserGroup /> Status</Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Form>
                                                <Form.Check
                                                    label="Drafts"
                                                    name="status"
                                                    type='checkbox'
                                                    id='Drafts'
                                                />
                                                <Form.Check
                                                    label="On Hold: Translation"
                                                    name="status"
                                                    type='checkbox'
                                                    id='On Hold: Translation'
                                                    // checked
                                                />
                                                <Form.Check
                                                    label="Editing"
                                                    name="status"
                                                    type='checkbox'
                                                    id='Editing'
                                                />
                                                <Form.Check
                                                    label="Awaiting Approval"
                                                    name="status"
                                                    type='checkbox'
                                                    id='Awaiting Approval'
                                                />
                                                <Form.Check
                                                    label="Download Ready"
                                                    name="status"
                                                    type='checkbox'
                                                    id='Download Ready'
                                                />
                                                <Form.Check
                                                    label="Complete"
                                                    name="status"
                                                    type='checkbox'
                                                    id='Complete'
                                                />
                                            </Form>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="secondary" id="ratio"><BsAspectRatio /> Aspect Ratio</Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Form>
                                                <Form.Check
                                                    label="9:16 / 1:1"
                                                    name="aspect"
                                                    type='radio'
                                                    id='9:16 / 1:1'
                                                    // checked
                                                />
                                                <Form.Check
                                                    label="16:9 / 1:1"
                                                    name="aspect"
                                                    type='radio'
                                                    id='16:9 / 1:1'
                                                />
                                                <Form.Check
                                                    label="9:16"
                                                    name="aspect"
                                                    type='radio'
                                                    id='9:16'
                                                />
                                                <Form.Check
                                                    label="1:1"
                                                    name="aspect"
                                                    type='radio'
                                                    id='1:1'
                                                />
                                                <Form.Check
                                                    label="16:9"
                                                    name="aspect"
                                                    type='radio'
                                                    id='16:9'
                                                />
                                            </Form>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button variant="secondary"><RxColumns /> Custom Columns</Button>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button variant="secondary"><FaPlus/></Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col sm={12}>
                            {/* Show loading spinner while data is being fetched */}
                            {loading && <div>Loading...</div>}
                            {/* Show error message if there is an error */}
                            {error && <div>Error: {error}</div>}

                            {data && !loading && (
                                <Table responsive striped>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Project Title</th>
                                            <th>Project ID</th>
                                            <th>Content Type</th>
                                            <th className="text-lg-center">Aspect Ratio</th>
                                            {/* <th className="text-lg-center">Video Status</th> */}
                                            <th className="text-lg-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(data) && data.length > 0 ? (
                                            data.map((project) => {
                                            const projectLink =
                                                project.steps === 1
                                                ? `/create-project?project_id=${project._id}`
                                                : project.steps === 2
                                                ? `/create-script?project_id=${project._id}`
                                                : project.steps === 3
                                                ? `/script-translation?project_id=${project._id}`
                                                : project.steps === 4
                                                ? `/submit-translation?project_id=${project._id}`
                                                : project.steps === 5
                                                ? `/new-video-editor?project_id=${project._id}`
                                                : null;

                                            const imageUrl = project.project_screenshot
                                                ? `${import.meta.env.VITE_APP_API_HOST}/screenshots/${project.project_screenshot}`
                                                : 'images/projects.png';
                                            
                                            const prjclassName = project.project_screenshot
                                                ? 'project_screenshot'
                                                : 'project_placeholder';    

                                                const projectButton =
                                                project.project_status == "Project Created" ? (
                                                  <a className="btn btn-sm link btn_status" href={projectLink}>
                                                    <Button variant="danger">Project Created</Button>
                                                  </a>
                                                ) : project.project_status == "Make a Script" ? (
                                                  <a className="btn btn-sm link btn_status" href={projectLink}>
                                                    <Button variant="warning">{project.project_status}</Button>
                                                  </a>
                                                ) : project.project_status == "Translation" ? (
                                                  <a className="btn btn-sm link btn_status" href={projectLink}>
                                                    <Button variant="warning">{project.project_status}</Button>
                                                  </a>
                                                ) : project.project_status == "Submit for translation" ? (
                                                  <a className="btn btn-sm link btn_status" href={projectLink}>
                                                    <Button variant="warning">{project.project_status}</Button>
                                                  </a>
                                                ) : project.project_status == "Translation Submitted" ? (
                                                  <a className="btn btn-sm link btn_status" href={projectLink}>
                                                    <Button variant="warning">{project.project_status}</Button>
                                                  </a>
                                                ) : project.project_status == "Generating Video" ? (
                                                  <a className="btn btn-sm link btn_status" href={projectLink}>
                                                    <Button variant="info">{project.project_status}</Button>
                                                  </a>
                                                ) : project.project_status == "Video Generated" ? (
                                                    <a className="btn btn-sm link btn_status" href={projectLink}>
                                                        <Button variant="success">{project.project_status}</Button>
                                                    </a>
                                                ) : project.project_queue ? (
                                                    (project.project_status?.length > 0 && project.project_status[project.project_status.length - 1] === 'Audio') ? (
                                                        <a className="btn btn-sm link btn_status" href={`/submit-translation?project_id=${project._id}`}>
                                                          <Button variant="info">
                                                            Audio is being created
                                                          </Button>
                                                        </a>
                                                      ) : (project.project_status?.length > 0 && project.project_status[project.project_status.length - 1] === 'Video') ? (
                                                        <a className="btn btn-sm link btn_status" href={`/submit-translation?project_id=${project._id}`}>
                                                          <Button variant="info">
                                                            Video is being created
                                                          </Button>
                                                        </a>
                                                      ) : (project.project_status?.length > 0 && project.project_status[project.project_status.length - 1] === 'Data Processing') ? (
                                                        <a className="btn btn-sm link btn_status" href={`/submit-translation?project_id=${project._id}`}>
                                                          <Button variant="info">
                                                            Data Processing
                                                          </Button>
                                                        </a> 
                                                      ) : (project.project_status?.length > 0 && project.project_status[project.project_status.length - 1] === 'JSON Generation') ? (
                                                        <a className="btn btn-sm link btn_status" href={`/submit-translation?project_id=${project._id}`}>
                                                          <Button variant="info">
                                                            JSON Generation
                                                          </Button>
                                                        </a>  
                                                      ) : (project.project_status?.length > 0 && project.project_status[project.project_status.length - 1] === 'Image Creation') ? (
                                                        <a className="btn btn-sm link btn_status" href={`/submit-translation?project_id=${project._id}`}>
                                                          <Button variant="info">
                                                            Image Creation
                                                          </Button>
                                                        </a>      

                                                      ) : (project.project_status?.length > 0 && project.project_status[project.project_status.length - 1] === 'Video Generate') ? (
                                                        <a className="btn btn-sm link btn_status" href={projectLink}>
                                                          <Button variant="info">
                                                            Video Generated
                                                          </Button>
                                                        </a>
                                                      ) : (project.project_status?.length > 0 && project.project_status[project.project_status.length - 1] === 'failed') ? (
                                                        <a className="btn btn-sm link btn_status" href={`/submit-translation?project_id=${project._id}`}>
                                                          <Button variant="danger">
                                                            The Job {project.project_queue} is Failed
                                                          </Button>
                                                        </a>
                                                      ) : (
                                                        <a className="btn btn-sm link btn_status" href={`/submit-translation?project_id=${project._id}`}>
                                                          <Button variant="danger">Status Unknown</Button>
                                                        </a>
                                                      )
                                                ) : (
                                                  <Button variant="danger">Hold</Button>
                                                );
                                              

                                            return (
                                                
                                                <tr key={project.id} className={expandedRow === project.id ? 'open--table' : ''}>
                                                <td className="text-lg-center prj_image">
                                                    {projectLink ? (
                                                    <a className="btn btn-sm link" href={projectLink}>
                                                        <img className={prjclassName} src={imageUrl} alt={project.project_name} />
                                                    </a>
                                                    ) : (
                                                    <img className={prjclassName}  src={imageUrl} alt={project.project_name} />
                                                    )}
                                                </td>

                                                <td
                                                    className={expandedRow === project._id ? 'head--click' : 'head--arrow'}
                                                    onClick={() => RowExpand(project._id)}
                                                >
                                                    {projectLink ? (
                                                    <a className="btn btn-sm link" href={projectLink}>
                                                        {project.project_name} <FaChevronDown />
                                                    </a>
                                                    ) : (
                                                    <>{project.project_name} <FaChevronDown /></>
                                                    )}
                                                </td>
                                                <td>{project._id}</td>
                                                <td>Direct Testing</td>
                                                <td className="text-lg-center">{project.ratio}</td>

                                                <td>{projectButton}</td>
                                                </tr>
                                            );
                                            })
                                        ) : (
                                            <tr>
                                            <td colSpan={6}>No projects found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            )}
                            <Pagination className="mt-3">
                                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                                {[...Array(totalPages)].map((_, index) => {
                                    const pageNumber = index + 1; // Ensure pages start from 1
                                    return (
                                        <Pagination.Item key={pageNumber} active={pageNumber === currentPage} onClick={() => handlePageChange(pageNumber)}>
                                            {pageNumber}
                                        </Pagination.Item>
                                    );
                                })}
                                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                            </Pagination>
                            
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default ProjectList;
