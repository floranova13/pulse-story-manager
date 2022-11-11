import currentChapters from '../../resources/currentChapters.js';
import commands from '../index.js';
import { getFileName, getFileNameBase } from '../../utils/index.js';

export const getChapterTags = (chapterName) => {
  const chapterNameBase = getFileNameBase(chapterName); // strip extension

  if (currentChapters[chapterNameBase]) {
    return { ...currentChapters[chapterNameBase] };
  }
};

export const setCurrentChapterData = () => {
  const chapterContentArr = commands.scan.readCurrentChapters();


};

export const setCurrentChapterCharacterData = (chapterContents) => {
  const characterNames = {
    primary: [
      {
        name: 'Caim',
        aliases: ['Caim'],
      },
    ],
    secondary: [
      {
        name: 'Caim',
        aliases: ['Caim'],
      },
    ],
    hexknights: [
      {
        name: 'Caim',
        aliases: ['Caim'],
      },
    ],
  };
    ['Caim', 'Gwen', 'Mille', 'Alice', '']
}