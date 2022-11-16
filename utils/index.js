/* eslint-disable quotes */
import path from 'path';

export const getFileName = (filePath) => {
  return path.basename(filePath);
};

export const getFileNameBase = (filePath) => {
  return path.basename(filePath).split('.')[0];
};

export const replaceStyledQuotes = (text) => {
  return text.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
};

export const trimText = (text) =>
  text
    .split('\r\n')
    .map((line) => line.trim())
    .join('\r\n');

export const fixText = (text) => trimText(replaceStyledQuotes(text));

export const getWordCount = (text) =>
  text.split(' ').filter((word) => word.replace(/\s/), '').length;
