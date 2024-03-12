export const setAccessKey = (accessKey: string) => {
  localStorage.setItem('key', accessKey);
};

export const getAccessKey = () => {
  return localStorage.getItem('key') || '';
};
