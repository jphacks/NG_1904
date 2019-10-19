import React from 'react';
import './Result.css';
import { useHistory, useLocation } from 'react-router-dom';
import testData from './test.json';

export default function Result() {
    const history = useHistory();
    const location = useLocation();

    const listItems = testData.map((data, index) =>
            <li key={index} className="List-item" onClick={()=>history.push({pathname:'/home',state:{ str: data.str }})}>
                {data.str}{" ： "}{data.count}
                <button >LOG</button>
            </li>
    );

    return (
        <>
            <header>
                <h1>ResultPage</h1>
                <a>{location.state.countedWords}</a>
            </header>
            <div>
                <div>
                    <ol className="List">{listItems}</ol>
                </div>
            </div>
        </>
    );
}