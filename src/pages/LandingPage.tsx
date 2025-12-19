import React from "react";
import { Link } from "react-router-dom";
import {
  BarChartIcon,
  ChatBubbleIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import Panel from "../components/ui/Panel";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { useTheme } from "../context/ThemeContext";

type FeatureProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const Feature = ({ title, description, icon }: FeatureProps) => {
  const { tokens } = useTheme();
  return (
    <Panel
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        minHeight: "160px",
        background: tokens.featureGradient,
      }}
    >
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <span
          style={{
            height: "36px",
            width: "36px",
            borderRadius: "12px",
            background: tokens.navActiveBg,
            display: "grid",
            placeItems: "center",
            color: tokens.highlightText,
          }}
        >
          {icon}
        </span>
        <h3 style={{ margin: 0 }}>{title}</h3>
      </div>
      <p style={{ margin: 0, color: tokens.textMuted, lineHeight: 1.5 }}>
        {description}
      </p>
    </Panel>
  );
};

const LandingPage = () => {
  const { tokens } = useTheme();
  return (
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
          <Badge
            tone="emerald"
            label="Digital twin + XAI"
            icon={<MixerHorizontalIcon />}
          />
          <h2 style={{ margin: 0, fontSize: "28px", lineHeight: 1.2 }}>
            Intelligent Educational Platform with explainable signals and
            twin-aligned tasks.
          </h2>
          <p style={{ margin: 0, color: tokens.textMuted, lineHeight: 1.6 }}>
            Coordinate projects that translate learner telemetry into
            transparent insights. Govern data pipelines, map interventions to
            student twins, and ship dashboards that faculty can trust.
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Button
              as={Link}
              to="/projects/p1"
              style={{ padding: "12px 16px" }}
            >
              Open delivery board
            </Button>
            <Button
              as={Link}
              variant="ghost"
              to="/projects"
              style={{ padding: "12px 16px" }}
            >
              View initiatives
            </Button>
          </div>
        </div>
        <Panel
          style={{
            background: `linear-gradient(135deg, ${tokens.accentHighlight}1f, ${tokens.accentPrimary}14)`,
            border: `1px solid ${tokens.softBorder}`,
            display: "grid",
            gap: "12px",
          }}
        >
          <div>
            <p style={{ margin: 0, color: tokens.textSubtle }}>
              Telemetry cadence
            </p>
            <h3 style={{ margin: 0 }}>Predictive risk updates every 4 hours</h3>
          </div>
          <div
            style={{
              display: "grid",
              gap: "10px",
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            <Panel
              style={{
                padding: "14px",
                background: tokens.surfaceAlt,
                border: `1px solid ${tokens.softBorder}`,
              }}
            >
              <p style={{ margin: 0, color: tokens.textMuted }}>
                Explainable factors tracked
              </p>
              <h4 style={{ margin: "6px 0 0" }}>68 signals</h4>
            </Panel>
            <Panel
              style={{
                padding: "14px",
                background: tokens.surfaceAlt,
                border: `1px solid ${tokens.softBorder}`,
              }}
            >
              <p style={{ margin: 0, color: tokens.textMuted }}>
                Cohorts with twin coverage
              </p>
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
};

export default LandingPage;
