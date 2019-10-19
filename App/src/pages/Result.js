import React from 'react';
import './Result.css';
import { useHistory } from 'react-router-dom';
import testData from './test.json';

export default function Result() {
    const history = useHistory();

    const listItems = testData.map((data, index) =>
            <li key={index} className="List-item" onClick={()=>history.push('/home')}>
                {data.str}{" ： "}{data.count}
                <button >LOG</button>
            </li>
    );

    return (
        <>
            <header>
                <h1>ResultPage</h1>
            </header>
            <div>
                <div>
                    <ol className="List">{listItems}</ol>
                </div>
            </div>
        </>
    );
}