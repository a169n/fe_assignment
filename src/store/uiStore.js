import { create } from "zustand";

const useUiStore = create((set) => ({
  selectedProjectId: "p1",
  filter: "",
  setFilter: (filter) => set({ filter }),
  setProject: (selectedProjectId) => set({ selectedProjectId }),
}));

export default useUiStore;
