import React, { createContext, useEffect, useMemo, useReducer } from "react";
import type {
  ProjectAction,
  ProjectState,
  TaskStatus,
} from "../types/projects";

interface ProjectContextValue {
  state: ProjectState;
  dispatch: React.Dispatch<ProjectAction>;
}

const ProjectContext = createContext<ProjectContextValue | null>(null);

const defaultState: ProjectState = {
  projects: [
    {
      id: "p1",
      name: "Frontend",
      description:
        "Build explainable dashboards that keep instructors aligned with each learner twin.",
      tasks: [
        {
          id: "t1",
          title: "Prototype explainable insights",
          description:
            "Draft UI to highlight how the AI interprets student analytics.",
          status: "todo",
        },
        {
          id: "t2",
          title: "Map outcomes to skills",
          description:
            "Link outcomes to digital twin skill nodes for recommendations.",
          status: "in-progress",
        },
        {
          id: "t3",
          title: "Review accessibility",
          description:
            "Ensure dashboard is usable with keyboard and screen readers.",
          status: "done",
        },
      ],
    },
    {
      id: "p2",
      name: "Data pipelines",
      description:
        "Harden the ingestion, labeling, and explainability layers powering digital twins.",
      tasks: [
        {
          id: "t4",
          title: "Stitch LMS + SIS signals",
          description:
            "Normalize grade, attendance, and engagement feeds for attribution.",
          status: "in-progress",
        },
        {
          id: "t5",
          title: "Publish feature catalog",
          description:
            "Document explainable features with lineage and QA expectations.",
          status: "todo",
        },
        {
          id: "t6",
          title: "Twin drift alarms",
          description:
            "Alert analysts when models deviate from expected learner behaviors.",
          status: "todo",
        },
      ],
    },
  ],
};

const LOCAL_STORAGE_KEY = "learning-platform-projects";

const reducer = (state: ProjectState, action: ProjectAction): ProjectState => {
  switch (action.type) {
    case "ADD_TASK": {
      const { projectId, task } = action.payload;
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === projectId
            ? { ...project, tasks: [...project.tasks, task] }
            : project
        ),
      };
    }
    case "DELETE_TASK": {
      const { projectId, taskId } = action.payload;
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === projectId
            ? {
                ...project,
                tasks: project.tasks.filter((task) => task.id !== taskId),
              }
            : project
        ),
      };
    }
    case "MOVE_TASK": {
      const { projectId, taskId, status } = action.payload;
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === projectId
            ? {
                ...project,
                tasks: project.tasks.map((task) =>
                  task.id === taskId ? { ...task, status } : task
                ),
              }
            : project
        ),
      };
    }
    case "LOAD_STATE": {
      return action.payload;
    }
    default:
      return state;
  }
};

const readPersistedState = (): ProjectState => {
  if (typeof window === "undefined") {
    return defaultState;
  }

  try {
    const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as ProjectState;
      const hasStatuses = parsed.projects.every((project) =>
        project.tasks.every((task) =>
          ["todo", "in-progress", "done"].includes(task.status as TaskStatus)
        )
      );
      return hasStatuses ? parsed : defaultState;
    }
    return defaultState;
  } catch (error) {
    console.error("Failed to parse stored state", error);
    return defaultState;
  }
};

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  useEffect(() => {
    const persisted = readPersistedState();
    dispatch({ type: "LOAD_STATE", payload: persisted });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export default ProjectContext;
