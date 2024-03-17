export const setAccessKey = (accessKey: string) => {
  localStorage.setItem('key', accessKey);
};

export const getAccessKey = () => {
  return localStorage.getItem('key') || '';
};

export const setRefreshKey = (refreshKey: string) => {
  localStorage.setItem('refresh-key', refreshKey);
};

export const getRefreshKey = () => {
  return localStorage.getItem('refresh-key') || '';
};
