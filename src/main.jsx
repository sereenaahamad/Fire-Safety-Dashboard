import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import './styles.css';

const buildings = ['All Buildings', 'Tower A', 'Mall Block B', 'Hotel C', 'Warehouse 7'];

const stats = [
  { label: 'Total Buildings', value: 24, trend: 'up', trendText: '12% from last month', accent: 'cyan' },
  { label: 'Active Fire Alarms', value: 3, trend: 'down', trendText: '2 resolved today', accent: 'amber' },
  { label: 'Pending Inspections', value: 12, trend: 'up', trendText: '5 due this week', accent: 'rose' },
  { label: 'Compliance Rate', value: '96%', trend: 'up', trendText: '4% improvement', accent: 'emerald' },
];

const safetyCards = [
  { label: 'Safe Buildings', value: 20, tone: 'success' },
  { label: 'Under Maintenance', value: 3, tone: 'warning' },
  { label: 'Critical Alerts', value: 1, tone: 'danger' },
];

const safetyTrend = [64, 68, 70, 74, 79, 84, 88, 92];

const monthlyInspections = [
  { month: 'Jan', value: 25 },
  { month: 'Feb', value: 30 },
  { month: 'Mar', value: 28 },
  { month: 'Apr', value: 35 },
  { month: 'May', value: 40 },
];

const incidentTrend = [
  { label: 'Fire Alarm Events', values: [5, 6, 4, 7, 6, 8] },
  { label: 'Equipment Failures', values: [3, 4, 4, 3, 2, 3] },
  { label: 'Safety Violations', values: [2, 3, 2, 4, 3, 2] },
];

const alerts = [
  { time: '10:30 AM', building: 'Tower A', alert: 'Smoke Detector Triggered' },
  { time: '09:15 AM', building: 'Mall Block B', alert: 'Sprinkler Maintenance Due' },
  { time: 'Yesterday', building: 'Hotel C', alert: 'Fire Door Inspection Pending' },
];

const equipment = [
  { equipment: 'Fire Pump 01', location: 'Tower A', status: 'Active', priority: 'High' },
  { equipment: 'Sprinkler Zone 4', location: 'Mall Block B', status: 'Maintenance', priority: 'Medium' },
  { equipment: 'Alarm Panel 03', location: 'Hotel C', status: 'Active', priority: 'Low' },
  { equipment: 'Smoke Extractor 12', location: 'Warehouse 7', status: 'Inspection Due', priority: 'High' },
  { equipment: 'Pressure Valve 02', location: 'Tower A', status: 'Active', priority: 'Low' },
];

const inspections = [
  { building: 'Office Tower A', date: '25 Jun', inspector: 'John Smith', status: 'Completed' },
  { building: 'Shopping Mall', date: '28 Jun', inspector: 'Ahmed Khan', status: 'Scheduled' },
  { building: 'Warehouse 7', date: '30 Jun', inspector: 'Priya Patel', status: 'Overdue' },
  { building: 'Hotel C', date: '2 Jul', inspector: 'Maria Gomez', status: 'Scheduled' },
];

const incidents = [
  { id: 'INC-1001', type: 'Smoke Alert', severity: 'Medium' },
  { id: 'INC-1002', type: 'Fire Alarm', severity: 'High' },
  { id: 'INC-1003', type: 'Equipment Failure', severity: 'Low' },
  { id: 'INC-1004', type: 'Maintenance Issue', severity: 'Medium' },
];

const incidentMix = [
  { label: 'Fire Alarm', value: 42, color: '#47d7ff' },
  { label: 'Fire Detection', value: 28, color: '#ffb020' },
  { label: 'Equipment Failure', value: 18, color: '#7ae582' },
  { label: 'Maintenance Issue', value: 12, color: '#ff6b8a' },
];

const maintenance = [
  { equipment: 'Fire Pump', due: '30 Jun', priority: 'High' },
  { equipment: 'Alarm Panel', due: '5 Jul', priority: 'Medium' },
  { equipment: 'Sprinkler Valve', due: '10 Jul', priority: 'Low' },
];

