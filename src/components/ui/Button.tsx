import React from "react";
import { useTheme } from "../../context/ThemeContext";

type ButtonVariant = "primary" | "ghost" | "subtle";

type ButtonProps<T extends React.ElementType = "button"> = {
  children: React.ReactNode;
  as?: T;
  variant?: ButtonVariant;
  style?: React.CSSProperties;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "style">;

const Button = <T extends React.ElementType = "button">({
  children,
  as,
  variant = "primary",
  style = {},
  ...props
}: ButtonProps<T>) => {
  const Component = as ?? ("button" as T);
  const { theme, tokens } = useTheme();
  const isDisabled =
    "disabled" in props && typeof props.disabled === "boolean"
      ? props.disabled
      : false;

  const palette: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      background: `linear-gradient(135deg, ${tokens.accentPrimary}, ${tokens.accentSecondary})`,
      color: "#f8fafc",
      border: `1px solid ${
        theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.1)"
      }`,
    },
    ghost: {
      background: "transparent",
      color: tokens.navText,
      border: `1px solid ${
        theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.14)"
      }`,
    },
    subtle: {
      background: tokens.surfaceAlt,
      color: tokens.textPrimary,
      border: `1px solid ${tokens.softBorder}`,
    },
  };

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 14px",
    borderRadius: "12px",
    fontWeight: 600,
    letterSpacing: "0.01em",
    cursor: "pointer",
    transition:
      "transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease",
    boxShadow:
      theme === "dark"
        ? "0 10px 30px rgba(0,0,0,0.25)"
        : "0 12px 30px rgba(15,23,42,0.1)",
    opacity: isDisabled ? 0.6 : 1,
    ...palette[variant],
    ...style,
  };

  const handleMouseOver = (event: React.MouseEvent<HTMLElement>) => {
    if (isDisabled) return;
    event.currentTarget.style.transform = "translateY(-1px)";
    event.currentTarget.style.boxShadow =
      theme === "dark"
        ? "0 12px 36px rgba(0,0,0,0.32)"
        : "0 14px 32px rgba(15,23,42,0.18)";
  };

  const handleMouseOut = (event: React.MouseEvent<HTMLElement>) => {
    if (isDisabled) return;
    event.currentTarget.style.transform = "none";
    event.currentTarget.style.boxShadow =
      theme === "dark"
        ? "0 10px 30px rgba(0,0,0,0.25)"
        : "0 12px 30px rgba(15,23,42,0.1)";
  };

  return (
    <Component
      {...(props as React.ComponentPropsWithoutRef<T>)}
      style={baseStyle}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {children}
    </Component>
  );
};

export default Button;
