import { useEffect } from 'react';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  useEffect(() => {
    console.log('useFrameworkReady: window.frameworkReady exists?', !!window.frameworkReady);
    window.frameworkReady?.();
  }, []);
}
