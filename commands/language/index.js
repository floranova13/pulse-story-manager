import scan from '../scan/index.js';
import natural from 'natural';
import fs from 'fs';
import path from 'path';
import nspell from 'nspell';

export const getWords = (content) => {
  const tokenizer = new natural.WordTokenizer();
  const words = tokenizer.tokenize(content);
  return words;
};

export const analyzeWordFrequency = (content) => {
  const TfIdf = natural.TfIdf;
  const tfidf = new TfIdf();
  const words = getWords(content);
  const wordFrequency = {};

  tfidf.addDocument(words);
  tfidf.listTerms(0).forEach((item) => {
    console.log(item.term + ': ' + item.tfidf);
  });

  return wordFrequency;
};

export const analyzeFullWordFrequency = () => {
  const TfIdf = natural.TfIdf;
  const tfidf = new TfIdf();
  const wordFrequency = [];

  scan.readCurrentChapters().forEach((chapter) => {
    tfidf.addDocument(chapter.contents);
  });

  tfidf.listTerms(0).forEach((item) => {
    wordFrequency.push({ word: item.term, frequency: item.tfidf });
  });

  return wordFrequency;
};

export const recordWordFrequency = () => {
  const frequency = analyzeFullWordFrequency();
  fs.writeFileSync(
    path.join(process.cwd(), '/resources/wordFrequency.json'),
    JSON.stringify(frequency)
  );
};

export const getCurrentChaptersWords = () => {
  const chapters = scan.readCurrentChapters();
  let words = [];
  chapters.forEach((chapter) => {
    words = [...words, ...getWords(chapter.contents)];
  });
  return words;
};

export const getIrregularWords = () => {
  const words = getCurrentChaptersWords().filter((word) => word);
  const irregulars = new Set();
  const dic = fs.readFileSync(path.join(process.cwd(), '/resources/index.dic'));
  const aff = fs.readFileSync(path.join(process.cwd(), '/resources/index.aff'));
  const spell = nspell(aff, dic);

  for (let i = 0; i < words.length; i++) {
    const word = words[i].toLowerCase();

    if (isNaN(Number(word)) && !spell.correct(word)) {
      irregulars.add(word);
    }
  }

  fs.writeFileSync(
    path.join(process.cwd(), '/resources/irregularWords.json'),
    JSON.stringify(Array.from(irregulars))
  );
};
