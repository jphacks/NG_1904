import React from 'react';
import './Result.css';
import { useHistory } from 'react-router-dom';
import testData from './test.json';
import LEFT from '../assets/img/left-accessory.png';
import RIGHT from '../assets/img/right-accessory.png';
import ONE from '../assets/img/1.png';
import TWO from '../assets/img/2.png';
import THREE from '../assets/img/3.png';
import FOUR from '../assets/img/4.png';
import FIVE from '../assets/img/5.png';

export default function Result() {
    const history = useHistory();

    const images = [ONE, TWO, THREE, FOUR, FIVE];


    const listItems = testData.map((data, index) =>
            <li key={index} className="List-item" onClick={()=>history.push('/home')}>
            <img src={images[index]}></img>
                { data.str }{ " ： "}{ data.count } < span > { "回"}</span >
                {/* <button >LOG</button> */}
            </li>
    );

    return (
        <div className="App-body">
            <div className="background-circle"></div>
            <header className="App-body_rank-head">
                <img src={LEFT} alt="左の装飾"/>
                <h1 className="App-body_rank-header">あなたの口グセ<br></br><span className="App-body_rank-header-top">TOP5</span></h1>
                <img src={RIGHT} alt="右の装飾"/>
            </header>
            <div className="App-body_rank-list">
                    <ol className="List">{listItems}</ol>
            </div>
        </div>
    );
}