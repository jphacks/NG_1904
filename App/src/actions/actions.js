//action types
export const SET_PAGE = 'SET_PAGE';
export const ADD_WORDS = 'ADD_WORDS';
export const ADD_SENTENCES = 'ADD_SENTENCES';

//other constants
export const PAGES = {
  RECORDS: 'RECORDS',
  RESULTS: 'RESULTS'
}

//action creators
export function setPage() {
  return { type: SET_PAGE }
}

export function addWords(words) {
  return { type: ADD_WORDS, words: words }
}

export function addSentences(sentences) {
  return { type: ADD_SENTENCES, sentences: sentences }
}