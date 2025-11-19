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
import { MdOutlineDataUsage } from "react-icons/md";
import { AiOutlineProject } from "react-icons/ai";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { MdOutlineAnalytics } from "react-icons/md";
import { MdLibraryBooks } from "react-icons/md";
import { MdDesignServices } from "react-icons/md";
import { AiOutlineShop } from "react-icons/ai";
import { BsJournalBookmark } from "react-icons/bs";
import { FcSalesPerformance } from "react-icons/fc";
import { FaUsers } from "react-icons/fa";
import { MdOutlineSubscriptions } from "react-icons/md";
import { MdOutlineCampaign } from "react-icons/md";
import { PiFunnelSimpleBold } from "react-icons/pi";
import { MdOutlineMail } from "react-icons/md";
import { RiUserCommunityLine } from "react-icons/ri";
import { MdLightbulbOutline } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineColorLens } from "react-icons/md";
import { TbSettingsCog } from "react-icons/tb";
import { BiStoreAlt } from "react-icons/bi";
import { GrGift } from "react-icons/gr";
import { GrUpgrade } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";

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
                        {/* <Dropdown className="profile--dropdown">
                            <Dropdown.Toggle id="dropdown-basic">WORKSPACE</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#"><span><FaCog /></span> Settings</Dropdown.Item>
                                <Dropdown.Item href="#"><span><FaSignOutAlt /></span> Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
                        <div class="nav-section-title">Overview</div>
                        <Nav.Link href="/dashboard" className={location.pathname === "/dashboard" ? 'active' : ''}><span><FiHome /></span> Dashboard</Nav.Link>
                         <Nav.Link as={Link} to="/analytics" className={location.pathname === "/analytics" ? 'active' : ''}><span><AiOutlineFundProjectionScreen /></span> Analytics</Nav.Link>
                        <div class="nav-section-title">Products & Content</div>
                        <NavDropdown
                            title={<p><span><AiOutlineProject /> </span> Projects</p>}
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
                        <Nav.Link as={Link} to="/discover" className={location.pathname === "/discover" ? 'active' : ''}><span><MdOutlineAnalytics /></span> Discover</Nav.Link>
                        <Nav.Link as={Link} to="/learn" className={location.pathname === "/learn" ? 'active' : ''}><span><MdLibraryBooks  /></span> Learn </Nav.Link>
                        <Nav.Link as={Link} to="/create" className={location.pathname === "/create" ? 'active' : ''}><span><MdDesignServices  /></span> Create</Nav.Link>
                        <Nav.Link as={Link} to="/market-research" className={location.pathname === "/market-research" ? 'active' : ''}><span><AiOutlineShop  /></span> Marketplace</Nav.Link>
                        <Nav.Link as={Link} to="/courses" className={location.pathname === "/courses-LMS" ? 'active' : ''}><span><BsJournalBookmark  /></span> Courses & LMS</Nav.Link>
                        <NavDropdown
                            title={<p><span><img src="../images/template-icon.png" alt="Templates" /></span> Personalisation</p>}
                            id="dropdown-content-tools"
                            show={openDropdowns['content-tools']}
                            onToggle={() => toggleDropdown('content-tools')}
                        >
                            <NavDropdown.Item href={links.Upload_footage_list} target="_blank" className={location.pathname === "/upload-footage" ? 'submenu-active' : ''}><span><MdOutlineUploadFile /></span>  Image</NavDropdown.Item>
                            <NavDropdown.Item href={links.File_generator} target="_blank" className={location.pathname === "/file-name-generator" ? 'submenu-active' : ''}><span><FaListUl /></span> Text</NavDropdown.Item>
                            
                            <NavDropdown.Item href={links.Scripdb_link} target="_blank" className={location.pathname === "/script-library" ? 'submenu-active' : ''}> <span><RiFilePaper2Line /></span> SPeech</NavDropdown.Item>
                            <NavDropdown.Item href={links.Translation_link} target="_blank" className={location.pathname === "/translators" ? 'submenu-active' : ''}> <span><RiTranslate /></span> Audio</NavDropdown.Item>
                            
                            <NavDropdown.Item href="/templates" className={location.pathname === "/templates" ? 'submenu-active' : ''}> <span><CiGrid31 /></span> Transcribe</NavDropdown.Item>
                        </NavDropdown>

                        <div class="nav-section-title">Business</div>
                        <Nav.Link href="#link"><span><FcSalesPerformance /></span> Sales & Orders</Nav.Link>
                        <Nav.Link href="#link"><span><FaUsers /></span> Customers</Nav.Link>
                        <Nav.Link href="#link"><span><MdOutlineSubscriptions /></span> Subscriptions</Nav.Link>

                        <div class="nav-section-title">Marketing</div>
                        <Nav.Link href="#link"><span><MdOutlineCampaign  /></span> Campaigns</Nav.Link>
                        <Nav.Link href="#link"><span><PiFunnelSimpleBold /></span> Funnels</Nav.Link>
                        <Nav.Link href="#link"><span><MdOutlineMail  /></span> Email Marketing</Nav.Link>

                        <div class="nav-section-title">Community</div>
                        <Nav.Link href="#link"><span><RiUserCommunityLine /></span> Community</Nav.Link>
                        <Nav.Link href="#link"><span><MdLightbulbOutline  /></span> Opportunities</Nav.Link>
                        <Nav.Link href="#link"><span><BiSupport /></span> Support </Nav.Link>

                        <div class="nav-section-title">Personalisation </div>
                        <Nav.Link as={Link} to="/users" className={location.pathname === "/users" ? 'active' : ''}><span><CgProfile  /></span> Profile</Nav.Link>
                        <Nav.Link href="#link"><span><IoBarChartOutline /></span> Memory</Nav.Link>
                        <Nav.Link href="/regional-highlights" className={location.pathname === "/regional-highlights" ? 'active' : ''}><span><MdOutlineDataUsage  /></span>  Usage</Nav.Link>
                        

                        <div class="nav-section-title">1000ideas Platform</div>
                        <Nav.Link href="#link"><span><MdOutlineColorLens /></span> Studio Toolkits</Nav.Link>
                        <Nav.Link href="#link"><span><TbSettingsCog  /></span> Integrations</Nav.Link>
                        <Nav.Link href="#link"><span><BiStoreAlt /></span> Storefront </Nav.Link>

                      
                      <div class="nav-section-title"> Growth </div>

                        <NavDropdown
                            title={<p><span><GrGift /></span> Whats's  New</p>}
                            id="dropdown-playbooks"
                            show={openDropdowns['playbooks']}
                            onToggle={() => toggleDropdown('playbooks')}
                        >
                            <NavDropdown.Item
                                href="/playbooks"
                                className={location.pathname === "/playbooks" ? 'submenu-active' : ''}
                            >
                                Growth
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                href="/how-tos"
                                className={location.pathname === "/how-tos" ? 'submenu-active' : ''}
                            >
                                How Tos
                            </NavDropdown.Item>
                        </NavDropdown> 
                        <Nav.Link href="#link"><span><GrUpgrade /></span> Upgrade </Nav.Link>

                        <div class="nav-section-title"> Settings </div>
                        <Nav.Link href="#link"><span><IoMdSettings /></span> Settings </Nav.Link>
                        <Nav.Link href="#link"><span><IoMdLogOut /></span> Logout </Nav.Link>


                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default SidebarPanel;
