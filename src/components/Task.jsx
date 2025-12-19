import React from "react";
import Panel from "./ui/Panel";

const Task = ({ task, actions }) => {
  return (
    <Panel
      style={{
        background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(14,165,233,0.06))",
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "14px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{
            background: "rgba(255,255,255,0.04)",
            padding: "6px 10px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.06)",
            fontSize: "12px",
            letterSpacing: "0.05em",
          }}
        >
          {task.status.toUpperCase()}
        </div>
        {actions}
      </div>
      <h4 style={{ margin: "12px 0 6px", fontSize: "16px" }}>{task.title}</h4>
      {task.description && (
        <p style={{ margin: 0, color: "#94a3b8", lineHeight: 1.5 }}>{task.description}</p>
      )}
    </Panel>
  );
};

export default Task;
