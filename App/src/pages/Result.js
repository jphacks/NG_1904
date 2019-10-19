import React from 'react';
import './Result.css';
import { useHistory, useLocation } from 'react-router-dom';

import LEFT from '../assets/img/left-accessory.png';
import RIGHT from '../assets/img/right-accessory.png';
import ONE from '../assets/img/1.png';
import TWO from '../assets/img/2.png';
import THREE from '../assets/img/3.png';
import FOUR from '../assets/img/4.png';
import FIVE from '../assets/img/5.png';
import BG from '../assets/img/bg.png';

export default function Result() {
    const history = useHistory();
    const location = useLocation();

    const images = [ONE, TWO, THREE, FOUR, FIVE];

    const listItems = location.state.countedWords.map((data, index) =>
        <li key={index} className="List-item" onClick={() => history.push({pathname:'/home',state:{ str: data.str }})}>
            <img src={images[index]}></img>
            <span className="List-item_muzzle-word">{data.str}</span><p className="List-item_muzzle-count">{data.count}<span className="List-item_muzzle-count-txt">{"回"}</span></p>
            {/* <button >LOG</button> */}
        </li>
    );

    let style = {
        backgroundImage: `url(${BG})`
    }

    return (
        <div className="App-body List-body" style={style}>
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