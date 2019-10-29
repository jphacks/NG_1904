import { combineReducers } from 'redux';
import { ADD_WORDS, ADD_SENTENCES, SET_PAGE, PAGES } from '../actions/actions';


function setPages(state, action) {
  if (typeof state === "undefined") {
    return {
      currentPage: PAGES.RECORDS
    };
  }
  switch (action.type) {
    case SET_PAGE:
      if(state.currentPage === PAGES.RECORDS){
        return Object.assign({}, state, {
          currentPage: PAGES.RESULTS
        });
      }else if(state.currentPage === PAGES.RESULTS){
        return Object.assign({}, state, {
          currentPage: PAGES.RECORDS
        });
      }

      return Object.assign({}, state, {
        currentPage: PAGES.RECORDS
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
  addContent
})

export default mousehatApp