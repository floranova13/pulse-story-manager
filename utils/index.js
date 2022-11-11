import path from 'path';

export const getFileName = (filePath) => {
  return path.basename(filePath);
};

export const getFileNameBase = (filePath) => {
  return path.basename(filePath).split('.')[0];
};