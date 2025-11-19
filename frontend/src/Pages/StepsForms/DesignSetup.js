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
import { MdTextFields } from "react-icons/md";
import { MdOutlineDesignServices } from "react-icons/md";
import { SiAffinitydesigner } from "react-icons/si";
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

const visualStyleOptions = [
  {
    id: "clean",
    title: "Clean & Modern",
    description: "Minimalist design, white space",
  },
  {
    id: "warm",
    title: "Warm & Inviting",
    description: "Soft colors, friendly typography",
  },
  {
    id: "professional",
    title: "Professional & Clinical",
    description: "Medical-grade aesthetic",
  },
  {
    id: "vibrant",
    title: "Vibrant & Energetic",
    description: "Bold colors, dynamic layouts",
  },
  {
    id: "elegant",
    title: "Elegant & Luxe",
    description: "Sophisticated, premium feel",
  },
];

const primaryColorThemes = [
  "Teal (Fresh, balanced)",
  "Blue (Trust & clarity)",
  "Purple (Creative, thoughtful)",
  "Green (Health & growth)",
  "Monochrome (Minimal, neutral)",
];

const accentOptionsList = [
  { id: "complementary", label: "Use complementary accent", defaultChecked: true },
  { id: "neutrals", label: "Include neutral grays", defaultChecked: false },
];

const fontStyles = [
  "Modern Sans-Serif",
  "Friendly Rounded",
  "Classic Serif",
  "Handwritten Script",
];

const textSizes = [
  "Small (Compact)",
  "Medium (Standard)",
  "Large (Spacious)",
];

const visualElementsList = [
  {
    id: "icons",
    label: "Include icons for visual navigation",
    defaultChecked: true,
  },
  {
    id: "borders",
    label: "Add decorative borders and dividers",
    defaultChecked: true,
  },
  {
    id: "graphics",
    label: "Include motivational graphics",
    defaultChecked: false,
  },
  {
    id: "patterns",
    label: "Add subtle background patterns",
    defaultChecked: false,
  },
];

