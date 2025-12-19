import React from "react";
import { useTheme } from "../../context/ThemeContext";

type PanelProps = React.HTMLAttributes<HTMLElement> & {
  style?: React.CSSProperties;
};

const Panel = ({ children, style = {}, ...props }: PanelProps) => {
  const { tokens } = useTheme();

  const baseStyle: React.CSSProperties = {
    background: tokens.surface,
    borderRadius: "16px",
    border: `1px solid ${tokens.border}`,
    padding: "18px",
    boxShadow: tokens.shadow,
    backdropFilter: "blur(14px)",
    ...style,
  };

  return (
    <section style={baseStyle} {...props}>
      {children}
    </section>
  );
};

export default Panel;
