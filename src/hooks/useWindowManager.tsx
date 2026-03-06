import { useState, useEffect, useCallback } from 'react';

interface WindowState {
  id: number;
  isOpen: boolean;
  zIndex: number;
}

export const useWindowManager = (initialWindows: number[]) => {
  const [idx, setIdx] = useState<number>(100);
  const [windows, setWindows] = useState<WindowState[]>(
    initialWindows.map((id) => ({ id, isOpen: true, zIndex: 100 }))
  );
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  // 변수명 유지: openWindow (num 사용)
  const openWindow = useCallback((num: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === num ? { ...w, isOpen: true } : w))
    );
  }, []);

  const closeWindow = useCallback((num: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === num ? { ...w, isOpen: false } : w))
    );
  }, []);

  // 창을 클릭했을 때 z-index를 높이는 로직
  const bringToFront = useCallback((num: number) => {
    if (isMobile) return;
    setIdx((prevIdx) => {
      const nextIdx = prevIdx + 1;
      setWindows((prevWindows) =>
        prevWindows.map((w) => (w.id === num ? { ...w, zIndex: nextIdx } : w))
      );
      return nextIdx;
    });
  }, [isMobile]);

  useEffect(() => {
    const handleResize = () => {
      const mobileCheck = window.innerWidth <= 768;
      setIsMobile(mobileCheck);
      if (mobileCheck) {
        setWindows((prev) => prev.map((w) => ({ ...w, isOpen: true })));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    windows,
    isMobile,
    openWindow,
    closeWindow,
    bringToFront,
  };
};