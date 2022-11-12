/* eslint-disable indent */
export const getSegments = (content) => content.split('---');

export const getSegmentData = (segment) => {
  const subject = segment
    .match(/\[Subject:[A-Za-z0-9]+\]/)[0]
    .split(':')[1]
    .replace(']', '')
    .trim();
  const location = segment
    .match(/\[Location:[A-Za-z0-9]+\]/)[0]
    .split(':')[1]
    .replace(']', '')
    .trim();
  const observer = /\[Observer:[A-Za-z0-9]+\]/.test(segment)
    ? segment
        .match(/\[Observer:[A-Za-z0-9]+\]/)[0]
        .split(':')[1]
        .replace(']', '')
    : '???';
  const segmentData = {
    subject,
    location,
    observer,
  };
  return segmentData;
};
