export const removeFileExtension = (fileName: string) => {
  const stringWithoutExtension = fileName.replace(/\.[^.]+$/, '');
  return stringWithoutExtension;
};
