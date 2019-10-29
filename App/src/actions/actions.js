//action types
export const SET_PAGE = 'SET_PAGE';
export const ADD_WORDS = 'ADD_WORDS';
export const ADD_SENTENCES = 'ADD_SENTENCES';
export const SET_TARGET_MUZZLE = 'SET_TARGET_MUZZLE';

//other constants
export const PAGES = {
  RECORDS: 'RECORDS',
  RESULTS: 'RESULTS',
  RECORDING: 'RECORDING'//RECORDINGはまだ未実装
}

//action creators
export function setPage(page) {
  return { type: SET_PAGE, currentPage: page }
}

export function addWords(words) {
  return { type: ADD_WORDS, words: words }
}

export function addSentences(sentences) {
  return { type: ADD_SENTENCES, sentences: sentences }
}

export function setTargetMuzzle(muzzle) {
  return { type: SET_TARGET_MUZZLE, targetMuzzle: muzzle }
}