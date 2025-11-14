import React, { useEffect, useState } from "react";
import { useLocation, Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { FaListUl, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { RiFilePaper2Line, RiTranslate, RiGlobeLine } from "react-icons/ri";
import { CiGrid31 } from "react-icons/ci";
import { IoBarChartOutline, IoChatbubblesOutline } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi2";
import { BsMap } from 'react-icons/bs';
import { MdOutlineUploadFile } from 'react-icons/md';
import { FiHome, FiFilm, FiFolderPlus, FiFolder } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sidebarStyle.css';
import '../../App.css';

function SidebarPanel() {
    const location = useLocation();
    const [isActive, setIsActive] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState({}); // Track state of individual dropdowns

    const [links, setLinks] = useState({
        File_generator: "",
        File_generator_list: "",
        Upload_footage_list: "",
        Scripdb_link: "",
        Translation_link: ""
      });

    const handleClick = () => {
        setIsActive((current) => !current);
    };

    

    const [username, setUsername] = useState("Home");

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
                        <Dropdown className="profile--dropdown">
                            <Dropdown.Toggle id="dropdown-basic">{username}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#"><span><FaCog /></span> Settings</Dropdown.Item>
                                <Dropdown.Item href="#"><span><FaSignOutAlt /></span> Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Nav.Link href="/dashboard" className={location.pathname === "/dashboard" ? 'active' : ''}><span><FiHome /></span> Dashboard</Nav.Link>
                        <NavDropdown
                            title={<p><span><FiFilm /></span> Video Creation</p>}
                            id="dropdown-video-creation"
                            show={openDropdowns['video-creation']}
                            onToggle={() => toggleDropdown('video-creation')}
                        >
                        <Nav.Link as={Link} to="/create-project" className={location.pathname === "/create-project" ? 'submenu-active' : ''}>
                            <span><FiFolderPlus /></span> New Project
                        </Nav.Link>

                        <Nav.Link as={Link} to="/project-list" className={location.pathname === "/project-list" ? 'submenu-active' : ''}>
                            <span><FiFolder /></span> Projects
                        </Nav.Link>
                            <NavDropdown.Item href="#"><span><img src="../images/ai-icon.png" alt="AI Tools" /></span> AI Tools</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown
                            title={<p><span><img src="../images/template-icon.png" alt="Templates" /></span> Content Tools</p>}
                            id="dropdown-content-tools"
                            show={openDropdowns['content-tools']}
                            onToggle={() => toggleDropdown('content-tools')}
                        >
                            <NavDropdown.Item href={links.Upload_footage_list} target="_blank" className={location.pathname === "/upload-footage" ? 'submenu-active' : ''}><span><MdOutlineUploadFile /></span> Upload Footage</NavDropdown.Item>
                            <NavDropdown.Item href={links.File_generator} target="_blank" className={location.pathname === "/file-name-generator" ? 'submenu-active' : ''}><span><FaListUl /></span> File Name Generator</NavDropdown.Item>
                            
                            <NavDropdown.Item href={links.Scripdb_link} target="_blank" className={location.pathname === "/script-library" ? 'submenu-active' : ''}> <span><RiFilePaper2Line /></span> Script DB</NavDropdown.Item>
                            <NavDropdown.Item href={links.Translation_link} target="_blank" className={location.pathname === "/translators" ? 'submenu-active' : ''}> <span><RiTranslate /></span> Translate App</NavDropdown.Item>
                            
                            <NavDropdown.Item href="/templates" className={location.pathname === "/templates" ? 'submenu-active' : ''}> <span><CiGrid31 /></span> Templates</NavDropdown.Item>
                        </NavDropdown>

                        
                        <Nav.Link as={Link} to="/users" className={location.pathname === "/users" ? 'active' : ''}>
                            <span><HiOutlineUsers /></span> Users
                        </Nav.Link>

                        
                        <Nav.Link href="#link"><span><IoBarChartOutline /></span> Reports</Nav.Link>
                        
                        <Nav.Link href="/regional-highlights" className={location.pathname === "/regional-highlights" ? 'active' : ''}><span><RiGlobeLine /></span> Regional Highlights</Nav.Link>
                        <NavDropdown
                            title={<p><span><BsMap /></span> Playbooks / How Tos</p>}
                            id="dropdown-playbooks"
                            show={openDropdowns['playbooks']}
                            onToggle={() => toggleDropdown('playbooks')}
                        >
                            <NavDropdown.Item
                                href="/playbooks"
                                className={location.pathname === "/playbooks" ? 'submenu-active' : ''}
                            >
                                Playbooks
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                href="/how-tos"
                                className={location.pathname === "/how-tos" ? 'submenu-active' : ''}
                            >
                                How Tos
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#link"><span><img src="../images/skill-icon.png" alt="Skills Directory" /></span> Skills Directory</Nav.Link>
                         
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default SidebarPanel;
