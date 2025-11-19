import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button, Navbar, Spinner } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './loginStyle.css';
import '../../App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { FaCircle } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { register } from "~/store/slices/user_role/action";
import { notValid, emailValidation } from "../../utils/validations";

const RegisterPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const apiResult = useSelector(state => state.user);

    const [user, setUser] = useState({
        email: '',
        password: '',
        name: '',
        phoneNumber: '',
        address: '',
        dob: null,
        otp: ''
    });

    const [loading, setLoading] = useState(false);
    const [UserRegister, setUserRegister] = useState(true);
    const queryParams = new URLSearchParams(location.search);
    const get_token = queryParams.get('token');
    const get_email = queryParams.get('email');

    // Pre-fill email and otp from query parameters
    useEffect(() => {
        setUser(prevState => ({
            ...prevState,
            email: get_email || '',
            otp: get_token || ''
        }));
    }, [get_email, get_token]);

    const handleChangeDate = (date) => {
        setUser(prevState => ({
            ...prevState,
            dob: date
        }));
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const isValid = () => {
        let isValid = true;

        if (notValid(user.name)) {
            toast.error("Please enter name");
            isValid = false;
        }
        if (!emailValidation(user.email)) {
            toast.error("Please enter a valid email");
            isValid = false;
        }
        if (notValid(user.password)) {
            toast.error("Please enter password");
            isValid = false;
        }
        return isValid;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (isValid() && !loading) {
            setLoading(true);
            try {
                dispatch(register(user));
            } catch (error) {
                toast.error("Error occurred during registration.");
            } finally {
                setLoading(false); // Ensure this runs after the dispatch finishes
            }
        }
    };

    // Handle API result and stop multiple submissions
    useEffect(() => {
        if (apiResult.data?.status === 200) {
            toast.success("Registration successful");
            const timer = setTimeout(() => {
                navigate('/');
            }, 1000);
            return () => clearTimeout(timer); // Clean up timer
        } else if (apiResult.data?.status && apiResult.data?.status !== 200) {
            toast.error("Registration failed. Please try again.");
        }
    }, [apiResult])

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <section className="login--Wrapper">
                <Container fluid>
                    <Row>
                        <Col sm={12} md={6} lg={7} className="order-last d-none d-md-block pr-md-0">
                            <img className="bg--login" src="./images/Login-graphics.jpg" alt="..." />
                        </Col>

                        <Col sm={12} md={6} lg={5}>
                            <div className="login--screen">
                                <Navbar.Brand href="/">
                                    <img src="./images/logo.png" alt="..." />
                                </Navbar.Brand>

                                <Form onSubmit={onSubmit}>
                                    <h5>Register</h5>
                                    <Form.Group className="form-group">
                                        <Form.Control
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            value={user.name || ''}
                                            onChange={handleChangeInput}
                                        />
                                    </Form.Group>

                                    <Form.Group className="form-group">
                                        <Form.Control
                                            type="email"
                                            placeholder="Email Address"
                                            name="email"
                                            value={user.email}
                                            readOnly
                                        />
                                        <Form.Control
                                            type="hidden"
                                            name="otp"
                                            value={user.otp}
                                            readOnly
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="form-group">
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={user.password || ''}
                                            onChange={handleChangeInput}
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" disabled={loading}>
                                        Register
                                        {loading && (
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
                                    <p>Have an account? <a href="/"><strong>Login</strong></a></p>
                                </Form>
                                <p className="btm--text"><a href="#">Terms and conditions</a><FaCircle className="mx-3" /><a href="#">Privacy policy</a></p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default RegisterPage;