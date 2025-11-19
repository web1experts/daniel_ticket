import React, { useEffect, useState } from "react";
import Select, { components } from 'react-select';
import { Col, Container, Row, Form, Table, Dropdown, Button, Tabs, Tab, Modal, Pagination, Spinner } from "react-bootstrap";
import { FaEllipsisV, FaPlus } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { user_OTP, getVerifiedUsers, getAllUsers, userDelete, userEdit, user_Update } from "~/store/slices/user_role/action";
import { notValid } from "../../utils/validations";
import { emailValidation } from "../../utils/validations";
import toast, { Toaster } from 'react-hot-toast';
import swal from 'sweetalert';
//import TranslatorSidebarPanel from "../TranslatorApp/translatorSidebar";
import TranslatorSidebarPanel from "../Sidebar/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './userStyle.css';
import '../../App.css';

const UserPermissions = () => {
    const options = [
        {
            label: "Administrator",
            subLabel: "Access of everything",
            value: "admin"
        },
        {
            label: "Genesis",
            subLabel: "Access Only Genesis App",
            value: "genesis"
        },
        {
            label: "Upload Footage",
            subLabel: "Access of Upload Footage app",
            value: "upload"
        },
        {
            label: "Script Generator",
            subLabel: "Access of Script Generator app",
            value: "script"
        },
        {
            label: "File Generator",
            subLabel: "Access of File Name Generator app",
            value: "filename"
        },
        {
            label: "Translator",
            subLabel: "Access of a Translation App",
            value: "translator"
        }
    ];

    const Option = props => (
        <components.Option {...props}>
            <div>{props.data.label}</div>
            <div style={{ fontSize: 12 }}>{props.data.subLabel}</div>
        </components.Option>
    );

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [editShow, setEditShow] = useState(false);
    const EdithandleClose = () => setEditShow(false);
    const EdithandleShow = () => setEditShow(true);

    const [key, setKey] = useState('Members');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editUser, setEditUser] = useState([]); // State to store user data for editing

    const [currentPageMembers, setCurrentPageMembers] = useState(1);
    const [totalPagesMembers, setTotalPagesMembers] = useState(1);
    const [currentPageInvitee, setCurrentPageInvitee] = useState(1);
    const [totalPagesInvitee, setTotalPagesInvitee] = useState(1);
    const [spinnerloading, setSpinnerLoading] = useState<boolean>(false);
    const usersPerPage = 10;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({ email: '', role: '' });
    const [error, setError] = useState({ email: '', role: '' });
    const apiResult = useSelector(state => state.user);

    const handleChangeInput = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value });
        setError({ ...error, [name]: '' });
    }

    const handleRoleChange = (selectedOptions) => {
        const selectedRoles = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setUser({ ...user, role: selectedRoles });
        setError({ ...error, role: '' });
    };
    

    const handleEditRoleChange = (selectedOptions) => {
        setEditUser(prev => ({
            ...prev,
            role: selectedOptions.map(option => option.value)
        }));
    };

    const isValid = () => {
        if (!emailValidation(user.email)) {
            toast.error("Please enter email");
            return false;
        }
    
        if (!Array.isArray(user.role) || user.role.length === 0) {
            toast.error("Please select at least one user role");
            return false;
        }
    
        return true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (isValid()) {
            //setLoading(true);
            setSpinnerLoading(true);
            await dispatch(user_OTP(user));
        }
    }

    const onEditSubmit = async (e) => {
        e.preventDefault();
        const updateData = {
            user_id: editUser._id,
            role: editUser.role
        };
        setSpinnerLoading(true);
        await dispatch(user_Update(updateData));
    }

    const handleEdit = async (userId) => {
        setLoading(true);
        const result = await dispatch(userEdit({ user_id: userId }));
        if (result.payload && result.payload.data) {
            setEditUser(result.payload.data[0]);
            EdithandleShow();
        }
        setLoading(false);
        // No fetchData call here to avoid unnecessary refresh
    };

    const handleDelete = async (userId) => {
        swal({
            text: "Are you sure you want to delete this user?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                await dispatch(userDelete({ user_id: userId }));
            }
        });
    };

    const fetchData = async (tab, page = 1) => {
        setLoading(true);
        let data = { "page": page, "limit": usersPerPage };
        if (tab === "Members") {
            await dispatch(getVerifiedUsers(data));
        } else if (tab === "Invitee") {
            await dispatch(getAllUsers(data));
        }
        setKey(tab);
    };

    useEffect(() => {
        fetchData('Members');
    }, [dispatch]); // Fetch data only when the component mounts

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log(apiResult);
            
            if (apiResult.data.status == 205) {
                toast.success("User has been deleted!");
                fetchData(key);
            } else if (apiResult.data.status == 202) {
                toast.success("Invitation has been sent successfully.!");
                fetchData(key);
            } else if (apiResult.data.status == 206) {
                toast.success("User info updated successfully");
                EdithandleClose();
                fetchData(key);
            } else if (apiResult.data.status === 203) {
                setSpinnerLoading(false);
                setUsers(apiResult.user.data || []);
                if (key === 'Members') {
                    setTotalPagesMembers(apiResult.totalPages || 1);
                } else if (key === 'Invitee') {
                    setTotalPagesInvitee(apiResult.totalPages || 1);
                }
                setLoading(false);
                handleClose();
            } else if (apiResult.error) {
                setLoading(false);
                if (typeof apiResult.error !== 'undefined') {
                    toast.error(apiResult.error);
                }
            } else if (apiResult.data.status === 200) {
                toast.success(apiResult.data.message);
                handleClose();
                setLoading(false);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [apiResult, key]);

    const renderUsersTable = () => (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <Table responsive="md">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th className="text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{Array.isArray(user.role) && user.role.length > 0
                                ? user.role.map(roleValue => {
                                    const matched = options.find(option => option.value === roleValue);
                                    return matched ? matched.label : 'Unknown Role';
                                }).join(', ')
                                : 'No Roles Assigned'}</td>
                            <td>
                                <Dropdown className="text-right">
                                    <Dropdown.Toggle variant="secondary"><FaEllipsisV /></Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => handleEdit(user._id)}>Edit</Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleDelete(user._id)}>Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {key === 'Members' ? renderPagination(currentPageMembers, totalPagesMembers, handlePageChangeMembers) : renderPagination(currentPageInvitee, totalPagesInvitee, handlePageChangeInvitee)}
        </>
    );

    const renderPagination = (currentPage, totalPages, handlePageChange) => (
        <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
            {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
    );

    const handlePageChangeMembers = (page) => {
        setCurrentPageMembers(page);
        fetchData('Members', page);
    };

    const handlePageChangeInvitee = (page) => {
        setCurrentPageInvitee(page);
        fetchData('Invitee', page);
    };

    return (
        <>
            <TranslatorSidebarPanel />
            <div className="content__container new--script--page user--page pb-5">
                <Toaster position="top-right" reverseOrder={false} />
                <Container fluid>
                    <Row>
                        <Col sm={12}>
                            <h4 className="mb-3">User Roles & Permissions</h4>
                            <Tabs 
                                defaultActiveKey="Members" 
                                activeKey={key} 
                                onSelect={(k) => {
                                    setKey(k);
                                    setCurrentPageMembers(1);
                                    setCurrentPageInvitee(1);
                                    fetchData(k, 1);
                                }}
                            >
                                <Tab eventKey="Members" title="Members">
                                    {/* <Col sm={12} className="mb-3 px-0 text-right">
                                        <Button variant="primary" onClick={handleShow}><FaPlus /> Add Member</Button>
                                    </Col> */}
                                    {loading ? <p>Loading...</p> : renderUsersTable()}
                                </Tab>
                                <Tab eventKey="Invitee" title="Invitee">
                                    <Col sm={12} className="mb-3 px-0 text-right">
                                        <Button variant="primary" onClick={handleShow}><FaPlus /> Add Member</Button>
                                    </Col>
                                    {loading ? <p>Loading...</p> : renderUsersTable()}
                                </Tab>
                                
                            </Tabs>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Add Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Form className="form--role" onSubmit={onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Member</Modal.Title>
                        <button type="button" onClick={handleClose} className="btn-close" aria-label="Close"><MdClose /></button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="form-group">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={user.email || ''}
                                onChange={handleChangeInput}
                            />
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label>Role</Form.Label>
                            <Select
                                name="role"
                                options={options}
                                isMulti
                                components={{ Option }}
                                onChange={handleRoleChange}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" disabled={loading}>
                            Submit
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
                                <></>
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {/* End Add Modal */}


            {/* Edit Modal */}
            <Modal show={editShow} onHide={EdithandleClose} centered>
                <Form className="form--role" onSubmit={onEditSubmit}>
                    <Modal.Header>
                        <Modal.Title>Edit Member's Role</Modal.Title>
                        <span onClick={EdithandleClose}><MdClose /></span>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="form-group">
                            <Form.Label>Role</Form.Label>
                            <Select
                                name="role"
                                options={options}
                                isMulti
                                components={{ Option }}
                                value={options.filter(option => editUser.role?.includes(option.value))}
                                onChange={handleEditRoleChange}
                            />

                            <Form.Control
                                type="hidden"
                                name="otp"
                                value={editUser._id || ''}
                                readOnly
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit" disabled={loading}>
                            Submit
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
                                <></>
                            )}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default UserPermissions;