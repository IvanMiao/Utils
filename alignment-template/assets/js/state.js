const STORAGE_KEY = "alignment-template-data";

function cloneData(data) {
  return JSON.parse(JSON.stringify(data));
}

function setPathValue(source, path, value) {
  const keys = path.split(".");
  const lastKey = keys.pop();
  const parent = keys.reduce((item, key) => item[key], source);
  parent[lastKey] = value;
}

function loadStoredData(defaultData) {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? mergeDefaults(cloneData(defaultData), JSON.parse(stored)) : cloneData(defaultData);
}

function mergeDefaults(defaultValue, storedValue) {
  if (Array.isArray(defaultValue)) return Array.isArray(storedValue) ? storedValue : defaultValue;
  if (!defaultValue || typeof defaultValue !== "object") return storedValue ?? defaultValue;

  return Object.keys(defaultValue).reduce((merged, key) => {
    merged[key] = mergeDefaults(defaultValue[key], storedValue?.[key]);
    return merged;
  }, {});
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  setEditorStatus("Sauvegardé dans ce navigateur.");
}

function scheduleAutoSave(data) {
  clearTimeout(scheduleAutoSave.timer);
  scheduleAutoSave.timer = setTimeout(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setEditorStatus("Sauvegarde automatique.");
  }, 500);
}

function exportData(data) {
  const file = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = "alignment-template-data.json";
  link.click();
  URL.revokeObjectURL(link.href);
  setEditorStatus("JSON exporté.");
}
