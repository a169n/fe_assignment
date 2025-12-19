import React from "react";

const Button = ({ children, as: Component = "button", variant = "primary", style = {}, ...props }) => {
  const palette = {
    primary: {
      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      color: "#f8fafc",
      border: "1px solid rgba(255,255,255,0.08)",
    },
    ghost: {
      background: "transparent",
      color: "#cbd5f5",
      border: "1px solid rgba(255,255,255,0.12)",
    },
    subtle: {
      background: "#111827",
      color: "#e5e7eb",
      border: "1px solid rgba(255,255,255,0.06)",
    },
  };

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 14px",
    borderRadius: "12px",
    fontWeight: 600,
    letterSpacing: "0.01em",
    cursor: "pointer",
    transition: "transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    ...palette[variant],
    ...style,
  };

  return (
    <Component
      {...props}
      style={baseStyle}
      onMouseOver={(event) => {
        event.currentTarget.style.transform = "translateY(-1px)";
        event.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.32)";
      }}
      onMouseOut={(event) => {
        event.currentTarget.style.transform = "none";
        event.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.25)";
      }}
    >
      {children}
    </Component>
  );
};

export default Button;
