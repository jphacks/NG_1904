import React,{ useState, useEffect, useReducer } from 'react';
import './NotFound.css';
import { useHistory, useLocation } from 'react-router-dom';

import TALK from '../assets/img/talk.png';

export default function NotFound() {
    const history = useHistory();

    return (
        <div className="App-body">
            <h1 className="App-body_notfound-header">
                This Page is<br/>
                Not FOUND.
            </h1>
            <button onClick={() => history.push({pathname:'/home',state:{ str: "口グセ" }})}>To Home</button>
            <img className="App-body_notfound-img" src={TALK} alt="会話する人間"/>
        </div>
    );
}
