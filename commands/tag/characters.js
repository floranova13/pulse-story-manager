import _ from 'lodash';
import { CHARACTER_NAMES } from './constants.js';

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

  for (const character of characters) {
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

  for (const character of characters) {
    if (segment.includes(character)) {
      charactersInSegment.push(characterMap[character]);
    }
  }

  return _.uniq(charactersInSegment);
};
