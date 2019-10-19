import React from 'react';
import './Result.css';
import { useHistory } from 'react-router-dom';
import testData from './test.json';

export default function Result() {
    const history = useHistory();

    const listItems = testData.map((data, index) =>
            <li key={index} className="List-item" onClick={()=>history.push('/home')}>
                {data.str}{" ： "}{data.count}<span>{"回"}</span>
                {/* <button >LOG</button> */}
            </li>
    );

    return (
        <>
            <header>
                <h1 className="App-body_rank-header"><span>あなたの口グセ</span><br></br>TOP5</h1>
            </header>
            <div>
                <div>
                    <ol className="List">{listItems}</ol>
                </div>
            </div>
        </>
    );
}