function DesignSetup() {
  const currentStepIndex = 3; // 0-based: step 4
  const navigate = useNavigate();

  const [visualStyle, setVisualStyle] = useState("clean");
  const [primaryColorTheme, setPrimaryColorTheme] = useState(
    "Teal (Fresh, balanced)"
  );
  const [accentOptions, setAccentOptions] = useState(
    accentOptionsList.filter((a) => a.defaultChecked).map((a) => a.id)
  );
  const [fontStyle, setFontStyle] = useState("Modern Sans-Serif");
  const [textSize, setTextSize] = useState("Medium (Standard)");
  const [visualElements, setVisualElements] = useState(
    visualElementsList
      .filter((v) => v.defaultChecked)
      .map((v) => v.id)
  );

  const toggleAccentOption = (id) => {
    setAccentOptions((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleVisualElement = (id) => {
    setVisualElements((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAiSuggest = () => {
    // simple stub – adjust as you wish
    setVisualStyle("clean");
    setPrimaryColorTheme("Teal (Fresh, balanced)");
    if (!accentOptions.includes("complementary")) {
      setAccentOptions((prev) => [...prev, "complementary"]);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("step4_design_setup");
    if (!saved) return;

    try {
      const data = JSON.parse(saved);

      if (data.visualStyle) setVisualStyle(data.visualStyle);
      if (data.primaryColorTheme) setPrimaryColorTheme(data.primaryColorTheme);

      if (data.accentOptions) setAccentOptions(data.accentOptions);

      if (data.fontStyle) setFontStyle(data.fontStyle);
      if (data.textSize) setTextSize(data.textSize);

      if (data.visualElements) setVisualElements(data.visualElements);

    } catch (err) {
      console.error("Error loading step4_design_setup:", err);
    }
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      visualStyle,
      primaryColorTheme,
      accentOptions,
      fontStyle,
      textSize,
      visualElements,
    });

    const step4Data = {
      visualStyle: visualStyle,
      primaryColorTheme: primaryColorTheme,
      accentOptions: accentOptions,
      fontStyle: fontStyle,
      textSize: textSize,
      visualElements: visualElements,
    };

    localStorage.setItem("step4_design_setup", JSON.stringify(step4Data));

    navigate("/product-generation");
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

              {/* Stepper – 1,2,3 completed; 4 active */}
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
                  <h4 className="fw-bold">Design &amp; Styling</h4>
                  <p className="text-muted mb-0">
                    Choose your visual style and branding.
                  </p>
                </div>

                {/* Visual Style */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient  border-0 niche-section-header d-flex justify-content-between align-items-center">
            
                     <div className="d-flex align-items-center text-left "> 
                        <span className="me-2 mr-2 d-flex"><MdOutlineDesignServices  className="heading-icons" /></span>
                        <span className="fw-semibold heading-gradient">Visual Style</span>
                      </div>

                    <Button
                    className="btn-background-box"
                      type="button"
                      variant="outline-secondary"
                      size="sm"
                      onClick={handleAiSuggest}
                    >
                      AI Suggest
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <Row className="gy-2">
                      {visualStyleOptions.map((opt) => {
                        const isSelected = visualStyle === opt.id;
                        return (
                          <Col key={opt.id} md={3} className="mb-4">
                            <button
                              type="button"
                              className={
                                "pill-option pill-radio-option " +
                                (isSelected ? "selected" : "")
                              }
                              onClick={() => setVisualStyle(opt.id)}
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
                  </Card.Body>
                </Card>

                {/* Color Palette */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient  border-0 niche-section-header d-flex align-items-center">
                    <span className="me-2 mr-2 d-flex"><VscSymbolColor className="heading-icons" /></span>
                    <span className="fw-semibold heading-gradient">Color Palette</span>
                  </Card.Header>
                  <Card.Body>
                    <Row className="gy-3 align-items-end">
                      <Col md={6}>
                        <Form.Group className="box">
                          <Form.Label className="text-muted small fw-semibold my-font-weight-bold">
                            Primary Color Theme
                          </Form.Label>
                          <Form.Select
                            value={primaryColorTheme}
                            className="primary-category-select"
                            onChange={(e) =>
                              setPrimaryColorTheme(e.target.value)
                              
                            }
                          >
                            {primaryColorThemes.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <div className="text-muted small fw-semibold mb-1 my-font-weight-bold text-left">
                          Accent Colors
                        </div>
                        <Row className="g-2">
                          {accentOptionsList.map((opt) => {
                            const isSelected = accentOptions.includes(opt.id);
                            return (
                              <Col key={opt.id} md={6}>
                                <button
                                  type="button"
                                  className={
                                    "pill-option pill-checkbox-option " +
                                    (isSelected ? "selected" : "")
                                  }
                                  onClick={() => toggleAccentOption(opt.id)}
                                >
                                  <span
                                    className={
                                      "pill-checkbox " +
                                      (isSelected ? "checked" : "")
                                    }
                                  />
                                  <span>{opt.label}</span>
                                </button>
                              </Col>
                            );
                          })}
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Typography */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient  border-0 niche-section-header d-flex align-items-center">
                    <span className="me-2 mr-2 d-flex"><MdTextFields  className="heading-icons" /></span>
                    <span className="fw-semibold heading-gradient">Typography</span>
                  </Card.Header>
                  <Card.Body>
                    <Row className="gy-3">
                      <Col md={6}>
                        <Form.Group className="box">
                          <Form.Label className="text-muted small fw-semibold my-font-weight-bold">
                            Font Style
                          </Form.Label>
                          <Form.Select
                            value={fontStyle}
                            className="primary-category-select"
                            onChange={(e) => setFontStyle(e.target.value)}
                          >
                            {fontStyles.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="box">
                          <Form.Label className="text-muted small fw-semibold my-font-weight-bold">
                            Text Size
                          </Form.Label>
                          <Form.Select
                            value={textSize}
                            className="primary-category-select"
                            onChange={(e) => setTextSize(e.target.value)}
                          >
                            {textSizes.map((opt) => (
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

                {/* Visual Elements */}
                <Card className="shadow-sm mb-4">
                  <Card.Header className="bg-blue-gradient  border-0 niche-section-header d-flex align-items-center">
                    <span className="me-2 mr-2 d-flex"><SiAffinitydesigner  className="heading-icons" /></span>
                    <span className="fw-semibold heading-gradient">Visual Elements</span>
                  </Card.Header>
                  <Card.Body>
                    <Row className="g-2 ">
                      {visualElementsList.map((item) => {
                        const isSelected = visualElements.includes(item.id);
                        return (
                          <Col key={item.id} md={6} className="mb-4">
                            <button
                              type="button"
                              className={
                                "pill-option pill-checkbox-option " +
                                (isSelected ? "selected" : "")
                              }
                              onClick={() => toggleVisualElement(item.id)}
                            >
                              <span
                                className={
                                  "pill-checkbox " +
                                  (isSelected ? "checked" : "")
                                }
                              />
                              <span>{item.label}</span>
                            </button>
                          </Col>
                        );
                      })}
                    </Row>

                    <div className="visual-info-strip mt-3">
                      <span className="info-icon">i</span>
                      <div>
                        <div className="small text-muted">
                          All visual elements are carefully chosen to maintain
                          printability and professional appearance.
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Footer buttons */}
                <div className="d-flex justify-content-between mt-4">
                  <Link to="/content-planning">
                    <Button
                      variant="outline-secondary"
                      type="button"
                      className="select-niche-btn"
                    >
                      ← Back to Content Planning
                    </Button>
                  </Link>

                  <Button
                    type="submit"
                    variant="primary"
                    className="select-niche-btn bg-blue-gradient"
                  >
                    Continue to Generation →
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

export default DesignSetup;
