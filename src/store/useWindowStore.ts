import { create } from 'zustand';

interface WindowState {
  id: number;
  isOpen: boolean;
  zIndex: number;
  title: string;
}

export type WindowStore = {
  idx: number;
  windows: WindowState[];
  isMobile: boolean;
  title: string;
  
  setInitialWindows: (ids: number[]) => void;
  setIsMobile: (isMobile: boolean) => void;
  openWindow: (num: number) => void;
  closeWindow: (num: number) => void;
  bringToFront: (num: number) => void;
}

export const useWindowStore = create<WindowStore>((set) => ({
  idx: 100,
  windows: [],
  isMobile: typeof window !== 'undefined' ? window.innerWidth <= 768 : false,
  title: "",

  setInitialWindows: (ids) => set((state) => ({
    windows: ids.map(id => ({ id, isOpen: true, zIndex: 100, title: "", }))
  })),

  setIsMobile: (isMobile) => set((state) => {
    if (isMobile) {
      // 모바일이면 모든 창을 여는 기존 로직 유지
      return { isMobile, windows: state.windows.map(w => ({ ...w, isOpen: true })) };
    }
    return { isMobile };
  }),

  openWindow: (num) => set((state) => ({
    windows: state.windows.map((w) => (w.id === num ? { ...w, isOpen: true } : w))
  })),

  closeWindow: (num) => set((state) => ({
    windows: state.windows.map((w) => (w.id === num ? { ...w, isOpen: false } : w))
  })),

  bringToFront: (num) => set((state) => {
    const nextIdx = state.idx + 1;
    return {
      idx: nextIdx,
      windows: state.windows.map((w) => (w.id === num ? { ...w, zIndex: nextIdx } : w))
    };
  }),
}));