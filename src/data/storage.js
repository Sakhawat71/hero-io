const LS_KEY = 'hero_io_installed_apps';

export const getInstalledApps = () => {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  } catch {
    return [];
  }
};

export const isAppInstalled = (id) => {
  return getInstalledApps().some(app => app.id === id);
};

export const installApp = (app) => {
  const current = getInstalledApps();
  if (!current.find(a => a.id === app.id)) {
    localStorage.setItem(LS_KEY, JSON.stringify([...current, app]));
  }
};

export const uninstallApp = (id) => {
  const current = getInstalledApps();
  localStorage.setItem(LS_KEY, JSON.stringify(current.filter(a => a.id !== id)));
};
