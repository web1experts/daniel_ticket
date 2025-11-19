// src/Pages/StepsForms/LaunchOptimze.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  MdOutlineDescription,
  MdTag,
  MdOutlinePriceChange,
  MdOutlinePhotoLibrary,
  MdOutlineStorefront,
  MdOutlineTrendingUp,
  MdOutlineGavel,
} from "react-icons/md";
import { FiRefreshCw } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";

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

const seoTagSuggestions = [
  "diabetes tracker",
  "blood sugar log",
  "diabetic journal",
  "health planner",
  "medical tracker",
  "printable PDF",
  "newly diagnosed",
  "90 day challenge",
  "meal planner",
  "medication log",
  "digital download",
  "wellness workbook",
];

const pricingOptions = [
  {
    id: "standard",
    title: "Standard Edition",
    price: "$12.99",
    subtitle: "Recommended",
  },
  {
    id: "essentials",
    title: "Essentials Edition",
    price: "$7.99",
    subtitle: "Budget option",
  },
  {
    id: "bundle",
    title: "Bundle Offer",
    price: "$19.99",
    subtitle: "23% savings",
  },
];

const previewSlots = [ { id: "cover", label: "Cover", img: "https://placehold.co/100", }, { id: "page1", label: "Page 1", img: "https://placehold.co/400", }, { id: "page2", label: "Page 2", img: "https://placehold.co/50", }, { id: "mockup", label: "Mockup", img: "https://placehold.co/200", }, { id: "info", label: "Info", img: "https://placehold.co/150", }, ];

const marketplaces = [
  {
    id: "etsy",
    label: "Etsy",
    description: "Largest digital marketplace",
    defaultChecked: true,
  },
  {
    id: "creativeFabrica",
    label: "Creative Fabrica",
    description: "Design-focused",
    defaultChecked: true,
  },
  {
    id: "gumroad",
    label: "Gumroad",
    description: "Direct sales",
    defaultChecked: true,
  },
  {
    id: "microsite",
    label: "1000Ideas Microsite",
    description: "Your storefront",
    defaultChecked: false,
  },
];

const licenseOptions = [
  {
    id: "personal",
    title: "Personal Use Only",
    description: "Standard pricing – buyer uses for themselves",
  },
  {
    id: "commercial",
    title: "Commercial Rights",
    description: "Price 2–3× higher – buyer can resell to clients",
  },
  {
    id: "plr",
    title: "PLR Rights",
    description: "Price 5–10× higher – buyer can rebrand as their own",
  },
];

