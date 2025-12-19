import { create } from "zustand";

type UiState = {
  selectedProjectId: string;
  filter: string;
  setFilter: (filter: string) => void;
  setProject: (selectedProjectId: string) => void;
};

const useUiStore = create<UiState>((set) => ({
  selectedProjectId: "p1",
  filter: "",
  setFilter: (filter) => set({ filter }),
  setProject: (selectedProjectId) => set({ selectedProjectId }),
}));

export default useUiStore;
