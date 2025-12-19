import { useCallback, useContext, useMemo } from "react";
import ProjectContext from "../context/ProjectContext";

const statusOrder = ["todo", "in-progress", "done"];

const useProjectManager = (projectId) => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("useProjectManager must be used within a ProjectProvider");
  }

  const { state, dispatch } = context;

  const project = useMemo(
    () => state.projects.find((current) => current.id === projectId),
    [projectId, state.projects]
  );

  const addTask = useCallback(
    ({ title, description }) => {
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
    (taskId) => {
      dispatch({
        type: "DELETE_TASK",
        payload: { projectId, taskId },
      });
    },
    [dispatch, projectId]
  );

  const moveTask = useCallback(
    (taskId, direction) => {
      const task = project?.tasks.find((current) => current.id === taskId);
      if (!task) return;
      const currentIndex = statusOrder.indexOf(task.status);
      const nextIndex = direction === "forward" ? currentIndex + 1 : currentIndex - 1;
      const nextStatus = statusOrder[nextIndex];
      if (!nextStatus) return;
      dispatch({
        type: "MOVE_TASK",
        payload: { projectId, taskId, status: nextStatus },
      });
    },
    [dispatch, project?.tasks, projectId]
  );

  const tasksByStatus = useMemo(() => {
    const mapping = {
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