function LaunchOptimze() {
  const currentStepIndex = 6; // 0-based: step 7
  const navigate = useNavigate();

  const [showLaunchModal, setShowLaunchModal] = useState(false);

  const [productTitle, setProductTitle] = useState(
    "Diabetes Tracker Journal | 90 Day Blood Sugar Log Book | Printable PDF Planner for Type 2 | Health Workbook"
  );
  const [description, setDescription] = useState(
`Take control of your diabetes management with this comprehensive 90-day tracking journal. Perfect for newly diagnosed individuals or anyone looking to improve their blood sugar control.

WHAT'S INCLUDED:
• Daily blood sugar tracking pages
• Weekly review prompts and habit tracking
• Monthly progress summaries
• Meal planning templates
• Medication & appointment logs
• Goal setting sections

INSTANT DOWNLOAD – Get your workbook immediately after purchase
• PDF format – Print at home or use digitally
• MULTIPLE SIZES – US Letter & A4 included

Perfect for managing Type 2 diabetes, pre-diabetes, or general wellness tracking.`
  );

  const [selectedTags, setSelectedTags] = useState(seoTagSuggestions);
  const [selectedMarkets, setSelectedMarkets] = useState(
    marketplaces.filter((m) => m.defaultChecked).map((m) => m.id)
  );
  const [pricingChoice, setPricingChoice] = useState("standard");
  const [licenseChoice, setLicenseChoice] = useState("personal");

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleMarket = (id) => {
    setSelectedMarkets((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleOptimizeListing = () => {
    if (!productTitle.toLowerCase().includes("journal")) {
      setProductTitle((prev) => `${prev} | Journal`);
    }
  };

  const handleOptimizeTags = () => {
    setSelectedTags((prev) => Array.from(new Set(prev)).slice(0, 12));
  };

  const handleExportEtsy = () => {
    console.log("Export for Etsy:", {
      productTitle,
      description,
      selectedTags,
      pricingChoice,
      licenseChoice,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Launch config:", {
      productTitle,
      description,
      selectedTags,
      selectedMarkets,
      pricingChoice,
      licenseChoice,
    });

    // show success popup
    setShowLaunchModal(true);
  };

  const titleCharCount = productTitle.length;

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

              {/* Stepper – 1–6 completed; 7 active */}
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
                  <h4 className="fw-bold">Launch &amp; Optimize</h4>
                  <p className="text-muted mb-0">
                    Prepare your product for marketplace success.
                  </p>
                </div>

                {/* Product Listing */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient border-0 niche-section-header d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center text-left">
                      <span className="me-2 mr-2 d-flex">
                        <MdOutlineDescription className="heading-icons" />
                      </span>
                      <span className="fw-semibold heading-gradient">
                        Product Listing
                      </span>
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      variant="outline-secondary"
                      className="btn-background-box"
                      onClick={handleOptimizeListing}
                    >
                      <FaSearch /> AI Optimize
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <Form.Group className="mb-3 box text-left">
                      <Form.Label className="text-muted small fw-semibold my-font-weight-bold">
                        Product Title (Etsy-optimized)
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={productTitle}
                        maxLength={140}
                        onChange={(e) => setProductTitle(e.target.value)}
                      />
                      <div className="tiny-text text-muted mt-1">
                        {titleCharCount}/140 characters – includes search
                        terms
                      </div>
                    </Form.Group>

                    <Form.Group className="box text-left">
                      <Form.Label className="text-muted small fw-semibold my-font-weight-bold">
                        Product Description
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={9}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>

                {/* SEO Tags & Keywords */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient border-0 niche-section-header d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center text-left">
                      <span className="me-2 mr-2 d-flex">
                        <MdTag className="heading-icons" />
                      </span>
                      <span className="fw-semibold heading-gradient">
                        SEO Tags &amp; Keywords
                      </span>
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      variant="outline-secondary"
                      className="btn-background-box"
                      onClick={handleOptimizeTags}
                    >
                      <FaSearch /> Optimize Tags for Etsy
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <div className="tags-wrap">
                      {seoTagSuggestions.map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            className={
                              "tag-pill " + (isSelected ? "selected" : "")
                            }
                            onClick={() => toggleTag(tag)}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </Card.Body>
                </Card>

                {/* Pricing Strategy */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient border-0 niche-section-header d-flex align-items-center">
                    <span className="me-2 mr-2 d-flex">
                      <MdOutlinePriceChange className="heading-icons" />
                    </span>
                    <span className="fw-semibold heading-gradient">
                      Pricing Strategy
                    </span>
                  </Card.Header>
                  <Card.Body>
                    <Row className="g-3">
                      {pricingOptions.map((opt) => {
                        const isSelected = pricingChoice === opt.id;
                        return (
                          <Col key={opt.id} md={4}>
                            <button
                              type="button"
                              className={
                                "pricing-card-btn " +
                                (isSelected ? "selected" : "")
                              }
                              onClick={() => setPricingChoice(opt.id)}
                            >
                              <div className="pricing-check">
                                {isSelected && <span>✓</span>}
                              </div>
                              <div className="pricing-title">
                                {opt.title}
                              </div>
                              <div className="pricing-price">
                                {opt.price}
                              </div>
                              <div className="pricing-sub tiny-text">
                                {opt.subtitle}
                              </div>
                            </button>
                          </Col>
                        );
                      })}
                    </Row>

                    <div className="tip-strip mt-3">
                      <span className="tip-icon">💡</span>
                      <div className="small text-muted my-font-weight-bold text-left">
                        Tip: Start at recommended price. Adjust based on first
                        30 days of performance data.
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Preview Images */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient border-0 niche-section-header d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center text-left">
                      <span className="me-2 mr-2 d-flex">
                        <MdOutlinePhotoLibrary className="heading-icons" />
                      </span>
                      <span className="fw-semibold heading-gradient">
                        Preview Images
                      </span>
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      variant="outline-secondary"
                      className="btn-background-box d-flex align-items-center"
                    >
                      <FiRefreshCw className="me-1" />
                      Regenerate All
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <div className="preview-grid mb-3">
                      {previewSlots.map((slot) => (
                        <div
                          key={slot.id}
                          className="preview-slot text-center"
                        >
                          <div className="preview-thumb">
                            <img src={slot.img} alt={slot.label} />
                          </div>
                          <div className="tiny-text text-muted mt-2">
                            {slot.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="success-strip mt-2">
                      <span className="success-icon">✓</span>
                      <div className="small text-muted my-font-weight-bold text-left">
                        Generated 10 mockup images ready for marketplace
                        listings.
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Where to Sell */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient border-0 niche-section-header d-flex align-items-center">
                    <span className="me-2 mr-2 d-flex">
                      <MdOutlineStorefront className="heading-icons" />
                    </span>
                    <span className="fw-semibold heading-gradient">
                      Where to Sell
                    </span>
                  </Card.Header>
                  <Card.Body>
                    <Row className="g-2 mb-3">
                      {marketplaces.map((m) => {
                        const isSelected = selectedMarkets.includes(m.id);
                        return (
                          <Col key={m.id} md={3} className="mb-2">
                            <button
                              type="button"
                              className={
                                "pill-option pill-checkbox-option check-row-option " +
                                (isSelected ? "selected" : "")
                              }
                              onClick={() => toggleMarket(m.id)}
                            >
                              <span
                                className={
                                  "pill-checkbox " +
                                  (isSelected ? "checked" : "")
                                }
                              />
                              <span className="text-left">
                                <div className="fw-semibold small">
                                  {m.label}
                                </div>
                                <div className="tiny-text text-muted my-font-weight-bold">
                                  {m.description}
                                </div>
                              </span>
                            </button>
                          </Col>
                        );
                      })}
                    </Row>

                    <div className="where-actions d-flex flex-wrap gap-3 mt-3">
                      <Button
                        type="button"
                        size="sm"
                        variant="primary"
                        className="pill-main-btn export-etsy-btn mr-3"
                        onClick={handleExportEtsy}
                      >
                        Export for Etsy
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        className="pill-secondary-btn"
                      >
                        Create Listing Link
                      </Button>
                    </div>
                  </Card.Body>
                </Card>

                {/* Performance Tracking */}
                <Card className="shadow-sm mb-4 performance-card">
                  <Card.Header className="bg-transparent border-0 niche-section-header d-flex align-items-center">
                    <span className="me-2 mr-2 d-flex">
                      <MdOutlineTrendingUp className="heading-icons text-warning" />
                    </span>
                    <span className="fw-semibold">Performance Tracking</span>
                  </Card.Header>
                  <Card.Body>
                    <Row className="g-3 align-items-start performance-content-row">
                      <Col md={7}>
                        <div className="text-muted mb-2 text-left my-font-weight-bold">
                          We’ll help you track how your products perform after
                          launch:
                        </div>
                        <ul className="perf-list text-left text-muted mb-3">
                          <li>Views &amp; click-through rate</li>
                          <li>Favorites &amp; saves</li>
                          <li>Sales &amp; revenue</li>
                          <li>Time to first sale</li>
                          <li>Customer reviews</li>
                        </ul>
                        <div className="text-muted mb-0 text-left my-font-weight-bold">
                          After 30 days, we’ll suggest optimizations based on
                          real performance data.
                        </div>
                      </Col>

                      <Col
                        md={5}
                        className="d-flex flex-column align-items-md-end align-items-start justify-content-between perf-cta-col"
                      >
                        <Button
                          type="button"
                          size="sm"
                          variant="warning"
                          className="enable-performance-btn"
                        >
                          Enable Performance Tracking
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Commercial License Options */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient border-0 niche-section-header d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center text-left">
                      <span className="me-2 mr-2 d-flex">
                        <MdOutlineGavel className="heading-icons" />
                      </span>
                      <span className="fw-semibold heading-gradient">
                        Commercial License Options
                      </span>
                    </div>
                    <div className="text-muted my-font-weight-bold">
                      Determines usage rights for buyers
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Row className="g-2">
                      {licenseOptions.map((opt) => {
                        const isSelected = licenseChoice === opt.id;
                        return (
                          <Col key={opt.id} md={4} className="mb-2">
                            <button
                              type="button"
                              className={
                                "pill-option pill-radio-option check-row-option " +
                                (isSelected ? "selected" : "")
                              }
                              onClick={() => setLicenseChoice(opt.id)}
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

                    <div className="pricing-tip-strip mt-3">
                      <span className="tip-icon">💰</span>
                      <div className="small text-muted my-font-weight-bold text-left">
                        Pricing Tip: Commercial licenses typically sell for
                        3×–5×+ the personal use price. Create separate listings
                        for each license type.
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Footer buttons */}
                <div className="d-flex justify-content-between mt-4 mb-3">
                  <Link to="/variants-bundles">
                    <Button
                      variant="outline-secondary"
                      type="button"
                      className="select-niche-btn"
                    >
                      ← Back to Variants
                    </Button>
                  </Link>

                  <Button type="submit" className="launch-btn">
                    <LuDownload /> Download Products &amp; Launch
                  </Button>
                </div>
              </form>

              {/* Launch success modal */}
              <Modal
                show={showLaunchModal}
                onHide={() => setShowLaunchModal(false)}
                centered
                dialogClassName="launch-modal-dialog"
                backdropClassName="launch-modal-backdrop"
              >
                <Modal.Body className="launch-modal-body">
                  <div className="launch-modal-icon">🎉</div>
                  <h5 className="launch-modal-title">Congratulations!</h5>
                  <p className="launch-modal-text">
                    Your products are ready to download and list.
                  </p>

                  <div className="launch-modal-subheading">Next steps:</div>
                  <ol className="launch-modal-list">
                    <li>Download your product packages</li>
                    <li>List on selected marketplaces</li>
                    <li>Enable performance tracking</li>
                    <li>Monitor your first 30 days</li>
                    <li>Get optimization recommendations</li>
                  </ol>

                  <div className="text-end mt-4">
                    <Button
                      variant="info"
                      className="launch-modal-okbtn"
                      onClick={() => setShowLaunchModal(false)}
                    >
                      OK
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>
            </Container>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LaunchOptimze;
