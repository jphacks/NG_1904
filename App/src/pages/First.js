import React from 'react';
import './First.css';
import DemoCarousel from './DemoCarousel';

import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, addWords, PAGES, addSentences } from '../actions/actions'


function First() {

  const history = useHistory();

  function transitionHome() {
    history.push({pathname:"home"});
  }

  function transitionSelect() {
    history.push({pathname:"select"});
  }

  return (
    <div className="main">
      <DemoCarousel/>
      <div className="button-parent">
        <input type="button" value="自分の口癖を知る"　className="button1" onClick={()=>transitionHome()}/>
          <p className="subtitle">直したい口癖がある人はこちら</p>
        <input type="button" value="あなたの口癖をなおす" className="button2" onClick={()=>transitionSelect()}/>
      </div>
    </div>
  );
}

export default First;
