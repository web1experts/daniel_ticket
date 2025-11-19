import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  MdOutlineInventory2,
  MdOutlineLayers,
  MdOutlineGroupWork,
  MdOutlineGavel,
} from "react-icons/md";

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

const generatedProducts = [
  {
    id: "us_letter",
    name: "Standard Edition - US Letter",
    details: '120 pages • PDF • 8.5" × 11"',
    status: "Ready",
  },
  {
    id: "a4",
    name: "Standard Edition - A4",
    details: "120 pages • PDF • A4",
    status: "Ready",
  },
];

const variantOptions = [
  { id: "essentials", label: "Essentials Edition (60 pages)" },
  { id: "premium", label: "Premium Edition (180 pages)" },
  { id: "undated", label: "Undated Version" },
  { id: "digital", label: "Digital-Only Version (hyperlinks)" },
];

const bundleOptions = [
  { id: "complete", label: "Complete Wellness Bundle" },
  { id: "yearSupply", label: "Year Supply Bundle (4 quarterly)" },
  { id: "family", label: "Family Bundle (multiple copies)" },
];

const licenseOptions = [
  {
    id: "personal",
    title: "Personal Use Only",
    description: "Standard license",
  },
  {
    id: "personal_commercial",
    title: "Personal + Commercial Rights",
    description: "Both versions",
  },
  {
    id: "plr",
    title: "PLR (Private Label Rights)",
    description: "Rebrand & resell",
  },
];

