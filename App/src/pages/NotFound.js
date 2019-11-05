import React,{ useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import TALK from '../assets/img/talk.png';
import '../App.scss';

import { useDispatch } from 'react-redux';
import { setPage, PAGES } from '../actions/actions';

export default function NotFound() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPage(PAGES.NOTFOUND));
    },[ dispatch ])

    return (
        <div className="App-body">
            <h1 className="App-body_notfound-header">
                This Page is<br/>
                Not FOUND.
            </h1>
            <button onClick={() => history.push({pathname:'/home'})}>To Home</button>
            <img className="App-body_notfound-img" src={TALK} alt="会話する人間"/>
        </div>
    );
}
