import React from "react";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "@radix-ui/react-icons";
import Button from "./ui/Button";
import Panel from "./ui/Panel";
import Task from "./Task";

const statusTitles = {
  todo: "Backlog",
  "in-progress": "In Progress",
  done: "Done",
};

const Column = ({ status, tasks, onMove, onDelete }) => {
  return (
    <Panel
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        flex: 1,
        minWidth: "260px",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "8px",
        }}
      >
        <div>
          <div style={{ color: "#94a3b8", fontSize: "12px", letterSpacing: "0.08em" }}>
            {status.toUpperCase()}
          </div>
          <h3 style={{ margin: 0, marginTop: "4px", fontSize: "18px" }}>{statusTitles[status]}</h3>
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            padding: "8px 10px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.05)",
            fontWeight: 700,
            fontSize: "14px",
          }}
        >
          {tasks.length}
        </div>
      </header>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            actions={
              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                <Button
                  aria-label="move left"
                  variant="ghost"
                  disabled={task.status === "todo"}
                  onClick={() => onMove(task.id, "backward")}
                  style={{ padding: "8px", borderRadius: "10px" }}
                >
                  <ArrowLeftIcon />
                </Button>
                <Button
                  aria-label="move right"
                  variant="ghost"
                  disabled={task.status === "done"}
                  onClick={() => onMove(task.id, "forward")}
                  style={{ padding: "8px", borderRadius: "10px" }}
                >
                  <ArrowRightIcon />
                </Button>
                <Button
                  aria-label="delete"
                  variant="ghost"
                  onClick={() => onDelete(task.id)}
                  style={{ padding: "8px", borderRadius: "10px", color: "#fca5a5" }}
                >
                  <TrashIcon />
                </Button>
              </div>
            }
          />
        ))}
        {tasks.length === 0 && (
          <div style={{ color: "#94a3b8", fontSize: "14px", textAlign: "center" }}>
            Nothing here yet.
          </div>
        )}
      </div>
    </Panel>
  );
};

export default Column;
