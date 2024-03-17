export const setAccessKey = (accessKey: string) => {
  localStorage.setItem('key1', accessKey);
};

export const getAccessKey = () => {
  return localStorage.getItem('key1') || '';
};

export const setRefreshKey = (refreshKey: string) => {
  localStorage.setItem('refresh-key1', refreshKey);
};

export const getRefreshKey = () => {
  return localStorage.getItem('refresh-key1') || '';
};
