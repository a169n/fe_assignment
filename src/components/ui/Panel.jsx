import React from "react";

const Panel = ({ children, style = {}, ...props }) => {
  const baseStyle = {
    background: "#0f172a",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.06)",
    padding: "18px",
    boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
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
