import React from "react";
import { Chart } from "react-google-charts";


import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  ProgressBar,
} from "react-bootstrap";
import {
  HiOutlineCurrencyDollar,
  HiOutlineShoppingBag,
  HiOutlineUserGroup,
  HiOutlineCollection,
} from "react-icons/hi";
import { MdTrendingUp, MdTrendingDown, MdOutlineBolt } from "react-icons/md";
import { FiArrowRight, FiMail, FiEdit3 } from "react-icons/fi";
import { RiGalleryLine } from "react-icons/ri";
import { LuRocket, LuMegaphone } from "react-icons/lu";
import { MdOutlineDataUsage, MdOutlineLocalActivity } from "react-icons/md";

import {
  MdOutlineDescription
} from "react-icons/md";
import "../../App.css";
import "./DashboardPanelStyle.css"; // optional – create & add CSS here

// ----------------- mock data -----------------

const summaryStats = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "$24,589",
    subLabel: "+$2,847 from last month",
    change: "+12.5%",
    changePositive: true,
    icon: <HiOutlineCurrencyDollar />,
  },
  {
    id: "sales",
    label: "Total Sales",
    value: "1,247",
    subLabel: "342 this month",
    change: "+8.2%",
    changePositive: true,
    icon: <HiOutlineShoppingBag />,
  },
  {
    id: "students",
    label: "Active Students",
    value: "2,456",
    subLabel: "567 enrolled this month",
    change: "+15.3%",
    changePositive: true,
    icon: <HiOutlineUserGroup />,
  },
  {
    id: "products",
    label: "Active Products",
    value: "42",
    subLabel: "3 pending review",
    change: "-2.1%",
    changePositive: false,
    icon: <HiOutlineCollection />,
  },
];

const recentActivity = [
  {
    name: "Sarah Chen",
    action: 'purchased "Advanced UI Design Course"',
    time: "2 minutes ago",
  },
  {
    name: "Mike Johnson",
    action: 'left a 5-star review on "React Masterclass"',
    time: "15 minutes ago",
  },
  {
    name: "Emma Wilson",
    action: 'completed "JavaScript Fundamentals"',
    time: "1 hour ago",
  },
  {
    name: "Alex Rivera",
    action: 'remixed your "Social Media Template Pack"',
    time: "3 hours ago",
  },
  {
    name: "Lisa Anderson",
    action: 'commented on "Design Principles Lesson 3"',
    time: "5 hours ago",
  },
];

const topProducts = [
  {
    title: "UI Design Masterclass",
    stats: "245 sales · $7,530 revenue",
  },
  {
    title: "Mobile App Templates",
    stats: "189 sales · $4,725 revenue",
  },
  {
    title: "Business Plan Template",
    stats: "156 sales · $3,900 revenue",
  },
];

const quickActions = [
  {
    id: "create-course",
    label: "Create Course",
    icon: <LuRocket />,
  },
  {
    id: "add-product",
    label: "Add Product",
    icon: <RiGalleryLine />,
  },
  {
    id: "launch-studio",
    label: "Launch Studio",
    icon: <MdOutlineBolt />,
  },
  {
    id: "new-campaign",
    label: "New Campaign",
    icon: <LuMegaphone />,
  },
  {
    id: "send-email",
    label: "Send Email",
    icon: <FiMail />,
  },
  {
    id: "write-post",
    label: "Write Post",
    icon: <FiEdit3 />,
  },
];
export const data = [
  [
    "Month",
    "Bolivia",
    "Ecuador",
    "Madagascar",
    "Papua New Guinea",
    "Rwanda",
    "Average",
  ],
  ["2004/05", 165, 938, 522, 998, 450, 614.6],
  ["2005/06", 135, 1120, 599, 1268, 288, 682],
  ["2006/07", 157, 1167, 587, 807, 397, 623],
  ["2007/08", 139, 1110, 615, 968, 215, 609.4],
  ["2008/09", 136, 691, 629, 1026, 366, 569.6],
];

export const options = {
  title: "Monthly Coffee Production by Country",
  vAxis: { title: "Cups" },
  hAxis: { title: "Month" },
  seriesType: "bars",
  series: { 5: { type: "line" } },
};
// ----------------- small sub components -----------------

const SummaryCard = ({ stat }) => (
  <Card className="dashboard-summary-card">
    <Card.Body>
      <div className="d-flex justify-content-between align-items-start mb-2">
        <div className="summary-icon-wrap">{stat.icon}</div>
        <Badge
          bg={stat.changePositive ? "success" : "danger"}
          className="summary-change-pill"
        >
          {stat.changePositive ? "↑" : "↓"} {stat.change}
        </Badge>
      </div>
      <div className="summary-label text-muted my-font-weight-bold">
        {stat.label}
      </div>
      <div className="summary-value fw-bold">{stat.value}</div>
      <div className="summary-sublabel text-muted my-font-weight-bold">
        {stat.subLabel}
      </div>
    </Card.Body>
  </Card>
);

