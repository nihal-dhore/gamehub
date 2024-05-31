import { create } from "zustand";

export enum ChatVariant {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY",
}

interface ChatSidebarStore {
  chatCollapsed: boolean;
  variant: ChatVariant;
  onExpand: () => void;
  onCollapse: () => void;
  onChangeVariant: (variant: ChatVariant) => void;
}

export const useChatSidebar = create<ChatSidebarStore>((set) => ({
  chatCollapsed: false,
  variant: ChatVariant.CHAT,
  onExpand: () => set(() => ({ chatCollapsed: false })),
  onCollapse: () => set(() => ({ chatCollapsed: true })),
  onChangeVariant: (variant: ChatVariant) => set(() => ({ variant }))
}));