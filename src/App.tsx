import React, { useEffect, useMemo, useState } from "react";
import Stepper from "./components/Stepper";

type ThemeKey = "dark" | "light";

const themes = {
  dark: {
    background:
      "radial-gradient(120% 120% at 10% 20%, #1e3a8a 0%, #0b1224 40%, #0b1120 60%, #020617 100%)",
    glowA: "radial-gradient(circle, #22d3ee33, transparent 60%)",
    glowB: "radial-gradient(circle, #8b5cf633, transparent 60%)",
    card: "linear-gradient(145deg, #0b1629, #0f172a)",
    panel: "rgba(255,255,255,0.03)",
    border: "rgba(255,255,255,0.08)",
    text: "#e2e8f0",
    muted: "#cbd5e1",
    badgeBg: "rgba(255,255,255,0.06)",
    badgeBorder: "rgba(255,255,255,0.14)",
    shadow:
      "0 24px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
    pillBg: "rgba(255,255,255,0.04)",
    stepperAppearance: {
      primary: "#60a5fa",
      primarySoft: "linear-gradient(135deg,#12253f,#1f2937)",
      primaryMuted: "#1f2937",
      surface: "#0f172a",
      surfaceMuted: "#0b1224",
      border: "rgba(255,255,255,0.12)",
      text: "#e2e8f0",
      textMuted: "#cbd5e1",
      success: "#22c55e",
      warning: "#f97316",
      track: "#1f2937",
    },
  },
  light: {
    background:
      "radial-gradient(90% 80% at 30% 20%, #dbeafe 0%, #f8fafc 40%, #ffffff 70%)",
    glowA: "radial-gradient(circle, #bfdbfe55, transparent 60%)",
    glowB: "radial-gradient(circle, #c7d2fe55, transparent 60%)",
    card: "linear-gradient(145deg, #ffffff, #f8fafc)",
    panel: "rgba(255,255,255,0.8)",
    border: "#e2e8f0",
    text: "#0f172a",
    muted: "#475569",
    badgeBg: "#eef2ff",
    badgeBorder: "#c7d2fe",
    shadow: "0 20px 40px rgba(15,23,42,0.12)",
    pillBg: "#f8fafc",
    stepperAppearance: {
      primary: "#2563eb",
      primarySoft: "linear-gradient(135deg,#e0ebff,#f8fafc)",
      primaryMuted: "#e8f0fe",
      surface: "#ffffff",
      surfaceMuted: "#f8fafc",
      border: "#d0d7e2",
      text: "#0f172a",
      textMuted: "#475569",
      success: "#16a34a",
      warning: "#f97316",
      track: "#e2e8f0",
    },
  },
};

const badgeStyleBase = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "6px 10px",
  borderRadius: "999px",
  fontSize: "12px",
};

