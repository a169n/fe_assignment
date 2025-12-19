import React from "react";
import Panel from "./ui/Panel";
import { useTheme } from "../context/ThemeContext";
import type { Task as TaskType } from "../types/projects";

type TaskProps = {
  task: TaskType;
  actions?: React.ReactNode;
};

const Task = ({ task, actions }: TaskProps) => {
  const { tokens } = useTheme();
  return (
    <Panel
      style={{
        background: tokens.accentBlend,
        border: `1px solid ${tokens.border}`,
        padding: "14px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: tokens.glass,
            padding: "6px 10px",
            borderRadius: "10px",
            border: `1px solid ${tokens.softBorder}`,
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
        <p style={{ margin: 0, color: tokens.textSubtle, lineHeight: 1.5 }}>
          {task.description}
        </p>
      )}
    </Panel>
  );
};

export default Task;
