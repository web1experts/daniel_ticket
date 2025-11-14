import React from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Col, Container, Row, Form, ListGroup, Button, Navbar, Nav, Tabs, Tab, CardGroup, Card, Spinner } from "react-bootstrap";
import { FiArrowRight } from "react-icons/fi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderSite from '../../Componets/Header/Header';
import SidebarPanel from "../../Componets/Sidebar/Sidebar";







function index() {
  return (
      <div className="App">
        <HeaderSite />
        <section className="main__wrapper">
        <SidebarPanel/>
        </section>
      </div>
  )
}

export default index