const App = () => {
  const [theme, setTheme] = useState<ThemeKey>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }
    return "dark";
  });
  const [activeStep, setActiveStep] = useState(0);
  const [projectName, setProjectName] = useState("");
  const [category, setCategory] = useState("simulation");
  const [notes, setNotes] = useState("");
  const [teamSize, setTeamSize] = useState(5);
  const [methodology, setMethodology] = useState("agile");
  const [skills, setSkills] = useState<string[]>(["Data sync", "QA ops"]);
  const [skillInput, setSkillInput] = useState("");
  const [includeCompliance, setIncludeCompliance] = useState(true);
  const [riskLevel, setRiskLevel] = useState<"low" | "medium" | "high">(
    "medium",
  );
  const [complianceOwner, setComplianceOwner] = useState("security@acme.io");
  const [slackChannel, setSlackChannel] = useState("#control-room");

  const palette = useMemo(() => themes[theme], [theme]);
  const basicsError = projectName.trim() === "";
  const totalSteps = includeCompliance ? 4 : 3;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const listener = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "light" : "dark");
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const lastIndex = totalSteps - 1;
    if (activeStep > lastIndex) {
      setActiveStep(lastIndex);
    }
  }, [activeStep, totalSteps]);

  const addSkill = () => {
    const next = skillInput.trim();
    if (!next) return;
    if (skills.includes(next)) {
      setSkillInput("");
      return;
    }
    setSkills([...skills, next]);
    setSkillInput("");
  };

  const removeSkill = (target: string) => {
    setSkills((prev) => prev.filter((item) => item !== target));
  };

  const badgeStyle = {
    ...badgeStyleBase,
    border: `1px solid ${palette.badgeBorder}`,
    background: palette.badgeBg,
    color: palette.text,
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: palette.background,
        color: palette.text,
        padding: "38px 18px 52px",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          width: "min(1100px, 100%)",
          display: "grid",
          gap: "18px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-80px auto auto -120px",
            width: "280px",
            height: "280px",
            background: palette.glowA,
            filter: "blur(18px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "auto -60px -80px auto",
            width: "260px",
            height: "260px",
            background: palette.glowB,
            filter: "blur(18px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            background: palette.card,
            border: `1px solid ${palette.border}`,
            borderRadius: "18px",
            padding: "18px 18px 16px",
            boxShadow: palette.shadow,
            display: "grid",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <span style={badgeStyle}>Assignment 2 · Compound Components</span>
              <span style={badgeStyle}>Keyboard: arrows + home/end</span>
              <span style={badgeStyle}>Render props enabled</span>
            </div>
            <button
              type="button"
              onClick={() =>
                setTheme((prev) => (prev === "dark" ? "light" : "dark"))
              }
              aria-label="Toggle theme"
              style={{
                padding: "10px 12px",
                borderRadius: "12px",
                border: `1px solid ${palette.border}`,
                background: palette.pillBg,
                color: palette.text,
                cursor: "pointer",
              }}
            >
              {theme === "dark" ? "🌞 Light mode" : "🌙 Dark mode"}
            </button>
          </div>
          <h1 style={{ margin: "4px 0 6px", letterSpacing: "-0.02em" }}>
            Dynamic Orchestrator Stepper
          </h1>
          <p style={{ margin: 0, color: palette.muted, maxWidth: "820px" }}>
            Compound components keep state in sync, render props customize
            steps, and accessibility is wired via ARIA tabs. Toggle the optional
            compliance step or add skills to see the system react live.
          </p>
        </div>

        <div
          style={{
            background: palette.panel,
            border: `1px solid ${palette.border}`,
            borderRadius: "20px",
            padding: "18px",
            boxShadow:
              theme === "dark"
                ? "0 20px 50px rgba(0,0,0,0.4)"
                : "0 16px 36px rgba(15,23,42,0.12)",
            backdropFilter: "blur(10px)",
            display: "grid",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 12px",
                  background: palette.pillBg,
                  borderRadius: "12px",
                  border: `1px solid ${palette.border}`,
                  cursor: "pointer",
                }}
              >
                <span style={{ fontWeight: 600 }}>Compliance step</span>
                <span
                  style={{
                    width: "50px",
                    height: "26px",
                    borderRadius: "999px",
                    background: includeCompliance ? "#22c55e" : "#94a3b8",
                    position: "relative",
                    transition: "background 0.2s ease",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "3px",
                      left: includeCompliance ? "26px" : "4px",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: theme === "dark" ? "#0b1120" : "#ffffff",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.35)",
                      transition: "left 0.2s ease",
                    }}
                  />
                </span>
                <input
                  type="checkbox"
                  checked={includeCompliance}
                  onChange={(e) => setIncludeCompliance(e.target.checked)}
                  style={{ display: "none" }}
                  aria-label="Toggle compliance step"
                />
              </label>
              <span style={{ color: palette.muted }}>
                {includeCompliance ? "Security review on" : "Skip compliance"}
              </span>
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                background: palette.pillBg,
                borderRadius: "12px",
                border: `1px solid ${palette.border}`,
              }}
            >
              <span style={{ color: palette.muted }}>Active step</span>
              <strong>
                {activeStep + 1}/{totalSteps}
              </strong>
            </div>
          </div>

          <Stepper
            activeStep={activeStep}
            onStepChange={setActiveStep}
            initialStep={0}
            orientation="horizontal"
            appearance={palette.stepperAppearance}
          >
            <Stepper.Progress />

            <Stepper.Steps>
              <Stepper.Step>
                {({ isComplete }) => (
                  <span>
                    Basics {isComplete ? "✓" : projectName ? "— filled" : ""}
                  </span>
                )}
              </Stepper.Step>
              <Stepper.Step>
                {({ isComplete }) => (
                  <span>
                    Team · {teamSize} {teamSize === 1 ? "person" : "people"}{" "}
                    {isComplete ? "✓" : ""}
                  </span>
                )}
              </Stepper.Step>
              {includeCompliance && <Stepper.Step label="Compliance" />}
              <Stepper.Step>
                {({ isActive, isComplete }) => (
                  <span>
                    Review {isComplete ? "✓" : isActive ? "(current)" : ""}
                  </span>
                )}
              </Stepper.Step>
            </Stepper.Steps>

            <Stepper.Panels>
              <Stepper.Panel>
                {({ goToNext }) => (
                  <div style={{ display: "grid", gap: "12px" }}>
                    <div style={{ display: "grid", gap: "6px" }}>
                      <label style={{ fontWeight: 600 }} htmlFor="project-name">
                        Project name
                      </label>
                      <input
                        id="project-name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="Autonomous rig"
                        style={{
                          padding: "12px 14px",
                          borderRadius: "12px",
                          border: basicsError
                            ? `1px solid ${palette.stepperAppearance.warning}`
                            : `1px solid ${palette.border}`,
                          background: palette.stepperAppearance.surface,
                          color: palette.text,
                          boxShadow: basicsError
                            ? `0 0 0 2px ${palette.stepperAppearance.warning}33`
                            : "none",
                        }}
                        aria-invalid={basicsError}
                        aria-describedby="project-error"
                      />
                      {basicsError && (
                        <span
                          id="project-error"
                          style={{
                            color: palette.stepperAppearance.warning,
                            fontSize: "13px",
                          }}
                        >
                          Add a project name to continue.
                        </span>
                      )}
                    </div>
                    <label style={{ display: "grid", gap: "6px" }}>
                      <span style={{ fontWeight: 600 }}>Category</span>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{
                          padding: "12px 14px",
                          borderRadius: "12px",
                          border: `1px solid ${palette.border}`,
                          background: palette.stepperAppearance.surface,
                          color: palette.text,
                        }}
                      >
                        <option value="simulation">Simulation</option>
                        <option value="optimization">Optimization</option>
                        <option value="analytics">Analytics</option>
                        <option value="monitoring">Monitoring</option>
                      </select>
                    </label>
                    <label style={{ display: "grid", gap: "6px" }}>
                      <span style={{ fontWeight: 600 }}>Slack channel</span>
                      <input
                        value={slackChannel}
                        onChange={(e) => setSlackChannel(e.target.value)}
                        placeholder="#control-room"
                        style={{
                          padding: "12px 14px",
                          borderRadius: "12px",
                          border: `1px solid ${palette.border}`,
                          background: palette.stepperAppearance.surface,
                          color: palette.text,
                        }}
                      />
                    </label>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        type="button"
                        onClick={goToNext}
                        disabled={basicsError}
                        style={{
                          padding: "12px 16px",
                          background: basicsError
                            ? palette.stepperAppearance.textMuted
                            : palette.stepperAppearance.primary,
                          color:
                            theme === "light" && basicsError ? "#fff" : "#fff",
                          border: "none",
                          borderRadius: "12px",
                          cursor: basicsError ? "not-allowed" : "pointer",
                          boxShadow: basicsError
                            ? "none"
                            : `0 12px 30px ${palette.stepperAppearance.primary}44`,
                        }}
                      >
                        Continue →
                      </button>
                    </div>
                  </div>
                )}
              </Stepper.Panel>

              <Stepper.Panel>
                {({ goToPrevious, goToNext }) => (
                  <div style={{ display: "grid", gap: "12px" }}>
                    <div
                      style={{
                        display: "grid",
                        gap: "6px",
                        alignItems: "center",
                      }}
                    >
                      <label style={{ fontWeight: 600 }} htmlFor="team-size">
                        Team size ({teamSize})
                      </label>
                      <input
                        id="team-size"
                        type="range"
                        min={1}
                        max={15}
                        value={teamSize}
                        onChange={(e) => setTeamSize(Number(e.target.value))}
                        style={{ width: "100%" }}
                      />
                    </div>
                    <label style={{ display: "grid", gap: "6px" }}>
                      <span style={{ fontWeight: 600 }}>Methodology</span>
                      <select
                        value={methodology}
                        onChange={(e) => setMethodology(e.target.value)}
                        style={{
                          padding: "12px 14px",
                          borderRadius: "12px",
                          border: `1px solid ${palette.border}`,
                          background: palette.stepperAppearance.surface,
                          color: palette.text,
                        }}
                      >
                        <option value="agile">Agile</option>
                        <option value="waterfall">Waterfall</option>
                        <option value="lean">Lean</option>
                        <option value="dual-track">Dual track</option>
                      </select>
                    </label>
                    <div style={{ display: "grid", gap: "8px" }}>
                      <span style={{ fontWeight: 600 }}>Capabilities</span>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        {skills.map((skill) => (
                          <span
                            key={skill}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "8px 10px",
                              borderRadius: "12px",
                              background: "rgba(34,197,94,0.12)",
                              color: palette.text,
                              border: `1px solid ${palette.stepperAppearance.success}88`,
                            }}
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              aria-label={`Remove ${skill}`}
                              style={{
                                background: "transparent",
                                color: "inherit",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: 700,
                              }}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          flexWrap: "wrap",
                        }}
                      >
                        <input
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addSkill();
                            }
                          }}
                          placeholder="Add skill and hit Enter"
                          style={{
                            flex: "1 1 180px",
                            padding: "10px 12px",
                            borderRadius: "10px",
                            border: `1px solid ${palette.border}`,
                            background: palette.stepperAppearance.surface,
                            color: palette.text,
                          }}
                        />
                        <button
                          type="button"
                          onClick={addSkill}
                          style={{
                            padding: "10px 14px",
                            background: palette.stepperAppearance.success,
                            color: theme === "dark" ? "#0b1120" : "#0f172a",
                            border: "none",
                            borderRadius: "10px",
                            cursor: "pointer",
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        type="button"
                        onClick={goToPrevious}
                        style={{
                          padding: "12px 14px",
                          background: palette.pillBg,
                          color: palette.text,
                          border: `1px solid ${palette.border}`,
                          borderRadius: "12px",
                          cursor: "pointer",
                        }}
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={goToNext}
                        style={{
                          padding: "12px 16px",
                          background: palette.stepperAppearance.primary,
                          color: "#fff",
                          border: "none",
                          borderRadius: "12px",
                          cursor: "pointer",
                          boxShadow: `0 12px 30px ${palette.stepperAppearance.primary}33`,
                        }}
                      >
                        {includeCompliance ? "Compliance →" : "Review →"}
                      </button>
                    </div>
                  </div>
                )}
              </Stepper.Panel>

              {includeCompliance && (
                <Stepper.Panel>
                  {({ goToPrevious, goToNext }) => (
                    <div style={{ display: "grid", gap: "12px" }}>
                      <div style={{ display: "grid", gap: "8px" }}>
                        <span style={{ fontWeight: 600 }}>Risk level</span>
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap",
                          }}
                          role="group"
                          aria-label="Risk level"
                        >
                          {["low", "medium", "high"].map((level) => (
                            <button
                              key={level}
                              type="button"
                              onClick={() =>
                                setRiskLevel(level as typeof riskLevel)
                              }
                              aria-pressed={riskLevel === level}
                              style={{
                                padding: "10px 12px",
                                borderRadius: "10px",
                                border:
                                  riskLevel === level
                                    ? `2px solid ${palette.stepperAppearance.success}`
                                    : `1px solid ${palette.border}`,
                                background:
                                  riskLevel === level
                                    ? "rgba(34,197,94,0.15)"
                                    : palette.stepperAppearance.surface,
                                color: palette.text,
                                cursor: "pointer",
                              }}
                            >
                              {level.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </div>
                      <label style={{ display: "grid", gap: "6px" }}>
                        <span style={{ fontWeight: 600 }}>
                          Compliance owner
                        </span>
                        <input
                          value={complianceOwner}
                          onChange={(e) => setComplianceOwner(e.target.value)}
                          style={{
                            padding: "12px 14px",
                            borderRadius: "12px",
                            border: `1px solid ${palette.border}`,
                            background: palette.stepperAppearance.surface,
                            color: palette.text,
                          }}
                        />
                      </label>
                      <label style={{ display: "grid", gap: "6px" }}>
                        <span style={{ fontWeight: 600 }}>Notes</span>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Add constraints, deadlines, or risks..."
                          rows={4}
                          style={{
                            padding: "12px 14px",
                            borderRadius: "12px",
                            border: `1px solid ${palette.border}`,
                            background: palette.stepperAppearance.surface,
                            color: palette.text,
                            resize: "vertical",
                          }}
                        />
                      </label>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          type="button"
                          onClick={goToPrevious}
                          style={{
                            padding: "12px 14px",
                            background: palette.pillBg,
                            color: palette.text,
                            border: `1px solid ${palette.border}`,
                            borderRadius: "12px",
                            cursor: "pointer",
                          }}
                        >
                          ← Back
                        </button>
                        <button
                          type="button"
                          onClick={goToNext}
                          style={{
                            padding: "12px 16px",
                            background: palette.stepperAppearance.primary,
                            color: "#fff",
                            border: "none",
                            borderRadius: "12px",
                            cursor: "pointer",
                            boxShadow: `0 12px 30px ${palette.stepperAppearance.primary}33`,
                          }}
                        >
                          Review →
                        </button>
                      </div>
                    </div>
                  )}
                </Stepper.Panel>
              )}

              <Stepper.Panel>
                {({ goToPrevious }) => (
                  <div style={{ display: "grid", gap: "10px" }}>
                    <h2 style={{ margin: 0, color: palette.text }}>Review</h2>
                    <div
                      style={{
                        display: "grid",
                        gap: "8px",
                        background:
                          theme === "dark"
                            ? "rgba(255,255,255,0.02)"
                            : "#f8fafc",
                        border: `1px solid ${palette.border}`,
                        borderRadius: "12px",
                        padding: "12px",
                      }}
                    >
                      <div>
                        <strong>Project:</strong>{" "}
                        {projectName || "Not provided"}
                      </div>
                      <div>
                        <strong>Category:</strong> {category}
                      </div>
                      <div>
                        <strong>Slack:</strong> {slackChannel}
                      </div>
                      <div>
                        <strong>Team size:</strong> {teamSize}
                      </div>
                      <div>
                        <strong>Methodology:</strong> {methodology}
                      </div>
                      <div>
                        <strong>Skills:</strong>{" "}
                        {skills.length ? skills.join(", ") : "None"}
                      </div>
                      {includeCompliance && (
                        <>
                          <div>
                            <strong>Risk level:</strong> {riskLevel}
                          </div>
                          <div>
                            <strong>Compliance owner:</strong>{" "}
                            {complianceOwner || "Not set"}
                          </div>
                        </>
                      )}
                      <div>
                        <strong>Notes:</strong>{" "}
                        {notes || "No additional notes yet."}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        type="button"
                        onClick={goToPrevious}
                        style={{
                          padding: "12px 14px",
                          background: palette.pillBg,
                          color: palette.text,
                          border: `1px solid ${palette.border}`,
                          borderRadius: "12px",
                          cursor: "pointer",
                        }}
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        style={{
                          padding: "12px 16px",
                          background: palette.stepperAppearance.success,
                          color: theme === "dark" ? "#0b1120" : "#0f172a",
                          border: "none",
                          borderRadius: "12px",
                          cursor: "pointer",
                          boxShadow: `0 12px 30px ${palette.stepperAppearance.success}33`,
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </Stepper.Panel>
            </Stepper.Panels>
          </Stepper>
        </div>
      </div>
    </main>
  );
};

export default App;
