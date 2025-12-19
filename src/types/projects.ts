export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
}

export interface ProjectState {
  projects: Project[];
}

export type ProjectAction =
  | { type: "ADD_TASK"; payload: { projectId: string; task: Task } }
  | { type: "DELETE_TASK"; payload: { projectId: string; taskId: string } }
  | {
      type: "MOVE_TASK";
      payload: { projectId: string; taskId: string; status: TaskStatus };
    }
  | { type: "LOAD_STATE"; payload: ProjectState };
