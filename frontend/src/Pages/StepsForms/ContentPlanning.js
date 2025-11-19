// src/Pages/Steps/ContentPlanning.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "../../App.css";
import HeaderSite from "../../Componets/Header/Header";
import SidebarPanel from "../../Componets/Sidebar/Sidebar";
import "./steps.css";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { MdOutlineFeaturedPlayList } from "react-icons/md"; 
import { FiLayout } from "react-icons/fi";

const steps = [
  "Market Research",
  "Niche Selection",
  "Content Planning",
  "Design Setup",
  "Product Generation",
  "Variants & Bundles",
  "Launch & Optimize",
];

const pageCountOptions = [
  "50–80 pages",
  "80–100 pages",
  "100–150 pages",
  "150–200 pages",
  "200+ pages",
];

const timePeriodOptions = [
  "30 days",
  "60 days",
  "Quarterly (90 days)",
  "6 months",
  "12 months",
];

const coreFeatureList = [
  { id: "daily", label: "Daily Tracking Pages", defaultChecked: true },
  { id: "weeklySummary", label: "Weekly Summary Pages", defaultChecked: true },
  { id: "monthlyReview", label: "Monthly Review Pages", defaultChecked: true },
  { id: "mealPlanning", label: "Meal Planning Section" },
  { id: "medicalLog", label: "Medical Appointments Log" },
  { id: "medTracker", label: "Medication Tracker" },
  { id: "exerciseLog", label: "Exercise Log" },
  { id: "educationContent", label: "Educational Content" },
  { id: "goalSetting", label: "Goal Setting Pages" },
  { id: "notesReflections", label: "Notes & Reflections" },
];

const layoutOptions = [
  {
    id: "structured",
    title: "Structured & Guided",
    description: "Clear sections, plenty of prompts",
  },
  {
    id: "flexible",
    title: "Flexible & Open",
    description: "More white space, fewer constraints",
  },
  {
    id: "mixed",
    title: "Mixed Format",
    description: "Combination of structured and free-form",
  },
];

const additionalPrefsList = [
  { id: "quotes", label: "Include inspirational quotes", defaultChecked: true },
  { id: "tips", label: "Add helpful tips throughout", defaultChecked: true },
  {
    id: "samples",
    label: "Include sample entries as examples",
    defaultChecked: false,
  },
];

