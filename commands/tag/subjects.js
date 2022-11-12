import _ from 'lodash';
import { SUBJECTS } from './constants.js';
import { getSegments } from './utils.js';

export const getSegmentSubjectData = (segment) => {
  const subjectMap = getSubjectMap();
  const subjectData = {};

  return subjectData;
};

export const getSubjectMap = () => {
  const subjectMap = {};

  for (const subject in SUBJECTS) {
    subject.categories.forEach((category) => {
      category.elements.forEach((element) => {
        subjectMap[element] = { subject: subject.subject, category: category.category };
      });
    });
  }

  return subjectMap;
};

