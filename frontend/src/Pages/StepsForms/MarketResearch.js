import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import HeaderSite from "../../Componets/Header/Header";
import SidebarPanel from "../../Componets/Sidebar/Sidebar";
import "./steps.css";
import { MdInsertChartOutlined } from "react-icons/md";
import { MdLightbulbOutline } from "react-icons/md";
const steps = [
  "Market Research",
  "Niche Selection",
  "Content Planning",
  "Design Setup",
  "Product Generation",
  "Variants & Bundles",
  "Launch & Optimize",
];

const overviewStats = [
  { label: "AVG SALES/MONTH", value: "2,847", sub: "+23%" },
  { label: "AVG PRICE", value: "$12.99" },
  { label: "COMPETITION", value: "Medium", chip: "Mod" },
  { label: "TIME TO PROFIT", value: "14-30d" },
];

const niches = [
  {
    title: "Health & Wellness",
    subtitle: "Fitness, nutrition, mental health",
    tag: { text: "Hot", variant: "success" },
    rating: "4.8★",
    price: "$14",
    sales: "3.2K",
  },
  {
    title: "Productivity",
    subtitle: "Goal setting, planning, habits",
    tag: { text: "Hot", variant: "success" },
    rating: "4.7★",
    price: "$11",
    sales: "2.9K",
  },
  {
    title: "Business & Finance",
    subtitle: "Budgeting, entrepreneurship",
    tag: { text: "Growing", variant: "info" },
    rating: "4.6★",
    price: "$16",
    sales: "2.1K",
  },
  {
    title: "Education",
    subtitle: "Study guides, worksheets",
    tag: { text: "Stable", variant: "secondary" },
    rating: "4.5★",
    price: "$9",
    sales: "1.8K",
  },
  {
    title: "Parenting",
    subtitle: "Baby books, family organizers",
    tag: { text: "Stable", variant: "secondary" },
    rating: "4.7★",
    price: "$13",
    sales: "1.5K",
  },
  {
    title: "Creative Arts",
    subtitle: "Art journals, prompts",
    tag: { text: "Niche", variant: "info" },
    rating: "4.8★",
    price: "$10",
    sales: "1.2K",
  },
];

