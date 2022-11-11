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

      chapters.push({
        name: file,
        path: chapterPath,
        contents: readFileText(chapterPath),
      });
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
