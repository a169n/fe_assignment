import React from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import Button from "./ui/Button";
import Panel from "./ui/Panel";
import Task from "./Task";
import { useTheme } from "../context/ThemeContext";
import type { Task as TaskType, TaskStatus } from "../types/projects";

const statusTitles: Record<TaskStatus, string> = {
  todo: "Backlog",
  "in-progress": "In Progress",
  done: "Done",
};

type ColumnProps = {
  status: TaskStatus;
  tasks: TaskType[];
  onMove: (taskId: string, direction: "forward" | "backward") => void;
  onDelete: (taskId: string) => void;
};

const Column = ({ status, tasks, onMove, onDelete }: ColumnProps) => {
  const { tokens } = useTheme();
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
          <div
            style={{
              color: tokens.textSubtle,
              fontSize: "12px",
              letterSpacing: "0.08em",
            }}
          >
            {status.toUpperCase()}
          </div>
          <h3 style={{ margin: 0, marginTop: "4px", fontSize: "18px" }}>
            {statusTitles[status]}
          </h3>
        </div>
        <div
          style={{
            background: tokens.navActiveBg,
            padding: "8px 10px",
            borderRadius: "10px",
            border: tokens.navActiveBorder,
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
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "flex-end",
                }}
              >
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
                  style={{
                    padding: "8px",
                    borderRadius: "10px",
                    color: tokens.warning,
                  }}
                >
                  <TrashIcon />
                </Button>
              </div>
            }
          />
        ))}
        {tasks.length === 0 && (
          <div
            style={{
              color: tokens.textSubtle,
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            Nothing here yet.
          </div>
        )}
      </div>
    </Panel>
  );
};

export default Column;
