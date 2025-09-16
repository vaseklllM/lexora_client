import { create } from "zustand";

type Folder = {
  id: string;
  name: string;
};

type State = {
  modalDeleteFolder: {
    isOpen: boolean;
    folder?: Folder;
  };

  modalRenameFolder: {
    isOpen: boolean;
    folder?: Folder;
  };
};

type Actions = {
  openModalDeleteFolder: (folder: Folder) => void;
  closeModalDeleteFolder: () => void;
  openModalRenameFolder: (folder: Folder) => void;
  closeModalRenameFolder: () => void;
};

type Store = State & Actions;

export const useFolderStore = create<Store>((set) => ({
  modalDeleteFolder: {
    isOpen: false,
  },
  modalRenameFolder: {
    isOpen: false,
  },
  openModalDeleteFolder: (folder: Folder) => {
    set((store) => ({
      modalDeleteFolder: { ...store.modalDeleteFolder, isOpen: true, folder },
    }));
  },
  closeModalDeleteFolder: () => {
    set((store) => ({
      modalDeleteFolder: {
        ...store.modalDeleteFolder,
        isOpen: false,
      },
    }));
  },
  openModalRenameFolder: (folder: Folder) => {
    set((store) => ({
      modalRenameFolder: { ...store.modalRenameFolder, isOpen: true, folder },
    }));
  },
  closeModalRenameFolder: () => {
    set((store) => ({
      modalRenameFolder: { ...store.modalRenameFolder, isOpen: false },
    }));
  },
}));
