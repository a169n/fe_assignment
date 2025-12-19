import React from "react";
import {
  createBrowserRouter,
  NavLink,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import {
  LightningBoltIcon,
  MoonIcon,
  RocketIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import Button from "./components/ui/Button";
import Panel from "./components/ui/Panel";
import Badge from "./components/ui/Badge";
import { ProjectProvider } from "./context/ProjectContext";
import { useTheme } from "./context/ThemeContext";
import LandingPage from "./pages/LandingPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectBoardPage from "./pages/ProjectBoardPage";
import NotFoundPage from "./pages/NotFoundPage";

type NavigationLinkProps = {
  to: string;
  label: string;
};

const NavigationLink = ({ to, label }: NavigationLinkProps) => {
  const { tokens } = useTheme();
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 14px",
        color: isActive ? tokens.navTextActive : tokens.navText,
        textDecoration: "none",
        borderRadius: "12px",
        background: isActive ? tokens.navActiveBg : "transparent",
        border: isActive ? tokens.navActiveBorder : "1px solid transparent",
        transition: "all 0.2s ease",
      })}
    >
      {label}
    </NavLink>
  );
};

const RootLayout = () => {
  const { theme, toggleTheme, tokens } = useTheme();
  const isDark = theme === "dark";
  return (
    <div
      style={{
        minHeight: "100vh",
        background: tokens.pageBackground,
        color: tokens.textPrimary,
        transition: "background 0.3s ease, color 0.3s ease",
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
                background: `linear-gradient(135deg, ${tokens.accentHighlight}, ${tokens.accentPrimary})`,
                display: "grid",
                placeItems: "center",
                boxShadow:
                  "0 18px 40px rgba(79,70,229,0.35), 0 10px 30px rgba(0,0,0,0.22)",
              }}
            >
              <LightningBoltIcon color={isDark ? "#0b1021" : "#0f172a"} />
            </div>
            <div>
              <p
                style={{
                  margin: 0,
                  color: tokens.textSubtle,
                  letterSpacing: "0.05em",
                  fontSize: "12px",
                }}
              >
                DIGITAL TWIN ROADMAP
              </p>
              <h1 style={{ margin: 0 }}>Explainable Learning Control Room</h1>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Button
              variant="subtle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{ padding: "10px 12px" }}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
              {isDark ? "Light mode" : "Dark mode"}
            </Button>
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
};

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
    <Panel
      style={{
        background: "transparent",
        padding: 0,
        border: "none",
        boxShadow: "none",
      }}
    >
      <RouterProvider router={router} />
    </Panel>
  </ProjectProvider>
);

export default App;
