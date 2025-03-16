import { useEffect } from 'react';

export const usePassiveScroll = (
  element: HTMLElement | Window | null,
  eventType: string,
  callback: EventListenerOrEventListenerObject,
  options: boolean | AddEventListenerOptions = { passive: true }
) => {
  useEffect(() => {
    if (!element) return;
    
    element.addEventListener(eventType, callback, options);
    return () => {
      element.removeEventListener(eventType, callback);
    };
  }, [element, eventType, callback, options]);
};
