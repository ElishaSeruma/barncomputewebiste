// Remembers which OS tab (macOS or Windows) a reader picked, and keeps every tab group on the page in sync.
const KEY = "barn-docs-tab";
const listeners = new Set<() => void>();

export function subscribeTab(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

export function getTabSnapshot(): string | null {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function getTabServerSnapshot(): string | null {
  return null;
}

export function setTabPreference(label: string) {
  try {
    window.localStorage.setItem(KEY, label);
  } catch {
    // Storage can be blocked; the in-memory listeners below still update this page.
  }
  listeners.forEach((l) => l());
}
