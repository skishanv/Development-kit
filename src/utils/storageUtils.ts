// Save data to localStorage
export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage: ${error}`);
  }
}

// Get data from localStorage
export function getFromStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading from localStorage: ${error}`);
    return null;
  }
}

// Clear specific data from localStorage
export function clearFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error clearing localStorage: ${error}`);
  }
}

// Check if storage is available
export function isStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
}

// Get storage usage info
export function getStorageInfo(): { used: number; total: number } {
  let used = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      used += localStorage.getItem(key)?.length || 0;
    }
  }
  
  // Convert to KB
  used = Math.round(used / 1024);
  const total = 5120; // 5MB limit in KB

  return { used, total };
}