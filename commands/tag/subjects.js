import _ from 'lodash';
import { SUBJECTS } from './constants.js';
import { getSegments } from './utils.js';

export const getSegmentSubjectData = (segment) => {
  const subjectMap = getSubjectMap();
  const subjectWords = getSubjectWords();
  const subjectData = {};

  for (const word of subjectWords) {
    if (segment.includes(word)) {
      const data = subjectMap[word];

      if (
        subjectData[data.subject] &&
        subjectData[data.subject][data.category]
      ) {
        subjectData[data.subject][data.category].push(word);
      } else {
        subjectData[data.subject]
          ? (subjectData[data.subject][data.category] = [word])
          : (subjectData[data.subject] = { [data.category]: [word] });
      }
    }
  }
  // retain only unique values
  for (const subject in subjectData) {
    for (const category in subjectData[subject]) {
      subjectData[subject][category] = _.uniq(subjectData[subject][category]);
    }
  }

  return subjectData;
};

export const getSubjectMap = () => {
  const subjectMap = {};

  for (const subject of SUBJECTS) {
    subject.categories.forEach((category) => {
      category.elements.forEach((element) => {
        subjectMap[element] = {
          subject: subject.subject,
          category: category.category,
        };
      });
    });
  }

  return subjectMap;
};

export const getCategory = (category) => {
  let categoryMap = {};

  for (const subcategory of category.subcategories) {
    if (isFinalCategory(subcategory)) {
      for (const element of subcategory.elements) {
        if (categoryMap[element]) {
          categoryMap[element].push(subcategory.category);
        } else {
          categoryMap[element] = [subcategory.subcategory];
        }
      }
      const innerCategory = getCategory(subcategory);

      if (categoryMap[subcategory.category]) {
        categoryMap[subcategory.category] = [
          ...categoryMap[subcategory.category],
          innerCategory,
        ];
      } else {
        categoryMap[subcategory.category] = [innerCategory];
      }
    } else {
      const innerCategory = getCategory(subcategory);
    }
  }
  return categoryMap;
};

export const isFinalCategory = (data) => data.elements !== undefined;

export const getSubjectWords = () => Object.keys(getSubjectMap());
