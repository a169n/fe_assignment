import { useCallback, useContext, useMemo } from "react";
import type { Dispatch } from "react";
import ProjectContext from "../context/ProjectContext";
import type {
  ProjectAction,
  ProjectState,
  Task,
  TaskStatus,
} from "../types/projects";

type MoveDirection = "forward" | "backward";

interface AddTaskPayload {
  title: string;
  description: string;
}

type TasksByStatus = Record<TaskStatus, Task[]>;

const statusOrder: TaskStatus[] = ["todo", "in-progress", "done"];

const useProjectManager = (projectId: string) => {
  const context = useContext(ProjectContext) as {
    state: ProjectState;
    dispatch: Dispatch<ProjectAction>;
  } | null;

  if (!context) {
    throw new Error("useProjectManager must be used within a ProjectProvider");
  }

  const { state, dispatch } = context;

  const project = useMemo(
    () => state.projects.find((current) => current.id === projectId),
    [projectId, state.projects]
  );

  const addTask = useCallback(
    ({ title, description }: AddTaskPayload) => {
      const id = crypto.randomUUID();
      dispatch({
        type: "ADD_TASK",
        payload: {
          projectId,
          task: {
            id,
            title,
            description,
            status: "todo",
          },
        },
      });
    },
    [dispatch, projectId]
  );

  const deleteTask = useCallback(
    (taskId: string) => {
      dispatch({
        type: "DELETE_TASK",
        payload: { projectId, taskId },
      });
    },
    [dispatch, projectId]
  );

  const moveTask = useCallback(
    (taskId: string, direction: MoveDirection) => {
      const task = project?.tasks.find((current) => current.id === taskId);
      if (!task) return;
      const currentIndex = statusOrder.indexOf(task.status);
      const nextIndex =
        direction === "forward" ? currentIndex + 1 : currentIndex - 1;
      const nextStatus = statusOrder[nextIndex];
      if (!nextStatus) return;
      dispatch({
        type: "MOVE_TASK",
        payload: { projectId, taskId, status: nextStatus },
      });
    },
    [dispatch, project?.tasks, projectId]
  );

  const tasksByStatus: TasksByStatus = useMemo(() => {
    const mapping: TasksByStatus = {
      todo: [],
      "in-progress": [],
      done: [],
    };

    project?.tasks.forEach((task) => {
      mapping[task.status].push(task);
    });

    return mapping;
  }, [project?.tasks]);

  return {
    project,
    tasksByStatus,
    addTask,
    deleteTask,
    moveTask,
  };
};

export default useProjectManager;
