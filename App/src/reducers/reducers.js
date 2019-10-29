import { combineReducers } from 'redux';
import { ADD_WORDS, ADD_SENTENCES, SET_PAGE, PAGES, SET_TARGET_MUZZLE } from '../actions/actions';


function setPages(state, action) {
  if (typeof state === "undefined") {
    return {
      currentPage: PAGES.RECORDS
    };
  }
  switch (action.type) {
    case SET_PAGE:
      return Object.assign({}, state, {
        currentPage: action.currentPage
      });
      
    default:
      //stateが不明の場合はそのまま返すのがセオリー
      return state
  }
}

function setMuzzle(state, action) {
  if (typeof state === "undefined") {
    return {
      targetMuzzle: "口癖"
    };
  }
  switch (action.type) {
    case SET_TARGET_MUZZLE:
      return Object.assign({}, state, {
        targetMuzzle: action.targetMuzzle 
      });
    default:
      //stateが不明の場合はそのまま返すのがセオリー
      return state
  }
}

function addContent(state, action) {
  if (typeof state === "undefined") {
    return "";
  }
  switch (action.type) {
    case ADD_WORDS:
      return Object.assign({}, state, {
        words: action.words
      });

    case ADD_SENTENCES:
      return Object.assign({}, state, {
        sentences: action.sentences
      });

    default:
      //stateが不明の場合はそのまま返すのがセオリー
      return state
  }
}

const mousehatApp = combineReducers({
  setPages,
  addContent,
  setMuzzle
})

export default mousehatApp