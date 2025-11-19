// src/Pages/Steps/NicheSelection.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Form,
  Table,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { PiAngleBold } from "react-icons/pi";
import { MdOutlineChecklist } from "react-icons/md";
import { PiMoneyFill } from "react-icons/pi";
import { MdLightbulbOutline } from "react-icons/md";

import "../../App.css";
import HeaderSite from "../../Componets/Header/Header";
import SidebarPanel from "../../Componets/Sidebar/Sidebar";
import "./steps.css";

const steps = [
  "Market Research",
  "Niche Selection",
  "Content Planning",
  "Design Setup",
  "Product Generation",
  "Variants & Bundles",
  "Launch & Optimize",
];

const primaryCategories = [
  "Health & Wellness",
  "Productivity",
  "Business & Finance",
  "Education",
  "Parenting",
  "Creative Arts",
];

const pricingRows = [
  { range: "$5 – $10", percent: "10%", sales: 423, recommended: "" },
  { range: "$11 – $20", percent: "35%", sales: 892, recommended: "" },
  {
    range: "$21 – $30",
    percent: "28%",
    sales: 1247,
    recommended: "Sweet Spot",
    highlight: true,
  },
  { range: "$31 – $40", percent: "15%", sales: 634, recommended: "" },
  { range: "$50+", percent: "4%", sales: 289, recommended: "" },
];

const subNiches = [
  {
    title: "Diabetes Management",
    subtitle: "Blood sugar tracking, meal planning",
    tag: { text: "High", variant: "success" },
    oppScore: "8.2",
    competition: "Low",
    avgPrice: "$14",
  },
  {
    title: "Fitness Tracking",
    subtitle: "Workout logs, progress tracking",
    tag: { text: "Medium", variant: "primary" },
    oppScore: "7.5",
    competition: "Med",
    avgPrice: "$11",
  },
  {
    title: "Mental Health",
    subtitle: "Mood tracking, therapy journals",
    tag: { text: "High", variant: "success" },
    oppScore: "8.9",
    competition: "Med",
    avgPrice: "$15",
  },
  {
    title: "Weight Loss",
    subtitle: "Food diary, measurements",
    tag: { text: "Saturated", variant: "secondary" },
    oppScore: "5.2",
    competition: "High",
    avgPrice: "$9",
  },
];

