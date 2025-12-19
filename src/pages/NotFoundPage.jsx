import React from "react";
import { Link } from "react-router-dom";
import Panel from "../components/ui/Panel";
import Button from "../components/ui/Button";

const NotFoundPage = () => (
  <Panel style={{ textAlign: "center", padding: "36px" }}>
    <h2 style={{ marginTop: 0 }}>Signal not found</h2>
    <p style={{ color: "#cbd5e1" }}>
      The requested view is not part of the digital twin workspace. Choose a project to continue.
    </p>
    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
      <Button as={Link} to="/" style={{ padding: "10px 14px" }}>
        Return home
      </Button>
      <Button as={Link} variant="ghost" to="/projects" style={{ padding: "10px 14px" }}>
        View projects
      </Button>
    </div>
  </Panel>
);

export default NotFoundPage;
