import React, { useEffect, useState, FormEvent } from "react";
import {Col, Container, Row, Form, Button, Navbar, ListGroup, Spinner} from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import "bootstrap/dist/css/bootstrap.min.css";
import "./loginStyle.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { FaCircle, FaApple } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { notValid, emailValidation } from "../../utils/validations";
import toast, { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { signIn, clearAuthState } from "~/store/slices/auth/action";

interface User {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  var userData = localStorage.getItem('user');
  const [siteVerfication, setSiteVerfication]= useState("");

  
  const { data, api_status, isAuthenticated } = useSelector((state: any) => state.auth);

  const [user, setUser] = useState<User>({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [userStatus, setuserStatus] = useState<boolean>(true);

  const handleChangeInput = (target: HTMLInputElement) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const isValid = (): boolean => {
      let isValid = true;
      if (!user.password) {
        toast.error("Please enter a password");
        isValid = false;
      }

      if (!emailValidation(user.email)) {
        toast.error("Please enter a valid email address");
        isValid = false;
      }
      return isValid;
  };

  useEffect(() => {
    // Checking only when result changes
    if(data && data.status==200 && userStatus){
        const userRoles = data.role || [];
        const appRoleKey = import.meta.env.VITE_SITE_VERIFICATION;
        if (userRoles.includes("admin")) {
            setuserStatus(false);
            toast.success("Login successful!");
            localStorage.setItem("user", JSON.stringify(data)); // Ensure that data is stored as a JSON string
            localStorage.setItem("user_id", data.user_id);
            localStorage.setItem("accessToken", data.accessToken);
            setSiteVerfication(import.meta.env.VITE_FILENAME_GENERATOR_LINK);
            const timer = setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        } else if (userRoles.includes(appRoleKey)) {
            setuserStatus(false);
            toast.success("Login successful!");
            localStorage.setItem("user", JSON.stringify(data)); // Ensure that data is stored as a JSON string
            localStorage.setItem("user_id", data.user_id);
            localStorage.setItem("accessToken", data.accessToken);
            setSiteVerfication(import.meta.env.VITE_FILENAME_GENERATOR_LINK);
            const timer = setTimeout(() => {
                // If user has the exact role matching the env value
                navigate("/dashboard");
            }, 1000);
      } else {
          // No permission
          localStorage.removeItem('user');
          localStorage.removeItem('user_id');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('project_id');

          // Clear the token from sessionStorage (if used)
          sessionStorage.removeItem('accessToken');
          dispatch(clearAuthState());
          toast.error("You do not have permission to access this app.");
      } 
    } else if(data && data.status==400){
        dispatch(clearAuthState());
        toast.error("Invalid username or password");
    }
    
    
    if(!data && userData && Object.keys(userData).length > 0 && userData.role?.length > 0){
        console.log(userData);
        const userRoles = userData.role || [];
        const appRoleKey = import.meta.env.VITE_FILENAME_GENERATOR_LINK;
        if (userRoles.includes("admin")) {
              const timer = setTimeout(() => {
                  navigate("/dashboard");
              }, 1000);
          } else if (userRoles.includes(appRoleKey)) {
              const timer = setTimeout(() => {
                  // If user has the exact role matching the env value
                  navigate("/dashboard");
              }, 1000);
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('user_id');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('project_id');
            // Clear the token from sessionStorage (if used)
            sessionStorage.removeItem('accessToken');
            // No permission
            dispatch(clearAuthState());
            toast.error("You do not have permission to access this app.");
        } 
    } 
}, [data, api_status, navigate, userData, userStatus, status, setuserStatus]); // Removed unnecessary `else` condition
  
  

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isValid()) {
      setLoading(true);
      try {
        const resultAction = await dispatch(signIn(user));
        if (signIn.fulfilled.match(resultAction)) {
          setLoading(false);
          // nothing else here – let useEffect handle the result
        } else {
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
      }
    }
  };
  

  return (
    <>
      <section className="login--Wrapper">
        <Toaster position="top-right" reverseOrder={false} />

        <Container fluid>
          <Row>
            <Col sm={12} md={6} lg={7} className="order-last d-none d-md-block pr-md-0">
              <img
                className="bg--login"
                src="./images/Login-graphics.jpg"
                alt="..."
            />
            </Col>

            <Col sm={12} md={6} lg={5}>
              <div className="login--screen">
                <Navbar.Brand href="/">
                  <img src="./images/logo.png" alt="..." />
                </Navbar.Brand>
                <Form onSubmit={onSubmit}>
                  <h5>Sign In</h5>
                  <Form.Group className="form-group">
                    <Form.Control
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={user.email || ""}
                      onChange={(e) => handleChangeInput(e.target)}
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={user.password || ""}
                      onChange={(e) => handleChangeInput(e.target)}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" disabled={loading}>
                      Login
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
                  <p className="mt-2">or sign in with</p>
                  <ListGroup horizontal className="my-3 justify-content-center">
                    <ListGroup.Item>
                      <FaApple />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FcGoogle />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <img src="./images/micro.png" alt="..." />
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <img src="./images/facebook-icon.png" alt="..." />
                    </ListGroup.Item>
                  </ListGroup>
                </Form>
                <p className="btm--text">
                  <a href="#">Terms and conditions</a>
                  <FaCircle className="mx-3" />
                  <a href="#">Privacy policy</a>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default LoginPage;
