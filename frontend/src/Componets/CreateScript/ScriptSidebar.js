import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { FaCog, FaSignOutAlt, FaListUl } from 'react-icons/fa';
import { RiFilePaper2Line } from "react-icons/ri";
import { FiHome } from "react-icons/fi";
import { TbScriptPlus } from "react-icons/tb";
import { IoChatbubblesOutline } from "react-icons/io5";
import { BsArrowLeft } from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import useLogout from '../../utils/useLogout';
import { isAuthenticatedName } from '../../utils/auth';

function ScriptSidebarPanel() {
    const location = useLocation();
    const [isActive, setIsActive] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState({}); // Track state of individual dropdowns

    const handleClick = () => {
        setIsActive((current) => !current);
    };

    const logout = useLogout();

    const [username, setUsername] = useState("Home");

    useEffect(() => {
        if (isAuthenticatedName()) {
            const userData = localStorage.getItem('user');
            const user = userData ? JSON.parse(userData) : null;
            const username = user ? user.data : null;
            setUsername(username);
        }
    }, []);

    const user = useSelector((state) => JSON.parse(localStorage.getItem('user')));

    // Define dropdown paths to determine which dropdown should be open
    const dropdownPaths = {
        'video-creation': ["/create-project", "/project-list"],
        'content-tools': ["/script-library", "/script-generator", "/translators", "/templates", "/file-name-generator", "/upload-footage"],
        'regional-highlights': ["/regional-highlights"],
        'playbooks': ["/playbooks", "/how-tos"],
        'skills-directory': ["/skills-directory"]
    };

    // Automatically open dropdowns based on the current path
    useEffect(() => {
        const updatedDropdowns = {};
        Object.keys(dropdownPaths).forEach((key) => {
            updatedDropdowns[key] = dropdownPaths[key].includes(location.pathname);
        });
        setOpenDropdowns(updatedDropdowns);
    }, [location.pathname]);

    const toggleDropdown = (dropdownId) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [dropdownId]: !prev[dropdownId], // Toggle the specific dropdown
        }));
    };

    return (
        <div className={isActive ? 'collapse--panel--sidebar' : 'panel--sidebar'}>
            <Navbar expand="lg">
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    className={isActive ? 'button--Toggle' : 'btn--Click'}
                    onClick={handleClick}
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        {user?.role === 'admin' && (
                            <>
                                <Nav.Link className="back--arrow" href="/dashboard"><span><BsArrowLeft /></span></Nav.Link>
                                <Dropdown className="profile--dropdown">
                                    <Dropdown.Toggle id="dropdown-basic">WE</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#"><span><FaCog /></span> Settings</Dropdown.Item>
                                        <Dropdown.Item href="#" onClick={logout}><span><FaSignOutAlt /></span> Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Nav.Link href="/dashboard" className={location.pathname === "/dashboard" ? 'active' : ''}><span><FiHome /></span> Dashboard</Nav.Link>
                                <Nav.Link href="/script-library" className={location.pathname === "/script-library" ? 'active' : ''}><span><TbScriptPlus /></span> Upload Script</Nav.Link>
                                <Nav.Link href="/script-generator" className={location.pathname === "/script-generator" ? 'active' : ''}><span><FaListUl /></span> Generative Script</Nav.Link>
                                <Nav.Link href="/library" className={location.pathname === "/library" ? 'active' : ''}><span><RiFilePaper2Line /></span> Script Library</Nav.Link>
                                <Nav.Link href="#home" className={location.pathname === "#" ? 'active' : ''}><span><IoChatbubblesOutline /></span> Chat</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default ScriptSidebarPanel;