const mapBuildings = [
  { label: 'Tower A', status: 'Safe', tone: 'safe', top: '22%', left: '28%' },
  { label: 'Mall Block B', status: 'Maintenance', tone: 'maintenance', top: '48%', left: '58%' },
  { label: 'Hotel C', status: 'Alert', tone: 'alert', top: '72%', left: '42%' },
  { label: 'Warehouse 7', status: 'Safe', tone: 'safe', top: '34%', left: '76%' },
];

const navItems = [
  { label: 'Dashboard', to: '/', count: null, icon: DashboardIcon },
  { label: 'Equipment', to: '/equipment', count: 124, icon: EquipmentIcon },
  { label: 'Inspections', to: '/inspections', count: 12, icon: ClipboardIcon },
  { label: 'Reports', to: '/reports', count: null, icon: ReportIcon },
];

function AppShell() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState('All Buildings');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return (
    <div className="app-shell">
      <Sidebar onClose={() => setSidebarOpen(false)} open={sidebarOpen} />
      <div className="main-shell">
        <Header
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode((value) => !value)}
          onOpenSidebar={() => setSidebarOpen((value) => !value)}
          building={selectedBuilding}
          onBuildingChange={setSelectedBuilding}
          notificationsOpen={notificationsOpen}
          onToggleNotifications={() => setNotificationsOpen((value) => !value)}
          settingsOpen={settingsOpen}
          onToggleSettings={() => setSettingsOpen((value) => !value)}
        />
        <main className="content">
          <Routes>
            <Route path="/" element={<DashboardPage building={selectedBuilding} />} />
            <Route path="/equipment" element={<EquipmentPage />} />
            <Route path="/inspections" element={<InspectionsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {notificationsOpen ? <NotificationsDrawer onClose={() => setNotificationsOpen(false)} /> : null}
        {settingsOpen ? <SettingsDrawer onClose={() => setSettingsOpen(false)} /> : null}
        <footer className="site-footer">
          <span>Last Updated: 10:30 AM</span>
          <span>System Status: Operational</span>
        </footer>
      </div>
    </div>
  );
}

