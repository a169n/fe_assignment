import React from "react";
import { useTheme } from "../../context/ThemeContext";

type BadgeTone = "blue" | "emerald" | "amber";

type BadgeProps = {
  icon?: React.ReactNode;
  label: React.ReactNode;
  tone?: BadgeTone;
};

const Badge = ({ icon, label, tone = "blue" }: BadgeProps) => {
  const { theme, badgeTones } = useTheme();
  const palette = badgeTones[tone]?.[theme] ?? badgeTones.blue[theme];
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
