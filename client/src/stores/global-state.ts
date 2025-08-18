import { create } from "zustand";

export type Folder = {
  _id: string;
  name: string;
  userId: string;
  bookmarksCount: number;
  createdAt: Date;
  updatedAt: Date;
};

interface FolderState {
  folders: Folder[];
  activeFolder: Folder | null;
  setActiveFolder: (folder: Folder) => void;
  setFolders: (folders: Folder[]) => void;
  updateFolder: (folder: Folder) => void;
  removeFolder: (_id: string) => void;
  addFolder: (folder: Folder) => void;
}

export const useFolderStore = create<FolderState>((set) => ({
  folders: [],
  activeFolder: null,
  setFolders: (folders) => set({ folders }),
  setActiveFolder: (folder) => set({ activeFolder: folder }),
  updateFolder: (folder) =>
    set((state) => ({
      folders: state.folders.map((f) => (f._id === folder._id ? folder : f)),
    })),
  removeFolder: (_id) =>
    set((state) => ({
      folders: state.folders.filter((f) => f._id !== _id),
    })),
  addFolder: (folder) =>
    set((state) => ({
      folders: [...state.folders, folder],
    })),
}));
