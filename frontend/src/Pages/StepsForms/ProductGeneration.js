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

import { VscSymbolColor } from "react-icons/vsc";
import { RiFileSettingsLine } from "react-icons/ri";
import { MdOutlineOutput } from "react-icons/md";
import { MdLibraryAdd } from "react-icons/md";
import { MdOutlineElectricBolt } from "react-icons/md";
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

// configuration summary just for display – you can replace with real data
const configSummary = [
  { label: "Category", value: "Health & Wellness" },
  { label: "Sub-Niche", value: "Diabetes Management" },
  { label: "Page Count", value: "~120 pages" },
  { label: "Time Period", value: "90 days" },
  { label: "Style", value: "Clean & Modern" },
  { label: "Color", value: "Teal palette" },
];

const outputFormats = [
  {
    id: "pdf_us",
    label: 'PDF (8.5" × 11" US Letter)',
    defaultChecked: true,
  },
  { id: "pdf_a4", label: "PDF (A4)", defaultChecked: true },
  { id: "tablet_ipad", label: "Tablet Format (iPad)" },
  { id: "pdf_a5", label: "PDF (A5)" },
  { id: "editable_docx", label: "Editable Word Template" },
];

const additionalElements = [
  { id: "cover", label: "Cover Page", defaultChecked: true },
  {
    id: "instructions",
    label: "Instructions/How to Use",
    defaultChecked: true,
  },
  { id: "toc", label: "Table of Contents", defaultChecked: true },
  { id: "bonus", label: "Bonus Templates" },
];

function ProductGeneration() {
  const currentStepIndex = 4; // 0-based: step 5
  const navigate = useNavigate();

  const [selectedOutputs, setSelectedOutputs] = useState(
    outputFormats.filter((o) => o.defaultChecked).map((o) => o.id)
  );
  const [selectedElements, setSelectedElements] = useState(
    additionalElements.filter((o) => o.defaultChecked).map((o) => o.id)
  );

  useEffect(() => {
    const saved = localStorage.getItem("step5_product_generation");
    if (!saved) return;

    try {
      const data = JSON.parse(saved);

      if (data.selectedOutputs) {
        setSelectedOutputs(data.selectedOutputs);
      }

      if (data.selectedElements) {
        setSelectedElements(data.selectedElements);
      }
    } catch (err) {
      console.error("Error loading step5_product_generation:", err);
    }
  }, []);


  const toggleFromList = (id, setter) => {
    setter((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleStartGeneration = () => {
    const step5Data = {
      selectedOutputs: selectedOutputs,
      selectedElements: selectedElements,
    };
    localStorage.setItem("step5_product_generation", JSON.stringify(step5Data));
    navigate("/variants-bundles");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleStartGeneration();
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

              {/* Stepper – 1–4 completed; 5 active */}
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
                  <h4 className="fw-bold">Generate Your Products</h4>
                  <p className="text-muted mb-0">
                    Review your configuration and generate production-ready
                    files.
                  </p>
                </div>

                {/* Configuration Summary */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient border-0 niche-section-header d-flex align-items-center">
                    <span className="me-2 mr-2 d-flex">
                      <RiFileSettingsLine className="heading-icons" />
                    </span>
                    <span className="fw-semibold heading-gradient">
                      Configuration Summary
                    </span>
                  </Card.Header>
                  <Card.Body>
                    <Row className="summary-grid">
                      {configSummary.map((item) => (
                        <Col
                          key={item.label}
                          md={2}
                          sm={4}
                          xs={6}
                          className="mb-3"
                        >
                          <div className="summary-item text-left">
                            <div className="summary-label my-font-weight-bold">
                              {item.label}
                            </div>
                            <div className="summary-value">
                              {item.value}
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>

                {/* Output Formats */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient border-0 niche-section-header d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center text-left">
                      <span className="me-2 mr-2 d-flex">
                        <MdOutlineOutput className="heading-icons" />
                      </span>
                      <span className="fw-semibold heading-gradient">
                        Output Formats
                      </span>
                    </div>

                    <Button
                      type="button"
                      variant="outline-secondary"
                      size="sm"
                      className="btn-background-box"
                      onClick={() =>
                        setSelectedOutputs(outputFormats.map((o) => o.id))
                      }
                    >
                      Select All
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <Row className="g-2">
                      {outputFormats.map((opt) => {
                        const isSelected = selectedOutputs.includes(opt.id);
                        return (
                          <Col key={opt.id} md={6} className="mb-3">
                            <button
                              type="button"
                              className={
                                "pill-option pill-checkbox-option check-row-option " +
                                (isSelected ? "selected" : "")
                              }
                              onClick={() =>
                                toggleFromList(opt.id, setSelectedOutputs)
                              }
                            >
                              <span
                                className={
                                  "pill-checkbox " +
                                  (isSelected ? "checked" : "")
                                }
                              />
                              <span className="text-left">
                                {opt.label}
                              </span>
                            </button>
                          </Col>
                        );
                      })}
                    </Row>
                  </Card.Body>
                </Card>

                {/* Additional Elements */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient border-0 niche-section-header d-flex align-items-center">
                    <span className="me-2 mr-2 d-flex">
                      <MdLibraryAdd className="heading-icons" />
                    </span>
                    <span className="fw-semibold heading-gradient">
                      Additional Elements
                    </span>
                  </Card.Header>
                  <Card.Body>
                    <Row className="g-2">
                      {additionalElements.map((opt) => {
                        const isSelected = selectedElements.includes(opt.id);
                        return (
                          <Col key={opt.id} md={6} className="mb-3">
                            <button
                              type="button"
                              className={
                                "pill-option pill-checkbox-option check-row-option " +
                                (isSelected ? "selected" : "")
                              }
                              onClick={() =>
                                toggleFromList(opt.id, setSelectedElements)
                              }
                            >
                              <span
                                className={
                                  "pill-checkbox " +
                                  (isSelected ? "checked" : "")
                                }
                              />
                              <span className="text-left">
                                {opt.label}
                              </span>
                            </button>
                          </Col>
                        );
                      })}
                    </Row>
                  </Card.Body>
                </Card>

                {/* AI Generation Engine */}
                <Card className="ai-generation-card shadow-sm mb-4">
                  <Card.Body className="d-flex align-items-center justify-content-between flex-wrap">
                    <div className="d-flex align-items-start gap-3 mb-3 mb-md-3">
                      <div className="ai-icon-wrap mr-2">
                        <MdOutlineElectricBolt />
                      </div>
                      <div className="text-left">
                        <div className="fw-semibold mb-1">
                          AI Generation Engine
                        </div>
                        <div className="small text-muted my-font-weight-bold">
                          Our system will automatically generate
                          production-ready files including document assembly,
                          layout optimization, quality checks, and packaging.
                          Estimated time: 8–12 minutes.
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="select-niche-btn bg-blue-gradient start-generation-btnn"
                    >
                      Start Generation
                    </Button>
                  </Card.Body>
                </Card>

                {/* Footer buttons */}
                <div className="d-flex justify-content-start mt-4">
                  <Link to="/design-setup">
                    <Button
                      variant="outline-secondary"
                      type="button"
                      className="select-niche-btn"
                    >
                      ← Back to Design Setup
                    </Button>
                  </Link>
                </div>
              </form>
            </Container>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductGeneration;
