import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { DashboardIcon, LightningBoltIcon } from "@radix-ui/react-icons";
import Panel from "../components/ui/Panel";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import ProjectContext from "../context/ProjectContext";

const ProjectCard = ({ project }) => {
  const totalTasks = project.tasks.length;
  const done = project.tasks.filter((task) => task.status === "done").length;
  const inProgress = project.tasks.filter((task) => task.status === "in-progress").length;

  return (
    <Panel
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: "linear-gradient(135deg, rgba(79,70,229,0.08), rgba(15,23,42,0.9))",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span
            style={{
              height: "38px",
              width: "38px",
              borderRadius: "12px",
              display: "grid",
              placeItems: "center",
              background: "rgba(99,102,241,0.18)",
              color: "#c7d2fe",
            }}
          >
            <LightningBoltIcon />
          </span>
          <div>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: "12px" }}>Project</p>
            <h3 style={{ margin: 0 }}>{project.name}</h3>
          </div>
        </div>
        <Badge label={`${done}/${totalTasks} done`} tone="amber" icon={<DashboardIcon />} />
      </div>
      <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.5 }}>{project.description}</p>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", color: "#94a3b8" }}>
        <span>Backlog: {totalTasks}</span>
        <span>In delivery: {inProgress}</span>
        <span>Ready to demo: {done}</span>
      </div>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Button as={Link} to={`/projects/${project.id}`} style={{ padding: "10px 14px" }}>
          Open board
        </Button>
        <Button
          as={Link}
          variant="ghost"
          to={`/projects/${project.id}`}
          style={{ padding: "10px 14px" }}
        >
          Impact brief
        </Button>
      </div>
    </Panel>
  );
};

const ProjectsPage = () => {
  const { state } = useContext(ProjectContext);

  const roadmapStats = useMemo(() => {
    const allTasks = state.projects.flatMap((project) => project.tasks);
    const done = allTasks.filter((task) => task.status === "done").length;
    const inProgress = allTasks.filter((task) => task.status === "in-progress").length;
    return { total: allTasks.length, done, inProgress };
  }, [state.projects]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Panel style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ margin: 0, color: "#94a3b8", letterSpacing: "0.04em", fontSize: "12px" }}>
            TWIN GOVERNANCE
          </p>
          <h2 style={{ margin: 0 }}>Projects aligned to learner outcomes</h2>
          <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.5 }}>
            Track the initiatives that operationalize explainable AI and learning science across cohorts.
          </p>
        </div>
        <Badge tone="emerald" label={`${roadmapStats.done}/${roadmapStats.total} outcomes ready`} />
      </Panel>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "14px",
        }}
      >
        {state.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
