import React from "react";

const tones = {
  blue: {
    background: "rgba(59,130,246,0.12)",
    color: "#bfdbfe",
    border: "1px solid rgba(59,130,246,0.35)",
  },
  emerald: {
    background: "rgba(16,185,129,0.12)",
    color: "#bbf7d0",
    border: "1px solid rgba(16,185,129,0.3)",
  },
  amber: {
    background: "rgba(245,158,11,0.12)",
    color: "#fde68a",
    border: "1px solid rgba(245,158,11,0.35)",
  },
};

const Badge = ({ icon, label, tone = "blue" }) => {
  const palette = tones[tone] ?? tones.blue;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 10px",
        borderRadius: "999px",
        fontSize: "13px",
        letterSpacing: "0.02em",
        ...palette,
      }}
    >
      {icon}
      {label}
    </span>
  );
};

export default Badge;