function MarketResearch() {
  const [selectedNiche, setSelectedNiche] = useState(null);

  const navigate = useNavigate();
  const handleNicheClick = (title, isSelected) => {
    // single select – click again to unselect
    
    setSelectedNiche((prev) => (prev === title ? null : title));
  };

  useEffect(() => {
      const saved = localStorage.getItem("step1_marketplace");
      if (saved) {
          setSelectedNiche(saved);
      }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedNiche) return;

    // TODO: send to API, move to next step, etc.
    console.log("Selected niche:", selectedNiche);
    localStorage.setItem("step1_marketplace", selectedNiche);
    navigate("/niche-selection");
  };

  return (
    <div className="App">
      <HeaderSite />
      <section className="main__wrapper">
        <SidebarPanel />
        <div className="main-box">
          <div className="market-page">
            <Container fluid className="py-5 px-5">
              {/* Header */}
              <div className="mb-4">
                <h3 className="fw-bold">Workbook/Journal Builder</h3>
                <p className="text-muted mb-0">
                  Turn your idea into ready-to-sell digital products in minutes
                </p>
              </div>

              {/* Stepper */}
              <Card className="shadow-sm mb-5">
                <Card.Body className="py-4">
                  <div className="stepper d-flex justify-content-between align-items-center">
                    {steps.map((label, index) => {
                      const active = index === 0;
                      return (
                        <div
                          key={label}
                          className="stepper-item d-flex flex-column align-items-center flex-fill"
                        >
                          <div className="stepper-line" />
                          <div
                            className={
                              "stepper-circle d-flex align-items-center justify-content-center " +
                              (active ? "active" : "")
                            }
                          >
                            {index + 1}
                          </div>
                          <div className="mt-2 text-center">
                            <small
                              className={active ? "fw-semibold" : "text-muted"}
                            >
                              {label}
                            </small>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card.Body>
              </Card>

              {/* FORM STARTS HERE */}
              <form onSubmit={handleSubmit}>
                {/* Title + description */}
                <div className="mb-4">
                  <h4 className="fw-bold">
                    Market Research &amp; Opportunity Analysis
                  </h4>
                  <p className="text-muted mb-0">
                    We've analyzed top-selling workbooks and journals to find
                    the best opportunities for you.
                  </p>
                </div>

                {/* Market Overview (read-only) */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient border-0 d-flex align-items-center">
                    <span className="me-2 mr-2"><MdInsertChartOutlined className="heading-icons" /></span>
                    <span className="fw-semibold heading-gradient">Market Overview</span>
                  </Card.Header>
                  <Card.Body>
                    <Row className="g-3 mb-3">
                      {overviewStats.map((stat) => (
                        <Col key={stat.label} md={3}>
                          <Card className="stat-card h-100">
                            <Card.Body>
                              <small className="text-uppercase text-muted fw-semibold my-font-weight-bold">
                                {stat.label}
                              </small>
                              <div className="d-flex align-items-center justify-content-center mt-2">
                                <h4 className="mb-0 mr-2 fw-bold">
                                  {stat.value}
                                </h4>
                                {stat.sub && (
                                  <Badge bg="success" pill className="ms-2">
                                    {stat.sub}
                                  </Badge>
                                )}
                                {stat.chip && (
                                  <Badge
                                    bg="warning"
                                    pill
                                    className="ms-2 text-dark"
                                  >
                                    {stat.chip}
                                  </Badge>
                                )}
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>

                    <Card className="border-0 insight-card">
                      <Card.Body className="d-flex align-items-start">
                        <span className="me-2">💡</span>
                        <div>
                          <span className="fw-semibold">Key Insight: </span>
                          <span className="text-muted my-font-weight-bold">
                            Health &amp; wellness workbooks show 23% growth.
                            Products with tracking features convert 40% better
                            than simple journals.
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Card.Body>
                </Card>

                {/* Top Opportunities – selectable cards */}
                <Card className="border-0 shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient border-0 d-flex justify-content-between align-items-center">
                    <div className="d-flex">
                      <span className="me-2 mr-2"><MdLightbulbOutline  className="heading-icons" /></span>
                      <span className="fw-semibold heading-gradient">
                        Top Opportunities by Niche
                      </span>
                    </div>
                    <Button variant="outline-secondary btn-background-box" size="sm" type="button">
                      ⟳ Refresh Data
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <Row className="g-3">
                      {niches.map((niche) => {
                        const isSelected = selectedNiche === niche.title;
                        return (
                          <Col key={niche.title} md={4} className="mb-4">
                            <Card
                              className={
                                "niche-card h-100 selectable " +
                                (isSelected ? "selected" : "")
                              }
                              onClick={() => handleNicheClick(niche.title, isSelected)}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  handleNicheClick(niche.title, isSelected);
                                }
                              }}
                            >
                              
                              <Card.Body>
                                
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                  <div>
                                    <h6 className="fw-semibold mb-0 text-left">
                                      {niche.title}
                                    </h6>
                                    <small className="text-muted my-font-weight-bold">
                                      {niche.subtitle}
                                    </small>
                                  </div>
                                  <Badge bg={niche.tag.variant}>
                                    {niche.tag.text}
                                  </Badge>
                                </div>

                                <Row className="pt-3">
                                  <Col xs={4}>
                                    <div className="niche-stat">
                                      <div className="fw-semibold">
                                        {niche.rating}
                                      </div>
                                      <small className="text-muted my-font-weight-bold">
                                        Rating
                                      </small>
                                    </div>
                                  </Col>
                                  <Col xs={4}>
                                    <div className="niche-stat">
                                      <div className="fw-semibold">
                                        {niche.price}
                                      </div>
                                      <small className="text-muted my-font-weight-bold">
                                        Avg Price
                                      </small>
                                    </div>
                                  </Col>
                                  <Col xs={4}>
                                    <div className="niche-stat">
                                      <div className="fw-semibold">
                                        {niche.sales}
                                      </div>
                                      <small className="text-muted my-font-weight-bold">
                                        Sales/mo
                                      </small>
                                    </div>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        );
                      })}
                    </Row>
                  </Card.Body>
                </Card>

                {/* Bottom submit button */}
                <div className="d-flex justify-content-end mt-4">
                        {/* <Link to="/niche-selection"> */}
                  <Button
                    type="submit"
                    variant="primary"
                    className="select-niche-btn bg-blue-gradient"
                    disabled={!selectedNiche}
                  >
                    Select Your Niche &rarr;
                  </Button>
                  {/* </Link> */}
                </div>
              </form>
              {/* FORM ENDS */}
            </Container>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MarketResearch;