function NicheSelection() {
  const currentStepIndex = 1; // 0-based: step 2
  const navigate = useNavigate();

  const [primaryCategory, setPrimaryCategory] = useState("Health & Wellness");
  const [selectedSubNiche, setSelectedSubNiche] = useState(subNiches[0].title);
  const [targetAudience, setTargetAudience] = useState("");
  const [valueProp, setValueProp] = useState("");

  const handleSubNicheClick = (title) => {
    setSelectedSubNiche(title);
  };

  const handleAiSuggest = () => {
    if (!targetAudience) {
      setTargetAudience("Newly diagnosed Type 2 diabetics");
    }
    if (!valueProp) {
      setValueProp(
        "Focus on carb counting with visual trackers and done-for-you meal templates designed for busy professionals."
      );
    }
  };


  useEffect(() => {
    const saved = localStorage.getItem("step2_niche_selection");
    if (!saved) return;

    try {
      const data = JSON.parse(saved);

      if (data.primaryCategory) {
        setPrimaryCategory(data.primaryCategory);
      }
      if (data.subNiche) {
        setSelectedSubNiche(data.subNiche);
      }
      if (data.targetAudience) {
        setTargetAudience(data.targetAudience);
      }
      if (data.valueProp) {
        setValueProp(data.valueProp);
      }
    } catch (err) {
      console.error("Failed to parse step2_niche_selection:", err);
    }
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSubNiche) return;
    // TODO: save data as needed
    const step2Data = {
      primaryCategory: primaryCategory,
      subNiche: selectedSubNiche,
      targetAudience: targetAudience,
      valueProp: valueProp,
    };

    // Save to localStorage as an array (stringified)
    localStorage.setItem("step2_niche_selection", JSON.stringify(step2Data));
    console.log("Step 2 array:", step2Data);
    navigate("/content-planning");
  };

  return (
    <div className="App">
      <HeaderSite />
      <section className="main__wrapper">
        <SidebarPanel />
        <div className="main-box">
          <div className="market-page niche-page">
            <Container fluid className="py-5 px-5">
              {/* Header */}
              <div className="mb-4">
                <h3 className="fw-bold">Workbook/Journal Builder</h3>
                <p className="text-muted mb-0">
                  Turn your idea into ready-to-sell digital products in minutes
                </p>
              </div>

              {/* Stepper with ✓ on step 1 and active step 2 */}
              <Card className="shadow-sm mb-5">
                <Card.Body className="py-4">
                  <div className="stepper d-flex justify-content-between align-items-center">
                    {steps.map((label, index) => {
                      const isCompleted = index < currentStepIndex;
                      const isActive = index === currentStepIndex;

                      return (
                        <div
                          key={label}
                          className="stepper-item d-flex flex-column align-items-center flex-fill"
                        >
                          <div
                            className={
                              "stepper-line " + (isCompleted ? "completed" : "")
                            }
                          />
                          <div
                            className={
                              "stepper-circle d-flex align-items-center justify-content-center " +
                              (isActive ? "active " : "") +
                              (isCompleted ? "completed " : "")
                            }
                          >
                            {isCompleted ? "✓" : index + 1}
                          </div>
                          <div className="mt-2 text-center">
                            <small
                              className={
                                isActive || isCompleted
                                  ? "fw-semibold"
                                  : "text-muted"
                              }
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

              {/* FORM */}
              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-4">
                  <h4 className="fw-bold">
                    Niche Selection &amp; Positioning
                  </h4>
                  <p className="text-muted mb-0">
                    Choose a specific sub-niche and define your unique angle.
                  </p>
                </div>

                {/* Selected Category */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="d-flex align-items-center text-left bg-blue-gradient border-0 niche-section-header">
                    <span className="me-2 mr-2 d-flex"><MdOutlineChecklist className="heading-icons" /></span>
                    <span className="fw-semibold heading-gradient">Selected Category</span>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group className="box" controlId="primaryCategory">
                      <Form.Label className="text-muted small fw-semibold">
                        Primary Category
                      </Form.Label>
                      <Form.Select size="lg"
                        value={primaryCategory}
                        onChange={(e) => setPrimaryCategory(e.target.value)}
                        className="primary-category-select"
                      >
                        {primaryCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Card.Body>
                </Card>

                {/* Pricing Intelligence */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient border-0 niche-section-header d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center text-left "> 
                      <span className="me-2 mr-2 d-flex"><PiMoneyFill className="heading-icons" /></span>
                      <span className="fw-semibold heading-gradient">Pricing Intelligence</span>
                    </div>
                    <span className="text-mutedd small">
                      AI-powered competitive pricing analysis
                    </span>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="fw-semibold small mylabel-color">
                        Price Distribution Analysis
                      </span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        type="button"
                      >
                        Full Pricing Report
                      </Button>
                    </div>

                    <div className="pricing-table-wrapper">
                      <Table
                        responsive
                        bordered={false}
                        className="pricing-table mb-0"
                      >
                        <thead>
                          <tr>
                            <th>Price Range</th>
                            <th>% of Products</th>
                            <th>Avg. Sales/Month</th>
                            <th>Recommended</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pricingRows.map((row) => (
                            <tr
                              key={row.range}
                              className={row.highlight ? "highlight-row" : ""}
                            >
                              <td>{row.range}</td>
                              <td>{row.percent}</td>
                              <td>{row.sales}</td>
                              <td>
                                {row.recommended && (
                                  <Badge bg="success" pill>
                                    {row.recommended}
                                  </Badge>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>

                    <div className="recommended-price-strip mt-3">
                      <div className="fw-semibold small">
                        Recommended Price: <span>$24.99</span>
                      </div>
                      <div className="small text-muted mt-1 mylabel-color">
                        Products in this range see 47% higher sales volume.
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Sub-Niche Opportunities */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="d-flex align-items-center bg-blue-gradient border-0 niche-section-header text-left">
                     <span className="me-2 mr-2 d-flex"><MdLightbulbOutline className="heading-icons" /></span>
                    <span className="fw-semibold heading-gradient">Sub-Niche Opportunities</span>
                  </Card.Header>
                  <Card.Body>
                    <Row className="g-3">
                      {subNiches.map((sub) => {
                        const isSelected = selectedSubNiche === sub.title;
                        return (
                          <Col key={sub.title} md={6} className="mb-4">
                            <Card
                              className={
                                "niche-card h-100 selectable subniche-card " +
                                (isSelected ? "selected" : "")
                              }
                              onClick={() => handleSubNicheClick(sub.title)}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  handleSubNicheClick(sub.title);
                                }
                              }}
                            >
                              <Card.Body>
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                  <div>
                                    <h6 className="fw-semibold mb-0 text-left">
                                      {sub.title}
                                    </h6>
                                    <small className="my-font-weight-bold">
                                      {sub.subtitle}
                                    </small>
                                  </div>
                                  <Badge bg={sub.tag.variant}>
                                    {sub.tag.text}
                                  </Badge>
                                </div>

                                <Row className="pt-3">
                                  <Col xs={4}>
                                    <div className="niche-stat">
                                      <div className="fw-semibold">
                                        {sub.oppScore}
                                      </div>
                                      <small className="my-font-weight-bold">
                                        Opp Score
                                      </small>
                                    </div>
                                  </Col>
                                  <Col xs={4}>
                                    <div className="niche-stat">
                                      <div className="fw-semibold">
                                        {sub.competition}
                                      </div>
                                      <small className="my-font-weight-bold">
                                        Competition
                                      </small>
                                    </div>
                                  </Col>
                                  <Col xs={4}>
                                    <div className="niche-stat">
                                      <div className="fw-semibold">
                                        {sub.avgPrice}
                                      </div>
                                      <small className="my-font-weight-bold">
                                        Avg Price
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

                {/* Your Unique Angle */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient border-0 niche-section-header d-flex justify-content-between align-items-center">
               
                    <div className="d-flex align-items-center text-left "> 
                      <span className="me-2 mr-2 d-flex"><PiAngleBold  className="heading-icons" /></span>
                      <span className="fw-semibold heading-gradient">Your Unique Angle</span>
                    </div>

                    <Button
                    className="btn-background-box"
                      variant="outline-secondary"
                      size="sm"
                      type="button"
                      onClick={handleAiSuggest}
                    >
                      AI Suggest
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <Row className="gy-3">
                      <Col md={6}>
                        <Form.Group className="mb-3 text-left">
                          <Form.Label className="text-left my-font-weight-bold small fw-semibold">
                            Selected Sub-Niche
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={selectedSubNiche || ""}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                     

                      <Col md={6}>
                        <Form.Group className="mb-3 text-left">
                          <Form.Label className="text-left  my-font-weight-bold small fw-semibold">
                            Target Audience
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="e.g., Newly diagnosed Type 2 diabetics"
                            value={targetAudience}
                            onChange={(e) => setTargetAudience(e.target.value)}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={12}>
                        <Form.Group className="text-left ">
                          <Form.Label className="text-left  my-font-weight-bold small fw-semibold">
                            Unique Value Proposition
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="What makes your workbook different? (e.g., Focus on carb counting with visual guides, includes meal prep templates, designed for busy professionals)"
                            value={valueProp}
                            onChange={(e) => setValueProp(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="competitive-edge-strip mt-3">
                      <span className="check-icon">✓</span>
                      <div>
                        <div className="fw-semibold small text-left">
                          Competitive Edge:
                        </div>
                        <div className="small my-font-weight-bold">
                          Your angle targets an underserved segment with
                          specific pain points that existing products don&apos;t
                          address well.
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Footer buttons */}
                <div className="d-flex justify-content-between mt-4">
                  <Link to="/market-research">
                    <Button
                      variant="outline-secondary"
                      type="button"
                      className="select-niche-btn"
                    >
                      ← Back to Market Research
                    </Button>
                  </Link>

                  <Button
                    type="submit"
                    variant="primary"
                    className="select-niche-btn bg-blue-gradient"
                    disabled={!selectedSubNiche}
                  >
                    Continue to Content Planning →
                  </Button>
                </div>
              </form>
            </Container>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NicheSelection;
