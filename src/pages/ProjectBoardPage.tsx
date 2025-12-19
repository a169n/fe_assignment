import React from "react";
import { Link, useParams } from "react-router-dom";
import Panel from "../components/ui/Panel";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import TaskBoard from "../components/TaskBoard";
import { useTheme } from "../context/ThemeContext";

const ProjectBoardPage = () => {
  const { projectId } = useParams<{ projectId?: string }>();
  const { tokens } = useTheme();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Panel
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: tokens.textSubtle,
              letterSpacing: "0.04em",
              fontSize: "12px",
            }}
          >
            DELIVERY BOARD
          </p>
          <h2 style={{ margin: 0 }}>Operationalize interventions</h2>
          <p style={{ margin: 0, color: tokens.textMuted, lineHeight: 1.5 }}>
            Move backlog items through explainable review, data alignment, and
            deployment to live learners.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <Badge label="Live data feed" tone="amber" />
          <Button
            as={Link}
            to="/projects"
            variant="ghost"
            style={{ padding: "10px 14px" }}
          >
            Projects
          </Button>
        </div>
      </Panel>

      <TaskBoard projectId={projectId} />
    </div>
  );
};

export default ProjectBoardPage;
