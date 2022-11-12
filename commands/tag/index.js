import currentChapters from '../../resources/currentChapters.js';
import { CHARACTER_NAMES } from './constants.js';
import _ from 'lodash';
import commands from '../index.js';
import { getFileName, getFileNameBase } from '../../utils/index.js';
import { getSegments, getSegmentData } from './utils.js';

export const getChapterTags = (chapterName) => {
  const chapterNameBase = getFileNameBase(chapterName); // strip extension

  if (currentChapters[chapterNameBase]) {
    return { ...currentChapters[chapterNameBase] };
  }
};

export const setCurrentChapterData = () => {
  const chapterContents = commands.scan.readCurrentChapters();
  const chaptersData = {};

  chapterContents.forEach((chapterContent) => {
    chaptersData[chapterContent.name] = getCurrentChapterData(
      chapterContents.contents
    );
  });

  return chaptersData;
};

export const getCurrentChapterData = (chapterData) => {
  const chapterSegments = getSegments(chapterData.contents);

  return chapterSegments.map((segment) => {
    const name = getFileName(chapterData.name);
    const segmentData = getSegmentData(segment);

    return {
      name,
      segments: [...segmentData],
      characters: _.flatten(segmentData.map((data) => data.characters)),
    };
  });
};

export const getCharactersData = () => [
  ...CHARACTER_NAMES.primary,
  ...CHARACTER_NAMES.secondary,
  ...CHARACTER_NAMES.hexknight,
];

export const getCharacterSet = () => {
  const characters = getCharactersData();
  return _.flatten(characters.map((nameData) => nameData.aliases));
};

export const getCharacterMap = () => {
  const characterMap = {};
  const characters = getCharactersData();

  for (const character in characters) {
    character.aliases.forEach((alias) => {
      characterMap[alias] = character.name;
      characterMap[`${alias}'s`] = character.name;
    });
  }

  return characterMap;
};

export const getCharacterNames = () => Array.from(getCharacterSet());

export const getCharactersInSegment = (segment) => {
  const characters = getCharacterNames();
  const characterMap = getCharacterMap();
  const charactersInSegment = [];

  for (const character in characters) {
    if (segment.includes(character)) {
      charactersInSegment.push(characterMap[character]);
    }
  }

  return charactersInSegment;
};
