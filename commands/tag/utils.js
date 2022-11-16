/* eslint-disable indent */
import { getWordCount } from '../../utils/index.js';

export const getSegments = (content) => content.split('---').slice(1);

export const getSegmentData = (segment) => {
  const subject = segment
    .match(/\[Subject:(.+)\]/)[1]
    .trim();
  const location = segment
    .match(/\[Location:(.+)\]/)[1]
    .trim();
  const observer = /\[Observer:(.+)\]/.test(segment)
    ? segment
        .match(/\[Observer:(.+)\]/)[1]
        .trim()
    : '???';
  const segmentData = {
    subject,
    location,
    observer,
    words: getWordCount(segment),
  };
  return segmentData;
};
