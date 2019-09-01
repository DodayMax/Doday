export const loadTool = async (path: string) => {
  const loadedTool = await import(`@tools/${path}`);
  return loadedTool;
};