function ContentPlanning() {
  const currentStepIndex = 2; // 0-based: step 3
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [pageCount, setPageCount] = useState("100–150 pages");
  const [timePeriod, setTimePeriod] = useState("Quarterly (90 days)");

  const [selectedCoreFeatures, setSelectedCoreFeatures] = useState(
    coreFeatureList
      .filter((f) => f.defaultChecked)
      .map((f) => f.id)
  );

  const [layoutPreference, setLayoutPreference] = useState("structured");

  const [additionalPrefs, setAdditionalPrefs] = useState(
    additionalPrefsList
      .filter((p) => p.defaultChecked)
      .map((p) => p.id)
  );

  const toggleCoreFeature = (id) => {
    setSelectedCoreFeatures((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAdditionalPref = (id) => {
    setAdditionalPrefs((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSuggestFeatures = () => {
    // stub – you can plug in AI here later
    if (!productName) {
      setProductName(
        "Diabetes Management Workbook – 90 Day Tracking Journal"
      );
    }
  };

  useEffect(() => {
  const saved = localStorage.getItem("step3_content_planning");
  if (!saved) return;

  try {
    const data = JSON.parse(saved);

    if (data.productName) setProductName(data.productName);
    if (data.pageCount) setPageCount(data.pageCount);
    if (data.timePeriod) setTimePeriod(data.timePeriod);

    if (data.selectedCoreFeatures)
      setSelectedCoreFeatures(data.selectedCoreFeatures);

    if (data.layoutPreference)
      setLayoutPreference(data.layoutPreference);

    if (data.additionalPrefs)
      setAdditionalPrefs(data.additionalPrefs);

  } catch (err) {
    console.error("Error loading step3_content_planning:", err);
  }
}, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: send data / store in state
    const step3Data = {
      productName: productName,
      pageCount: pageCount,
      timePeriod: timePeriod,
      selectedCoreFeatures: selectedCoreFeatures,
      layoutPreference: layoutPreference,
      additionalPrefs: additionalPrefs,
    };
    localStorage.setItem("step3_content_planning", JSON.stringify(step3Data));
    navigate("/design-setup");
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

              {/* Stepper – steps 1 & 2 completed, 3 active */}
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
                  <h4 className="fw-bold">Content Planning</h4>
                  <p className="text-muted mb-0">
                    Define your workbook structure and content elements.
                  </p>
                </div>

                {/* Workbook Details */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient border-0 niche-section-header d-flex align-items-center">
                     <span className="me-2 mr-2 d-flex"><MdOutlineLibraryBooks className="heading-icons" /></span>
                     <span className="fw-semibold heading-gradient">Workbook Details</span>
                  </Card.Header>
                  <Card.Body>
                    <Row className="gy-3">
                      <Col md={12} className="mb-3">
                        <Form.Group className="text-left">
                          <Form.Label className="text-muted small fw-semibold  my-font-weight-bold">
                            Product Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="e.g., Diabetes Management Workbook - 90 Day Tracking Journal"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="box" controlId="primaryCategory">
                           <Form.Label className="text-muted small fw-semibold">
                            Target Page Count
                          </Form.Label>
                          <Form.Select size="lg"
                            value={pageCount}
                            onChange={(e) => setPageCount(e.target.value)}
                            className="primary-category-select"
                          >
                            {pageCountOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="box" controlId="primaryCategory">
                           <Form.Label className="text-muted small fw-semibold">
                            Time Period
                          </Form.Label>
                          <Form.Select size="lg"
                            value={timePeriod}
                            onChange={(e) => setTimePeriod(e.target.value)}
                            className="primary-category-select"
                          >
                            {timePeriodOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Core Features */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient border-0 niche-section-header d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center text-left "> 
                      <span className="me-2 mr-2 d-flex"><MdOutlineFeaturedPlayList  className="heading-icons" /></span>
                      <span className="fw-semibold heading-gradient">Core Features</span>
                    </div>

                    <Button className="btn-background-box"
                      variant="outline-secondary"
                      size="sm"
                      type="button"
                      onClick={handleSuggestFeatures}
                    >
                      Suggest Features
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <Row className="g-2">
                      {coreFeatureList.map((feature) => {
                        const isSelected = selectedCoreFeatures.includes(
                          feature.id
                        );
                        return (
                          <Col key={feature.id} md={4} className="mb-4">
                            <button
                              type="button"
                              className={
                                "pill-option pill-checkbox-option " +
                                (isSelected ? "selected" : "")
                              }
                              onClick={() => toggleCoreFeature(feature.id)}
                            >
                              <span
                                className={
                                  "pill-checkbox " +
                                  (isSelected ? "checked" : "")
                                }
                              />
                              <span>{feature.label}</span>
                            </button>
                          </Col>
                        );
                      })}
                    </Row>
                  </Card.Body>
                </Card>

                {/* Page Layout Preferences */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient border-0 niche-section-header d-flex align-items-center">
                    <span className="me-2 mr-2 d-flex"><FiLayout  className="heading-icons" /></span>
                    <span className="fw-semibold heading-gradient">Page Layout Preferences</span>
                  </Card.Header>
                  <Card.Body>
                    <Row className="gy-3 mb-3">
                      {layoutOptions.map((opt) => {
                        const isSelected = layoutPreference === opt.id;
                        return (
                          <Col key={opt.id} md={4}>
                            <button
                              type="button"
                              className={
                                "pill-option pill-radio-option " +
                                (isSelected ? "selected" : "")
                              }
                              onClick={() => setLayoutPreference(opt.id)}
                            >
                              <span
                                className={
                                  "pill-radio " +
                                  (isSelected ? "checked" : "")
                                }
                              />
                              <span className="text-start">
                                <div className="fw-semibold small text-left">
                                  {opt.title}
                                </div>
                                <div className="text-muted tiny-text  my-font-weight-bold">
                                  {opt.description}
                                </div>
                              </span>
                            </button>
                          </Col>
                        );
                      })}
                    </Row>

                    <Row className="g-2 mt-2">
                      <Col md={12}>
                        <div className="text-muted text-left small fw-semibold my-font-weight-bold mt-3 mb-2">
                          Additional Preferences
                        </div>
                      </Col>
                      {additionalPrefsList.map((pref) => {
                        const isSelected = additionalPrefs.includes(pref.id);
                        return (
                          <Col key={pref.id} md={4}>
                            <button
                              type="button"
                              className={
                                "pill-option pill-checkbox-option " +
                                (isSelected ? "selected" : "")
                              }
                              onClick={() => toggleAdditionalPref(pref.id)}
                            >
                              <span
                                className={
                                  "pill-checkbox " +
                                  (isSelected ? "checked" : "")
                                }
                              />
                              <span>{pref.label}</span>
                            </button>
                          </Col>
                        );
                      })}
                    </Row>
                  </Card.Body>
                </Card>

                {/* Footer buttons */}
                <div className="d-flex justify-content-between mt-4">
                  <Link to="/niche-selection">
                    <Button
                      variant="outline-secondary"
                      type="button"
                      className="select-niche-btn"
                    >
                      ← Back to Niche Selection
                    </Button>
                  </Link>

                  <Button
                    type="submit"
                    variant="primary"
                    className="select-niche-btn bg-blue-gradient"
                  >
                    Continue to Design Setup →
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

export default ContentPlanning;
