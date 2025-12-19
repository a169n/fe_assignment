import React from "react";
import { Link } from "react-router-dom";
import { BarChartIcon, ChatBubbleIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import Panel from "../components/ui/Panel";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";

const Feature = ({ title, description, icon }) => (
  <Panel
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      minHeight: "160px",
      background: "linear-gradient(180deg, rgba(99,102,241,0.06), rgba(15,23,42,0.85))",
    }}
  >
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <span
        style={{
          height: "36px",
          width: "36px",
          borderRadius: "12px",
          background: "rgba(99,102,241,0.15)",
          display: "grid",
          placeItems: "center",
          color: "#c7d2fe",
        }}
      >
        {icon}
      </span>
      <h3 style={{ margin: 0 }}>{title}</h3>
    </div>
    <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.5 }}>{description}</p>
  </Panel>
);

const LandingPage = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
    <Panel
      style={{
        display: "grid",
        gap: "16px",
        gridTemplateColumns: "1.2fr 1fr",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Badge tone="emerald" label="Digital twin + XAI" icon={<MixerHorizontalIcon />} />
        <h2 style={{ margin: 0, fontSize: "28px", lineHeight: 1.2 }}>
          Intelligent Educational Platform with explainable signals and twin-aligned tasks.
        </h2>
        <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.6 }}>
          Coordinate projects that translate learner telemetry into transparent insights. Govern data
          pipelines, map interventions to student twins, and ship dashboards that faculty can trust.
        </p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Button as={Link} to="/projects/p1" style={{ padding: "12px 16px" }}>
            Open delivery board
          </Button>
          <Button as={Link} variant="ghost" to="/projects" style={{ padding: "12px 16px" }}>
            View initiatives
          </Button>
        </div>
      </div>
      <Panel
        style={{
          background: "linear-gradient(135deg, rgba(56,189,248,0.12), rgba(99,102,241,0.08))",
          border: "1px solid rgba(99,102,241,0.18)",
          display: "grid",
          gap: "12px",
        }}
      >
        <div>
          <p style={{ margin: 0, color: "#94a3b8" }}>Telemetry cadence</p>
          <h3 style={{ margin: 0 }}>Predictive risk updates every 4 hours</h3>
        </div>
        <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "repeat(2, 1fr)" }}>
          <Panel style={{ padding: "14px", background: "rgba(15,23,42,0.6)" }}>
            <p style={{ margin: 0, color: "#cbd5e1" }}>Explainable factors tracked</p>
            <h4 style={{ margin: "6px 0 0" }}>68 signals</h4>
          </Panel>
          <Panel style={{ padding: "14px", background: "rgba(15,23,42,0.6)" }}>
            <p style={{ margin: 0, color: "#cbd5e1" }}>Cohorts with twin coverage</p>
            <h4 style={{ margin: "6px 0 0" }}>14 programs</h4>
          </Panel>
        </div>
      </Panel>
    </Panel>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "14px",
      }}
    >
      <Feature
        title="Explainable analytics"
        description="Expose why a learner is trending at-risk, surfacing assessment weight, engagement drift, and cohort benchmarks."
        icon={<BarChartIcon />}
      />
      <Feature
        title="Digital twin governance"
        description="Align tasks to twin attributes like skill mastery, resilience, and pacing, keeping instructors in the loop."
        icon={<MixerHorizontalIcon />}
      />
      <Feature
        title="Human-in-the-loop feedback"
        description="Capture faculty annotations, summarize them, and sync back to the intervention backlog for rapid follow-up."
        icon={<ChatBubbleIcon />}
      />
    </div>
  </div>
);

export default LandingPage;
