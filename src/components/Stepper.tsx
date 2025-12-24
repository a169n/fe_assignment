import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useId,
} from "react";

type StepperContextValue = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  stepCount: number;
  setStepCount: (count: number) => void;
  idBase: string;
  orientation: "horizontal" | "vertical";
  appearance: StepperAppearance;
};

const StepperContext = createContext<StepperContextValue | null>(null);

const useStepperContext = () => {
  const ctx = useContext(StepperContext);
  if (!ctx) {
    throw new Error("Stepper components must be used inside <Stepper>");
  }
  return ctx;
};

type StepperAppearance = {
  primary: string;
  primarySoft: string;
  primaryMuted: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  text: string;
  textMuted: string;
  success: string;
  warning: string;
  track: string;
};

const defaultAppearance: StepperAppearance = {
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
};

type StepperProps = {
  children: React.ReactNode;
  initialStep?: number;
  activeStep?: number;
  onStepChange?: (index: number) => void;
  orientation?: "horizontal" | "vertical";
  appearance?: Partial<StepperAppearance>;
};

const StepperRoot = ({
  children,
  initialStep = 0,
  activeStep,
  onStepChange,
  orientation = "horizontal",
  appearance,
}: StepperProps) => {
  const [internalIndex, setInternalIndex] = useState(initialStep);
  const [stepCount, setStepCount] = useState(0);
  const idBase = useId();

  const currentIndex = activeStep ?? internalIndex;
  const mergedAppearance = useMemo(
    () => ({ ...defaultAppearance, ...appearance }),
    [appearance],
  );

  const setActiveIndex = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, stepCount - 1));
      if (activeStep === undefined) {
        setInternalIndex(clampedIndex);
      }
      onStepChange?.(clampedIndex);
    },
    [activeStep, onStepChange, stepCount],
  );

  const value = useMemo(
    () => ({
      activeIndex: currentIndex,
      setActiveIndex,
      stepCount,
      setStepCount,
      idBase,
      orientation,
      appearance: mergedAppearance,
    }),
    [
      currentIndex,
      idBase,
      mergedAppearance,
      orientation,
      setActiveIndex,
      stepCount,
    ],
  );

  return (
    <StepperContext.Provider value={value}>
      <div
        style={{
          display: "grid",
          gap: "16px",
        }}
      >
        {children}
      </div>
    </StepperContext.Provider>
  );
};

type StepsProps = {
  children: React.ReactNode;
};

const Steps = ({ children }: StepsProps) => {
  const { setStepCount, orientation } = useStepperContext();
  const items = React.Children.toArray(children).filter(React.isValidElement);

  useEffect(() => {
    setStepCount(items.length);
    return () => setStepCount(0);
  }, [items.length, setStepCount]);

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      style={{
        display: orientation === "horizontal" ? "flex" : "grid",
        gap: "12px",
        alignItems: "center",
      }}
    >
      {items.map((child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { index })
          : child,
      )}
    </div>
  );
};

type StepRenderState = {
  index: number;
  isActive: boolean;
  isComplete: boolean;
  goToStep: (index: number) => void;
};

type StepProps = {
  label?: string;
  children?: React.ReactNode | ((state: StepRenderState) => React.ReactNode);
  index?: number;
  disabled?: boolean;
};