const ActivityItem = ({ item }) => (
  <div className="activity-item">
    <div className="activity-bullet">★</div>
    <div className="activity-text">
      <div className="small">
        <span className="fw-semibold">{item.name}</span> {item.action}
      </div>
      <div className= "text-muted">{item.time}</div>
    </div>
  </div>
);

const ProductItem = ({ product }) => (
  <div className="product-item">
    <div className="product-avatar">📘</div>
    <div>
      <div className="small fw-semibold">{product.title}</div>
      <div className= "text-muted my-font-weight-bold">
        {product.stats}
      </div>
    </div>
  </div>
);

const QuickActionButton = ({ action }) => (
  <button type="button" className="quick-action-btn">
    <div className="quick-action-icon">{action.icon}</div>
    <div className= "my-font-weight-bold">{action.label}</div>
  </button>
);

// ----------------- main component -----------------

function DashboardPanel() {
  return (
    <div className="market-page dashboard-page">
      <Container fluid className="py-5 px-5">
        {/* Page heading */}
        <div className="mb-4 text-left">
          <h3 className="fw-bold text-left">Dashboard</h3>
          <p className="text-muted mb-0 text-left">
            See how your products and students are performing at a glance.
          </p>
        </div>

        {/* Summary stats */}
        <Row className="g-3 mb-4">
          {summaryStats.map((stat) => (
            <Col key={stat.id} md={3}>
              <SummaryCard stat={stat} />
            </Col>
          ))}
        </Row>

        {/* Revenue overview */}
        <Card className="shadow-sm mb-4">
          <Card.Header className="bg-blue-gradient border-0 niche-section-header d-flex justify-content-between align-items-center text-left">
             <div className="d-flex align-items-center text-left">
             <span className="me-2 mr-2 d-flex">
                                    <MdTrendingUp className="heading-icons" />
                                  </span>
            <span className="fw-semibold heading-gradient text-left">Revenue Overview</span>
            </div>
            <div className="time-range-toggle">
              <button className="time-pill">7D</button>
              <button className="time-pill active">30D</button>
              <button className="time-pill">90D</button>
              <button className="time-pill">1Y</button>
            </div>
          </Card.Header>
          <Card.Body className="revenue-body">
            {/* placeholder – hook up real chart later */}
            <div className="revenue-placeholder text-muted my-font-weight-bold">
             
              <Chart
      chartType="ComboChart"
      width="800px"
      height="500px"
      data={data}
      options={options}
    />
            </div>
          </Card.Body>
        </Card>

        {/* Recent activity + side column */}
        <Row className="g-4 mb-4">
          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Header className="border-0 d-flex justify-content-between align-items-center niche-section-header">
                <div className="d-flex align-items-center text-left">
                    <span className="me-2 mr-2 d-flex"><MdOutlineLocalActivity className="heading-icons" /></span>
                    <span className="fw-semibold heading-gradient text-left">Recent Activity</span>
                </div>

             
                <button className="tiny-link-btn">
                  View All <FiArrowRight />
                </button>
              </Card.Header>
              <Card.Body className="text-left">
                {recentActivity.map((item, idx) => (
                  <ActivityItem key={idx} item={item} />
                ))}
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            {/* AI usage */}
            <Card className="shadow-sm mb-4">
              <Card.Header className="border-0 niche-section-header">
                <div className="d-flex align-items-center text-left">
                    <span className="me-2 mr-2 d-flex"><MdOutlineDataUsage className="heading-icons" /></span>
                    <span className="fw-semibold heading-gradient text-left">AI Usage This Month</span>
                </div>

             
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-1">
                  <span className="text-muted my-font-weight-bold">
                    7,240 / 10,000
                  </span>
                  <span className="text-muted my-font-weight-bold">
                    Credits
                  </span>
                </div>
                <ProgressBar
                  now={72}
                  className="ai-usage-bar"
                  variant="info"
                />
                <div className= "text-muted mt-2 my-font-weight-bold">
                  2,760 credits remaining · resets in 12 days
                </div>
              </Card.Body>
            </Card>

            {/* Top products */}
            <Card className="shadow-sm">
              <Card.Header className="border-0 d-flex justify-content-between align-items-center niche-section-header">
                <div className="d-flex align-items-center text-left">
                    <span className="me-2 mr-2 d-flex"><MdTrendingDown className="heading-icons" /></span>
                    <span className="fw-semibold heading-gradient text-left">Top Products</span>
                </div>

                
                <button className="tiny-link-btn">
                  View All <FiArrowRight />
                </button>
              </Card.Header>
              <Card.Body className="text-left">
                {topProducts.map((p, idx) => (
                  <ProductItem key={idx} product={p} />
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Quick actions */}
        <Card className="shadow-sm mb-4">
          <Card.Header className="border-0 niche-section-header">
      
            <div className="d-flex align-items-center text-left">
                <span className="me-2 mr-2 d-flex"><MdTrendingDown className="heading-icons" /></span>
                <span className="fw-semibold heading-gradient text-left">Quick Actions</span>
            </div>
          </Card.Header>
          <Card.Body className="quick-actions-row">
            {quickActions.map((qa) => (
              <QuickActionButton key={qa.id} action={qa} />
            ))}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default DashboardPanel;