function VariantsBundles() {
  const currentStepIndex = 5; // 0-based: step 6
  const navigate = useNavigate();

  const [selectedVariants, setSelectedVariants] = useState([]);
  const [selectedBundles, setSelectedBundles] = useState([]);
  const [licenseOption, setLicenseOption] = useState("personal");

  const toggleFromList = (id, setter) => {
    setter((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAutoGenerateVariants = () => {
    // simple preset – select essentials & premium
    setSelectedVariants(["essentials", "premium"]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const step6Data = {
      selectedVariants: selectedVariants,
      selectedBundles: selectedBundles,
      licenseOption: licenseOption,
    };
    localStorage.setItem("step6_variants_bundles", JSON.stringify(step6Data));

    console.log("Saved Step 6 Data:", step6Data);
    navigate("/launch-optimze");
  };

  useEffect(() => {
    const saved = localStorage.getItem("step6_variants_bundles");
    if (!saved) return;

    try {
      const data = JSON.parse(saved);

      if (data.selectedVariants) {
        setSelectedVariants(data.selectedVariants);
      }

      if (data.selectedBundles) {
        setSelectedBundles(data.selectedBundles);
      }

      if (data.licenseOption) {
        setLicenseOption(data.licenseOption);
      }

    } catch (err) {
      console.error("Error loading step6_variants_bundles:", err);
    }
  }, []);


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

              {/* Stepper – 1–5 completed; 6 active */}
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
                  <h4 className="fw-bold">Product Variants &amp; Bundles</h4>
                  <p className="text-muted mb-0">
                    Maximize revenue with different versions and bundle
                    offerings.
                  </p>
                </div>

                {/* Generated Products */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient border-0 niche-section-header d-flex align-items-center">
                    <span className="me-2 mr-2 d-flex">
                      <MdOutlineInventory2 className="heading-icons" />
                    </span>
                    <span className="fw-semibold heading-gradient">
                      Generated Products
                    </span>
                  </Card.Header>
                  <Card.Body>
                    {generatedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="generated-row d-flex align-items-center justify-content-between mb-2"
                      >
                        <div className="d-flex align-items-center text-left">
                          <div className="generated-icon-wrap me-3 mr-3">
                            <MdOutlineInventory2 />
                          </div>
                          <div>
                            <div className="generated-title my-font-weight-bold">
                              {product.name}
                            </div>
                            <div className="generated-sub text-muted">
                              {product.details}
                            </div>
                          </div>
                        </div>
                        <div>
                          <span className="status-pill status-ready">
                            {product.status}
                          </span>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="link"
                      className="generate-more-btn p-0 mt-2"
                    >
                      + Generate Additional Format
                    </Button>
                  </Card.Body>
                </Card>

                {/* Create Product Variants */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient border-0 niche-section-header d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center text-left">
                      <span className="me-2 mr-2 d-flex">
                        <MdOutlineLayers className="heading-icons" />
                      </span>
                      <span className="fw-semibold heading-gradient">
                        Create Product Variants
                      </span>
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      variant="outline-secondary"
                      className="btn-background-box"
                      onClick={handleAutoGenerateVariants}
                    >
                      Auto-Generate
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <Row className="g-2">
                      {variantOptions.map((opt) => {
                        const isSelected = selectedVariants.includes(opt.id);
                        return (
                          <Col key={opt.id} md={3} className="mb-3">
                            <button
                              type="button"
                              className={
                                "pill-option pill-checkbox-option check-row-option " +
                                (isSelected ? "selected" : "")
                              }
                              onClick={() =>
                                toggleFromList(opt.id, setSelectedVariants)
                              }
                            >
                              <span
                                className={
                                  "pill-checkbox " +
                                  (isSelected ? "checked" : "")
                                }
                              />
                              <span className="text-left">{opt.label}</span>
                            </button>
                          </Col>
                        );
                      })}
                    </Row>
                  </Card.Body>
                </Card>

                {/* Bundle Opportunities */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient border-0 niche-section-header d-flex align-items-center">
                    <span className="me-2 mr-2 d-flex">
                      <MdOutlineGroupWork className="heading-icons" />
                    </span>
                    <span className="fw-semibold heading-gradient">
                      Bundle Opportunities
                    </span>
                  </Card.Header>
                  <Card.Body>
                    <Row className="g-2">
                      {bundleOptions.map((opt) => {
                        const isSelected = selectedBundles.includes(opt.id);
                        return (
                          <Col key={opt.id} md={4} className="mb-3">
                            <button
                              type="button"
                              className={
                                "pill-option pill-checkbox-option check-row-option " +
                                (isSelected ? "selected" : "")
                              }
                              onClick={() =>
                                toggleFromList(opt.id, setSelectedBundles)
                              }
                            >
                              <span
                                className={
                                  "pill-checkbox " +
                                  (isSelected ? "checked" : "")
                                }
                              />
                              <span className="text-left">{opt.label}</span>
                            </button>
                          </Col>
                        );
                      })}
                    </Row>

                    <div className="tip-strip mt-3">
                      <span className="tip-icon">📊</span>
                      <div className="small text-muted my-font-weight-bold text-left">
                        Pro Tip: Bundles typically increase average order value
                        by 35–50% and provide better value perception.
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Commercial License Options */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient border-0 niche-section-header d-flex align-items-center">
                    <span className="me-2 mr-2 d-flex">
                      <MdOutlineGavel className="heading-icons" />
                    </span>
                    <span className="fw-semibold heading-gradient">
                      Commercial License Options
                    </span>
                  </Card.Header>
                  <Card.Body>
                    <Row className="g-2">
                      {licenseOptions.map((opt) => {
                        const isSelected = licenseOption === opt.id;
                        return (
                          <Col key={opt.id} md={4} className="mb-3">
                            <button
                              type="button"
                              className={
                                "pill-option pill-radio-option check-row-option " +
                                (isSelected ? "selected" : "")
                              }
                              onClick={() => setLicenseOption(opt.id)}
                            >
                              <span
                                className={
                                  "pill-radio " +
                                  (isSelected ? "checked" : "")
                                }
                              />
                              <span className="text-left">
                                <div className="fw-semibold small">
                                  {opt.title}
                                </div>
                                <div className="tiny-text text-muted my-font-weight-bold">
                                  {opt.description}
                                </div>
                              </span>
                            </button>
                          </Col>
                        );
                      })}
                    </Row>

                    <div className="warning-strip mt-3">
                      <span className="warning-icon">!</span>
                      <div className="small text-muted my-font-weight-bold text-left">
                        Commercial licenses typically sell at 3–5x the personal
                        use price and attract business customers.
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Footer buttons */}
                <div className="d-flex justify-content-between mt-4">
                  <Link to="/product-generation">
                    <Button
                      variant="outline-secondary"
                      type="button"
                      className="select-niche-btn"
                    >
                      ← Back to Generation
                    </Button>
                  </Link>

                  <Button
                    type="submit"
                    variant="primary"
                    className="select-niche-btn bg-blue-gradient"
                  >
                    Continue to Launch →
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

export default VariantsBundles;