const Step = ({ label, children, index = 0, disabled = false }: StepProps) => {
  const {
    activeIndex,
    setActiveIndex,
    stepCount,
    idBase,
    orientation,
    appearance,
  } = useStepperContext();

  const isActive = index === activeIndex;
  const isComplete = index < activeIndex;

  const tabId = `${idBase}-tab-${index}`;
  const panelId = `${idBase}-panel-${index}`;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (stepCount === 0) return;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex(Math.min(activeIndex + 1, stepCount - 1));
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex(Math.max(activeIndex - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(stepCount - 1);
        break;
      case " ":
      case "Enter":
        event.preventDefault();
        setActiveIndex(index);
        break;
      default:
        break;
    }
  };

  const content =
    typeof children === "function"
      ? children({ index, isActive, isComplete, goToStep: setActiveIndex })
      : children ?? label;

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isActive}
      aria-controls={panelId}
      id={tabId}
      aria-disabled={disabled}
      disabled={disabled}
      tabIndex={disabled ? -1 : isActive ? 0 : -1}
      onClick={() => {
        if (disabled) return;
        setActiveIndex(index);
      }}
      onKeyDown={handleKeyDown}
      style={{
        position: "relative",
        border: isActive
          ? `2px solid ${appearance.primary}`
          : `1px solid ${appearance.border}`,
        background: disabled
          ? `linear-gradient(135deg,${appearance.surfaceMuted},${appearance.surface})`
          : isActive
            ? appearance.primarySoft
            : appearance.surface,
        color: appearance.text,
        borderRadius: "14px",
        padding: "10px 14px",
        minWidth: "160px",
        textAlign: "left",
        display: "flex",
        gap: "12px",
        alignItems: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        outline: "none",
        boxShadow: isComplete
          ? `inset 4px 0 0 0 ${appearance.success}, 0 8px 20px rgba(15,23,42,0.08)`
          : "0 8px 20px rgba(15,23,42,0.06)",
        opacity: disabled ? 0.55 : 1,
        transition: "transform 0.15s ease, border-color 0.2s ease",
      }}
      onFocus={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <span
        aria-hidden
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: isComplete
            ? appearance.success
            : isActive
              ? appearance.primary
              : appearance.track,
          color: isActive || isComplete ? "#fff" : appearance.text,
          fontWeight: 700,
        }}
      >
        {index + 1}
      </span>
      <span style={{ fontWeight: 600, lineHeight: 1.2 }}>{content}</span>
      <span
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {isActive ? "Current step" : isComplete ? "Completed" : "Inactive"}
      </span>
    </button>
  );
};

type PanelsProps = {
  children: React.ReactNode;
};

const Panels = ({ children }: PanelsProps) => {
  const { appearance } = useStepperContext();
  const items = React.Children.toArray(children).filter(React.isValidElement);
  return (
    <div
      style={{
        background: `linear-gradient(145deg, ${appearance.surface}, ${appearance.surfaceMuted})`,
        border: `1px solid ${appearance.border}`,
        borderRadius: "16px",
        padding: "18px",
        minHeight: "260px",
        boxShadow:
          "0 18px 36px rgba(15,23,42,0.1), inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
    >
      {items.map((child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { index })
          : child,
      )}
    </div>
  );
};

type PanelRenderState = {
  index: number;
  isActive: boolean;
  goToStep: (index: number) => void;
  goToNext: () => void;
  goToPrevious: () => void;
};

type PanelProps = {
  children:
    | React.ReactNode
    | ((state: PanelRenderState) => React.ReactNode);
  index?: number;
};

const Panel = ({ children, index = 0 }: PanelProps) => {
  const { activeIndex, setActiveIndex, stepCount, idBase } =
    useStepperContext();
  const isActive = index === activeIndex;
  const goToStep = useCallback(
    (next: number) => setActiveIndex(next),
    [setActiveIndex],
  );

  const goToNext = useCallback(() => {
    setActiveIndex(Math.min(activeIndex + 1, stepCount - 1));
  }, [activeIndex, setActiveIndex, stepCount]);

  const goToPrevious = useCallback(() => {
    setActiveIndex(Math.max(activeIndex - 1, 0));
  }, [activeIndex, setActiveIndex]);

  const content =
    typeof children === "function"
      ? children({ index, isActive, goToStep, goToNext, goToPrevious })
      : children;

  return (
    <div
      role="tabpanel"
      id={`${idBase}-panel-${index}`}
      aria-labelledby={`${idBase}-tab-${index}`}
      hidden={!isActive}
      tabIndex={0}
      style={{ outline: "none" }}
    >
      {isActive && content}
    </div>
  );
};

type ProgressProps = {
  showLabel?: boolean;
  formatLabel?: (percent: number) => string;
};

const Progress = ({ showLabel = true, formatLabel }: ProgressProps) => {
  const { activeIndex, stepCount, appearance } = useStepperContext();
  const percent =
    stepCount === 0 ? 0 : Math.round(((activeIndex + 1) / stepCount) * 100);
  const label = formatLabel ? formatLabel(percent) : `${percent}% complete`;

  return (
    <div style={{ display: "grid", gap: "6px" }}>
      {showLabel && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#475569",
            fontWeight: 600,
          }}
        >
          <span>Progress</span>
          <span>{label}</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={label}
        style={{
          background: appearance.track,
          borderRadius: "999px",
          height: "10px",
          overflow: "hidden",
          boxShadow: "inset 0 1px 2px rgba(15,23,42,0.15)",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background:
              `linear-gradient(90deg, ${appearance.primary} 0%, #38bdf8 50%, ${appearance.success} 100%)`,
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
};

export const Stepper = Object.assign(StepperRoot, {
  Steps,
  Step,
  Panels,
  Panel,
  Progress,
});

export default Stepper;
