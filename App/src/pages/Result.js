import React from 'react';
import './Result.css';
import { useHistory } from 'react-router-dom';
import testData from './test.json';
import LEFT from '../assets/img/left-accessory.png';
import RIGHT from '../assets/img/right-accessory.png';

export default function Result() {
    const history = useHistory();

    const listItems = testData.map((data, index) =>
            <li key={index} className="List-item" onClick={()=>history.push('/home')}>
                {data.str}{" ： "}{data.count}<span>{"回"}</span>
                {/* <button >LOG</button> */}
            </li>
    );

    return (
        <div className="App-body">
            <header className="App-body_rank-head">
                <img src={LEFT} alt="左の装飾"/>
                <h1 className="App-body_rank-header">あなたの口グセ<br></br><span className="App-body_rank-header-top">TOP5</span></h1>
                <img src={RIGHT} alt="右の装飾"/>
            </header>
            <div>
                <div>
                    <ol className="List">{listItems}</ol>
                </div>
            </div>
        </div>
    );
}