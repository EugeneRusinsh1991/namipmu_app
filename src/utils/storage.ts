let asyncStorage: {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
} | null = null;

try {
  const module = require('@react-native-async-storage/async-storage');
  asyncStorage = module?.default ?? module;
} catch (e) {
  asyncStorage = null;
}

async function getItem(key: string): Promise<string | null> {
  if (!asyncStorage) return null;
  try {
    return await asyncStorage.getItem(key);
  } catch {
    return null;
  }
}

async function setItem(key: string, value: string): Promise<void> {
  if (!asyncStorage) return;
  try {
    await asyncStorage.setItem(key, value);
  } catch {
    // ignore storage failures
  }
}

export const storage = {
  getItem,
  setItem,
};
