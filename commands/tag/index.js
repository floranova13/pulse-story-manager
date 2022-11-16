import currentChapters from '../../resources/currentChapters.json' assert { type: 'json' };
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import commands from '../index.js';
import { getFileName, getFileNameBase } from '../../utils/index.js';
import { getSegments, getSegmentData } from './utils.js';
import { getSegmentSubjectData } from './subjects.js';
import { getCharactersInSegment } from './characters.js';

export const getChapterTags = (chapterName) => {
  const chapterNameBase = getFileNameBase(chapterName); // strip extension

  if (currentChapters[chapterNameBase]) {
    return { ...currentChapters[chapterNameBase] };
  }
};

export const getAllCurrentChapterData = () => {
  const chapterContents = commands.scan.readCurrentChapters();
  const chaptersData = {};

  chapterContents.forEach((chapterContent) => {
    chaptersData[chapterContent.name] = getCurrentChapterData(chapterContent);
  });

  return chaptersData;
};

export const setAllChapterData = () => {
  const newData = getAllCurrentChapterData();
  fs.writeFileSync(
    path.join(process.cwd(), '/resources/currentChapters.json'),
    JSON.stringify(newData)
  );
};

export const getCurrentChapterData = (chapterInfo) => {
  const { title, words, contents } = chapterInfo;
  const chapterSegments = getSegments(contents);
  const name = getFileName(chapterInfo.name);
  const chapterData = {
    name,
    title,
    words,
    segments: chapterSegments.map((segment) => getCurrentSegmentData(segment)),
  };
  console.log(title);

  chapterData.characters = _.uniq(
    _.flatten(chapterData.segments.map((segment) => segment.characters))
  );

  return chapterData;
};

export const getCurrentSegmentData = (segment) => {
  const segmentData = getSegmentData(segment);
  const characters = getCharactersInSegment(segment);
  const subjects = getSegmentSubjectData(segment);

  return {
    ...segmentData,
    characters,
    subjects,
  };
};
