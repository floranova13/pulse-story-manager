import fs from 'fs';
import path from 'path';
import { getWordCount } from '../../utils/index.js';

const readChapter = (chapterNumber) => {
  const chapterPath = `G:/My Drive/stories/blightbane/chapters/current/chapter-${chapterNumber}.md`;
  return readFileText(chapterPath);
};

const readCurrentChapters = () => {
  const chapters = [];
  const currentChaptersPath = process.env.CHAPTERS_CURRENT_PATH;
  const END_CHAPTER = 54;

  fs.readdirSync(currentChaptersPath).forEach((file) => {
    if (
      ['.md', 'txt'].includes(path.extname(file)) &&
      file.includes('chapter-')
    ) {
      const chapterPath = path.join(currentChaptersPath, file);

      if (
        parseInt(file.split('-')[1].split('.')[0]) <= END_CHAPTER &&
        readFileText(chapterPath).split('---').length > 1
      ) {
        const contents = readFileText(chapterPath);
        const chapterInfo = {
          name: file,
          path: chapterPath,
          title: contents.split('\r')[0].split(':')[1],
          words: parseInt(getWordCount(contents)) || 0,
          contents,
        };
        chapters.push(chapterInfo);
      }
    }
  });

  return chapters;
};

const readFileText = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default { readFileText, readChapter, readCurrentChapters };
