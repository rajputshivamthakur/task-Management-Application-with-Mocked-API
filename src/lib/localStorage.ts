// LocalStorage utilities for Redux persistence

export const loadState = <T>(key: string): T | undefined => {
  try {
    if (typeof window === 'undefined') return undefined;
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return undefined;
  }
};

export const saveState = <T>(key: string, state: T): void => {
  try {
    if (typeof window === 'undefined') return;
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

export const removeState = (key: string): void => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Error removing state from localStorage:', err);
  }
};
