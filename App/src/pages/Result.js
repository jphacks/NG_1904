import React, { useEffect } from 'react';
import './Result.css';
import { useHistory } from 'react-router-dom';

import LEFT from '../assets/img/left-accessory.png';
import RIGHT from '../assets/img/right-accessory.png';
import ONE from '../assets/img/1.png';
import TWO from '../assets/img/2.png';
import THREE from '../assets/img/3.png';
import FOUR from '../assets/img/4.png';
import FIVE from '../assets/img/5.png';
import BG from '../assets/img/bg.png';

import { useDispatch, useSelector } from 'react-redux';
import { setPage, setTargetMuzzle, PAGES } from '../actions/actions';

export default function Result() {
    const countedWords = useSelector(state => state.addContent.words);
    const dispatch = useDispatch();
    const history = useHistory();

    const images = [ONE, TWO, THREE, FOUR, FIVE];

    useEffect(() => {
        dispatch(setPage(PAGES.RESULTS));
    },[ dispatch ])

    function onClickList (dataSend) {
        dispatch(setTargetMuzzle(dataSend));
        history.push({pathname:'/home'});
    }

    function transitionDetail (e,text) {
        // イベントバブリングを抑止
        e.stopPropagation();
        dispatch(setTargetMuzzle(text));
        history.push({pathname:'/detail'});
    }

    let listItems = ( typeof countedWords === "undefined" || countedWords === "" )? (
        <li key={0} className="List-item" onClick={() => onClickList("口癖")}>
            <p className="List-item_muzzle-word">{"値が存在しません．"}<br/>{"タップして録音をやり直してください．"}</p>
        </li>
    ):(
        countedWords.map((data, index) => (
            <li key={index} className="List-item" onClick={() => onClickList(data.str)}>
                <img src={images[index]} alt="順位" />
                <span className="List-item_muzzle-word">
                    {data.str}
                </span>
                <p className="List-item_muzzle-count">
                    {data.count}
                    <span className="List-item_muzzle-count-txt">
                        回
                    </span>

                    {/* 仮説のボタンです */}
                    <button onClick={(e) => {transitionDetail(e,data.str)}}>
                        詳細
                    </button>
                </p>
            </li>
        ))
        
    );

    let style = {
        backgroundImage: `url(${BG})`
    }

    return (
        <div className="App-body List-body" style={style}>
            <div className="background-circle"></div>
            <header className="App-body_rank-head">
                <img src={LEFT} alt="左の装飾"/>
                <h1 className="App-body_rank-header">あなたの口癖<br></br><span className="App-body_rank-header-top">TOP5</span></h1>
                <img src={RIGHT} alt="右の装飾"/>
            </header>
            <p className="App-body_rank-announce">
                直したい口癖をタップ！
            </p>
            <div className="App-body_rank-list">
                    <ol className="List">{listItems}</ol>
            </div>
        </div>
    );
}