function Sidebar({ open, onClose }) {
  const location = useLocation();

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="brand">
        <div className="brand-mark">FS</div>
        <div>
          <p className="eyebrow">Command Center</p>
          <h1>Fire Safety</h1>
        </div>
      </div>

      <nav className="nav">
        {navItems.map((item) => {
          const active = item.to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={`nav-item ${active ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="nav-left">
                <Icon />
                <span>{item.label}</span>
              </span>
              <span className="nav-right">
                {item.count !== null ? <span className="nav-badge">{item.count}</span> : <span className="nav-dot" />}
              </span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-card">
        <p className="eyebrow">Notification Panel</p>
        <h2>3 New Alerts</h2>
        <ul>
          <li>Smoke detector activated in Tower A</li>
          <li>Maintenance due for Fire Pump 02</li>
          <li>Inspection overdue in Building B</li>
        </ul>
      </div>
    </aside>
  );
}

function Header({
  darkMode,
  onToggleTheme,
  onOpenSidebar,
  building,
  onBuildingChange,
  onToggleNotifications,
  onToggleSettings,
}) {
  return (
    <header className="top-header">
      <div className="header-left">
        <button className="icon-button mobile-toggle" onClick={onOpenSidebar} aria-label="Open menu">
          <MenuIcon />
        </button>
        <div>
          <p className="eyebrow">Good Morning, Operator</p>
          <h2>Fire Safety Monitoring Dashboard</h2>
          <p className="header-subtitle">Monitor alarms, inspections and compliance.</p>
        </div>
      </div>

      <div className="header-center">
        <select value={building} onChange={(event) => onBuildingChange(event.target.value)} className="building-select">
          {buildings.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="header-actions">
        <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle dark mode">
          <span>{darkMode ? 'Dark' : 'Light'}</span>
          <span className="theme-track">
            <span className={`theme-thumb ${darkMode ? 'on' : ''}`} />
          </span>
        </button>
        <button className="icon-chip" onClick={onToggleNotifications} aria-label="Notifications">
          <BellIcon />
          <span>Notifications</span>
        </button>
        <button className="icon-chip" aria-label="Profile">
          <span className="avatar-badge">👤 SA</span>
        </button>
        <button className="icon-chip" onClick={onToggleSettings} aria-label="Settings">
          <SettingsIcon />
          <span>Settings</span>
        </button>
      </div>
    </header>
  );
}

function DashboardPage({ building }) {
  const filteredAlerts = useMemo(() => {
    return alerts.filter((item) => building === 'All Buildings' || item.building === building);
  }, [building]);

  return (
    <div className="page-stack">
      <section className="stats-grid">
        {stats.map((stat) => (
          <article key={stat.label} className={`stat-card ${stat.accent}`}>
            <p>{stat.label}</p>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-trend">
              <TrendArrow direction={stat.trend} />
              <span>{stat.trendText}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Safety Status Overview</p>
              <h3>Operational Snapshot</h3>
            </div>
          </div>
          <div className="safety-layout">
            <div className="status-grid">
              {safetyCards.map((card) => (
                <div key={card.label} className={`status-card ${card.tone}`}>
                  <div className="status-icon" aria-hidden="true" />
                  <div>
                    <p>{card.label}</p>
                    <strong>{card.value}</strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="safety-insights">
              <article className="safety-score-card">
                <p className="eyebrow">Overall Safety Score</p>
                <strong>92%</strong>
                <span>Buildings are trending into a healthier compliance window.</span>
              </article>

              <article className="safety-progress-card">
                <div className="safety-progress-head">
                  <div>
                    <p className="eyebrow">Compliance Progress</p>
                    <strong>96%</strong>
                  </div>
                  <CircularProgress label="Compliance" value={96} tone="emerald" />
                </div>
                <div className="progress-bar compact">
                  <div className="progress-fill" style={{ width: '96%' }} />
                </div>
                <span className="safety-progress-copy">█████████░ 96% of planned checks are complete.</span>
              </article>

              <article className="safety-mini-card">
                <p className="eyebrow">Building Health Score</p>
                <strong>Healthy</strong>
                <span>+8% this quarter</span>
              </article>

              <article className="safety-trend-card">
                <div className="safety-trend-head">
                  <div>
                    <p className="eyebrow">Trend Line</p>
                    <strong>Improving</strong>
                  </div>
                  <span className="chip">8-point rise</span>
                </div>
                <MiniTrendChart values={safetyTrend} />
              </article>
            </div>
          </div>
        </article>

        <article className="panel map-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Building Locations</p>
              <h3>Facility Overview</h3>
            </div>
          </div>
          <div className="mini-map" aria-label="Building locations map">
            <div className="map-grid" />
            {mapBuildings.map((building) => (
              <MapMarker
                key={building.label}
                top={building.top}
                left={building.left}
                label={building.label}
                status={building.status}
                tone={building.tone}
              />
            ))}
          </div>
          <div className="map-legend">
            <span><i className="legend-status safe" /> Safe</span>
            <span><i className="legend-status maintenance" /> Maintenance</span>
            <span><i className="legend-status alert" /> Alert</span>
          </div>
        </article>
      </section>

      <section className="dashboard-grid split-two">
        <article className="panel activity-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Activity</p>
              <h3>Recent Alerts</h3>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Building</th>
                  <th>Alert</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlerts.map((row) => (
                  <tr key={`${row.time}-${row.building}`}>
                    <td>{row.time}</td>
                    <td>{row.building}</td>
                    <td>{row.alert}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Inspections</p>
              <h3>Monthly Inspection Chart</h3>
            </div>
          </div>
          <BarChart data={monthlyInspections} />
        </article>
      </section>

      <section className="dashboard-grid split-two">
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Trends</p>
              <h3>Incident Trend Chart</h3>
            </div>
          </div>
          <LineChart series={incidentTrend} />
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Incidents</p>
              <h3>Incident Distribution</h3>
            </div>
          </div>
          <DonutChart />
          <div className="distribution-list">
            {incidentMix.map((item) => (
              <div key={item.label} className="distribution-row">
                <span className="distribution-name">
                  <span className="distribution-dot" style={{ background: item.color }} />
                  {item.label}
                </span>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

function EquipmentPage() {
  return (
    <div className="page-stack">
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Equipment Management</p>
            <h3>Equipment List</h3>
          </div>
        </div>
        <div className="filters">
          {['All', 'Active', 'Maintenance', 'Inspection Due'].map((filter) => (
            <button key={filter} className={`filter-chip ${filter === 'All' ? 'active' : ''}`}>
              {filter}
            </button>
          ))}
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Location</th>
                <th>Status</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {equipment.map((row) => (
                <tr key={row.equipment}>
                  <td>{row.equipment}</td>
                  <td>{row.location}</td>
                  <td><StatusBadge value={row.status} /></td>
                  <td><StatusBadge value={row.priority} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function InspectionsPage() {
  return (
    <div className="page-stack">
      <section className="dashboard-grid split-two">
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Inspection Management</p>
              <h3>Upcoming Inspections</h3>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Building</th>
                  <th>Date</th>
                  <th>Inspector</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {inspections.map((row) => (
                  <tr key={row.building}>
                    <td>{row.building}</td>
                    <td>{row.date}</td>
                    <td>{row.inspector}</td>
                    <td><StatusBadge value={row.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Inspection Progress</p>
              <h3>Completion Breakdown</h3>
            </div>
          </div>
          <div className="progress-list">
            <ProgressRow label="Completed" count={78} percent={78} tone="emerald" />
            <ProgressRow label="Pending" count={15} percent={15} tone="amber" />
            <ProgressRow label="Overdue" count={7} percent={7} tone="rose" />
          </div>
          <div className="progress-ring-row">
            <CircularProgress label="Completed" value={78} tone="emerald" />
            <div className="progress-note">
              <strong>78% complete</strong>
              <p>Inspection pipeline is healthy, but overdue items need attention before the next cycle.</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

function ReportsPage() {
  return (
    <div className="page-stack">
      <section className="dashboard-grid split-two">
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Incident Reports</p>
              <h3>Incident Summary</h3>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Incident ID</th>
                  <th>Type</th>
                  <th>Severity</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.type}</td>
                    <td><StatusBadge value={row.severity} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Incident Distribution</p>
              <h3>Fire Safety Mix</h3>
            </div>
          </div>
          <DonutChart />
          <div className="distribution-list">
            {incidentMix.map((item) => (
              <div key={item.label} className="distribution-row">
                <span className="distribution-name">
                  <span className="distribution-dot" style={{ background: item.color }} />
                  {item.label}
                </span>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="dashboard-grid split-two">
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Maintenance Page</p>
              <h3>Maintenance Schedule</h3>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Equipment</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                {maintenance.map((row) => (
                  <tr key={row.equipment}>
                    <td>{row.equipment}</td>
                    <td>{row.due}</td>
                    <td><StatusBadge value={row.priority} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Review Notes</p>
              <h3>Compliance Highlights</h3>
            </div>
          </div>
          <div className="report-notes">
            <div>
              <strong>96% Compliance</strong>
              <p>Four sites are fully compliant and one requires maintenance follow-up before the next audit.</p>
            </div>
            <div>
              <strong>3 New Alerts</strong>
              <p>Operational teams should review live alarm conditions and inspection backlog first.</p>
            </div>
            <div>
              <strong>Maintenance Risk</strong>
              <p>Fire Pump 02 and Sprinkler Valve require priority scheduling this week.</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

function NotificationsDrawer({ onClose }) {
  return (
    <aside className="drawer notifications-drawer">
      <div className="drawer-header">
        <div>
          <p className="eyebrow">Notifications</p>
          <h3>Live Alerts</h3>
        </div>
        <button className="icon-button" onClick={onClose} aria-label="Close notifications">
          ×
        </button>
      </div>
      <div className="drawer-list">
        <div className="drawer-item">
          <strong>Tower A</strong>
          <p>Smoke detector activated in the east wing.</p>
        </div>
        <div className="drawer-item">
          <strong>Fire Pump 02</strong>
          <p>Maintenance due before 2:00 PM today.</p>
        </div>
        <div className="drawer-item">
          <strong>Building B</strong>
          <p>Inspection overdue and requires sign-off.</p>
        </div>
      </div>
    </aside>
  );
}

function SettingsDrawer({ onClose }) {
  return (
    <aside className="drawer settings-drawer">
      <div className="drawer-header">
        <div>
          <p className="eyebrow">Settings</p>
          <h3>System Controls</h3>
        </div>
        <button className="icon-button" onClick={onClose} aria-label="Close settings">
          ×
        </button>
      </div>
      <div className="drawer-list">
        <div className="drawer-item setting-control">
          <div>
            <strong>Auto Refresh</strong>
            <p>Update dashboard data every 30 seconds.</p>
          </div>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span />
          </label>
        </div>
        <div className="drawer-item setting-control">
          <div>
            <strong>Alert Threshold</strong>
            <p>Notify operators when compliance drops below a threshold.</p>
          </div>
          <select className="drawer-select" defaultValue="95%">
            <option>90%</option>
            <option>95%</option>
            <option>98%</option>
          </select>
        </div>
        <div className="drawer-item setting-control">
          <div>
            <strong>Email Summary</strong>
            <p>Send a daily compliance summary to supervisors.</p>
          </div>
          <label className="switch">
            <input type="checkbox" />
            <span />
          </label>
        </div>
        <div className="drawer-item setting-control">
          <div>
            <strong>Map Detail</strong>
            <p>Show pins, status, and building labels on the map widget.</p>
          </div>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span />
          </label>
        </div>
      </div>
    </aside>
  );
}

function StatusBadge({ value }) {
  const tone = String(value).toLowerCase().replace(/\s+/g, '-');
  return <span className={`badge ${tone}`}>{value}</span>;
}

function ProgressRow({ label, count, percent, tone }) {
  return (
    <div className={`progress-row ${tone}`}>
      <div>
        <strong>{label}</strong>
        <span>{count} ({percent}%)</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function TrendArrow({ direction }) {
  return <span className={`trend-arrow ${direction}`}>{direction === 'up' ? '↑' : '↓'}</span>;
}

function BarChart({ data }) {
  const max = Math.max(...data.map((item) => item.value));
  return (
    <div className="bar-chart" role="img" aria-label="Monthly inspection bar chart">
      {data.map((item) => (
        <div key={item.month} className="bar-column">
          <div className="bar-track">
            <div className="bar-fill" style={{ height: `${(item.value / max) * 100}%` }} />
          </div>
          <span className="bar-value">{item.value}</span>
          <span className="bar-label">{item.month}</span>
        </div>
      ))}
    </div>
  );
}

function LineChart({ series }) {
  const width = 640;
  const height = 280;
  const padding = 28;
  const pointCount = series[0].values.length;
  const allValues = series.flatMap((item) => item.values);
  const max = Math.max(...allValues);
  const min = Math.min(...allValues);
  const chartHeight = height - padding * 2;
  const chartWidth = width - padding * 2;
  const colors = ['#47d7ff', '#ffb020', '#ff6b8a'];

  const linePath = (values) =>
    values
      .map((value, index) => {
        const x = padding + (chartWidth / (pointCount - 1)) * index;
        const y = padding + chartHeight - ((value - min) / Math.max(max - min, 1)) * chartHeight;
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="line-chart" role="img" aria-label="Incident trend line chart">
      <defs>
        <linearGradient id="lineGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#47d7ff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#47d7ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((tick) => {
        const y = padding + (chartHeight / 3) * tick;
        return <line key={tick} x1={padding} y1={y} x2={width - padding} y2={y} className="grid-line" />;
      })}
      {series.map((item, index) => {
        const color = colors[index];
        const d = linePath(item.values);
        return (
          <g key={item.label}>
            <path
              d={`${d} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`}
              fill={index === 0 ? 'url(#lineGlow)' : 'transparent'}
              opacity={index === 0 ? 0.4 : 0}
            />
            <path d={d} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            {item.values.map((value, pointIndex) => {
              const x = padding + (chartWidth / (pointCount - 1)) * pointIndex;
              const y = padding + chartHeight - ((value - min) / Math.max(max - min, 1)) * chartHeight;
              return <circle key={`${item.label}-${pointIndex}`} cx={x} cy={y} r="4.5" fill={color} />;
            })}
          </g>
        );
      })}
    </svg>
  );
}

function DonutChart() {
  const radius = 88;
  const strokeWidth = 26;
  const circumference = 2 * Math.PI * radius;
  const total = incidentMix.reduce((sum, item) => sum + item.value, 0);
  let offset = 0;

  return (
          <div className="donut-wrap">
      <svg viewBox="0 0 240 240" className="donut-chart" role="img" aria-label="Incident distribution donut chart">
        <circle cx="120" cy="120" r={radius} className="donut-track" strokeWidth={strokeWidth} />
        {incidentMix.map((segment) => {
          const dash = (segment.value / total) * circumference;
          const circle = (
            <circle
              key={segment.label}
              cx="120"
              cy="120"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 120 120)"
              strokeLinecap="round"
            />
          );
          offset += dash;
          return circle;
        })}
      </svg>
      <div className="donut-center">
        <strong>124</strong>
        <span>Total Incidents</span>
      </div>
    </div>
  );
}

function CircularProgress({ label, value, tone }) {
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={`circular-progress ${tone}`}>
      <svg viewBox="0 0 120 120" aria-label={`${label} ${value}%`}>
        <circle cx="60" cy="60" r={radius} className="progress-track" strokeWidth={strokeWidth} />
        <circle
          cx="60"
          cy="60"
          r={radius}
          className="progress-value"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div>
        <strong>{value}%</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

function MapMarker({ top, left, label, status, tone }) {
  return (
    <div className={`map-marker ${tone}`} style={{ top, left }}>
      <span className="map-pin" />
      <span>{label}</span>
      <span className={`map-status ${tone}`}>{status}</span>
    </div>
  );
}

function MiniTrendChart({ values }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const points = values.map((value, index) => {
    const x = (index / Math.max(values.length - 1, 1)) * 100;
    const y = 100 - ((value - min) / Math.max(max - min, 1)) * 100;
    return `${x},${y}`;
  });

  return (
    <svg viewBox="0 0 100 100" className="mini-trend" aria-label="Safety trend chart">
      <polyline points={points.join(' ')} />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 13h7V4H4zM13 20h7V11h-7zM13 4v5h7V4zM4 20h7v-5H4z" />
    </svg>
  );
}

function EquipmentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 7h14v10H5zM3 9h2v6H3zM19 9h2v6h-2zM8 4h8v3H8zM8 17h8v3H8z" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 3h6v2h3v16H6V5h3zM8 7v12h8V7z" />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 4h14v16H5zM8 8h8v2H8zM8 12h8v2H8zM8 16h5v2H8z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3a5 5 0 0 0-5 5v3.2c0 .7-.2 1.4-.6 2l-1.4 2.3h14L17.6 13c-.4-.6-.6-1.3-.6-2V8a5 5 0 0 0-5-5zm0 18a2.5 2.5 0 0 0 2.4-1.8h-4.8A2.5 2.5 0 0 0 12 21z" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.4 13a7.8 7.8 0 0 0 0-2l2-1.6-2-3.4-2.4.8a7 7 0 0 0-1.7-1L15 3h-4l-.3 2.8a7 7 0 0 0-1.7 1L6.6 6 4.6 9.4 6.6 11a7.8 7.8 0 0 0 0 2l-2 1.6 2 3.4 2.4-.8a7 7 0 0 0 1.7 1L11 21h4l.3-2.8a7 7 0 0 0 1.7-1l2.4.8 2-3.4zM13 15a3 3 0 1 1 3-3 3 3 0 0 1-3 3z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z" />
    </svg>
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppShell />
  </BrowserRouter>,
);
