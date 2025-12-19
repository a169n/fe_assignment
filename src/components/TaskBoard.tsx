import React, { useEffect } from "react";
import { LightningBoltIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import AddTaskForm from "./AddTaskForm";
import Column from "./Column";
import Button from "./ui/Button";
import Panel from "./ui/Panel";
import Badge from "./ui/Badge";
import useProjectManager from "../hooks/useProjectManager";
import useUiStore from "../store/uiStore";
import { useTheme } from "../context/ThemeContext";

type TaskBoardProps = {
  projectId?: string;
};

const TaskBoard = ({ projectId }: TaskBoardProps) => {
  const { tokens, theme } = useTheme();
  const isDark = theme === "dark";
  const { selectedProjectId, filter, setFilter, setProject } = useUiStore();
  const effectiveProjectId = projectId ?? selectedProjectId;
  const { project, tasksByStatus, addTask, deleteTask, moveTask } =
    useProjectManager(effectiveProjectId);

  useEffect(() => {
    if (projectId && projectId !== selectedProjectId) {
      setProject(projectId);
    }
  }, [projectId, selectedProjectId, setProject]);

  const filteredTasks = {
    todo: tasksByStatus.todo.filter((task) =>
      task.title.toLowerCase().includes(filter.toLowerCase())
    ),
    "in-progress": tasksByStatus["in-progress"].filter((task) =>
      task.title.toLowerCase().includes(filter.toLowerCase())
    ),
    done: tasksByStatus.done.filter((task) =>
      task.title.toLowerCase().includes(filter.toLowerCase())
    ),
  };

  if (!project) {
    return <div style={{ color: tokens.warning }}>Project not found.</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${tokens.accentHighlight}, ${tokens.accentPrimary})`,
              display: "grid",
              placeItems: "center",
              boxShadow: "0 18px 40px rgba(79,70,229,0.45)",
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
            <h1 style={{ margin: 0 }}>{project.name} achievements</h1>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Panel
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 12px",
              background: tokens.surfaceAlt,
            }}
          >
            <MagnifyingGlassIcon />
            <input
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              placeholder="Filter tasks"
              style={{
                background: "transparent",
                border: "none",
                color: tokens.inputText,
                outline: "none",
                fontSize: "14px",
              }}
            />
          </Panel>
          <Badge label="Auto-syncing" tone="emerald" />
          <Button variant="ghost" style={{ padding: "10px 12px" }}>
            Save snapshot
          </Button>
        </div>
      </header>

      <AddTaskForm onSubmit={addTask} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "14px",
        }}
      >
        <Column
          status="todo"
          tasks={filteredTasks.todo}
          onMove={moveTask}
          onDelete={deleteTask}
        />
        <Column
          status="in-progress"
          tasks={filteredTasks["in-progress"]}
          onMove={moveTask}
          onDelete={deleteTask}
        />
        <Column
          status="done"
          tasks={filteredTasks.done}
          onMove={moveTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
};

export default TaskBoard;
