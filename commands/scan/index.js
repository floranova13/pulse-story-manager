import fs from 'fs';
import path from 'path';

const readChapter = (chapterNumber) => {
  const chapterPath = `G:/My Drive/stories/blightbane/chapters/current/chapter-${chapterNumber}.md`;
  readFileText(chapterPath);
};

const readCurrentChapters = () => {
  const chapters = [];
  const currentChaptersPath = process.env.CHAPTERS_CURRENT_PATH;

  fs.readdirSync(currentChaptersPath).forEach((file) => {
    if (
      ['.md', 'txt'].includes(path.extname(file)) &&
      file.includes('chapter-')
    ) {
      const chapterPath = path.join(currentChaptersPath, file);

      if (
        parseInt(file.split('-')[1].split('.')[0]) < 46 &&
        readFileText(chapterPath).split('---').length > 1
      ) {
        console.log(parseInt(file.split('-')[1].split('.')[0]));
        const chapterInfo = {
          name: file,
          path: chapterPath,
          title: readFileText(chapterPath).split('\r')[0].split(':')[1],
          contents: readFileText(chapterPath),
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
