import React from "react";
import {
  createBrowserRouter,
  NavLink,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { LightningBoltIcon, RocketIcon } from "@radix-ui/react-icons";
import Button from "./components/ui/Button";
import Panel from "./components/ui/Panel";
import Badge from "./components/ui/Badge";
import { ProjectProvider } from "./context/ProjectContext";
import LandingPage from "./pages/LandingPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectBoardPage from "./pages/ProjectBoardPage";
import NotFoundPage from "./pages/NotFoundPage";

const NavigationLink = ({ to, label }) => (
  <NavLink
    to={to}
    style={({ isActive }) => ({
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 14px",
      color: isActive ? "#c7d2fe" : "#e2e8f0",
      textDecoration: "none",
      borderRadius: "12px",
      background: isActive ? "rgba(79,70,229,0.16)" : "transparent",
      border: isActive ? "1px solid rgba(79,70,229,0.4)" : "1px solid transparent",
      transition: "all 0.2s ease",
    })}
  >
    {label}
  </NavLink>
);

const RootLayout = () => (
  <div
    style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at 20% 20%, rgba(79,70,229,0.08), transparent 30%), #0b1021",
      color: "#e2e8f0",
    }}
  >
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "26px" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: "18px",
        }}
      >
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div
            style={{
              height: "46px",
              width: "46px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #38bdf8, #6366f1)",
              display: "grid",
              placeItems: "center",
              boxShadow: "0 18px 40px rgba(79,70,229,0.45)",
            }}
          >
            <LightningBoltIcon color="#0b1021" />
          </div>
          <div>
            <p style={{ margin: 0, color: "#94a3b8", letterSpacing: "0.05em", fontSize: "12px" }}>
              DIGITAL TWIN ROADMAP
            </p>
            <h1 style={{ margin: 0 }}>Explainable Learning Control Room</h1>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Badge icon={<RocketIcon />} label="Early access" tone="blue" />
          <Button
            variant="ghost"
            as="a"
            href="https://example.com/brief"
            style={{ padding: "12px 14px" }}
          >
            Platform brief
          </Button>
        </div>
      </header>
      <nav style={{ display: "flex", gap: "10px", marginBottom: "22px" }}>
        <NavigationLink to="/" label="Mission" />
        <NavigationLink to="/projects" label="Projects" />
        <NavigationLink to="/projects/p1" label="Delivery board" />
      </nav>
      <Outlet />
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "projects/:projectId", element: <ProjectBoardPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

const App = () => (
  <ProjectProvider>
    <Panel style={{ background: "transparent", padding: 0, border: "none", boxShadow: "none" }}>
      <RouterProvider router={router} />
    </Panel>
  </ProjectProvider>
);

export default App;
