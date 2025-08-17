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
  setFolders: (folders: Folder[]) => void;
  updateFolder: (folder: Folder) => void;
  removeFolder: (_id: string) => void;
}

export const useFolderStore = create<FolderState>((set) => ({
  folders: [],
  setFolders: (folders) => set({ folders }),
  updateFolder: (folder) =>
    set((state) => ({
      folders: state.folders.map((f) => (f._id === folder._id ? folder : f)),
    })),
  removeFolder: (_id) =>
    set((state) => ({
      folders: state.folders.filter((f) => f._id !== _id),
    })),
}));
