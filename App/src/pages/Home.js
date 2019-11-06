import React,{ useState, useEffect, useReducer } from 'react';

import { useHistory } from 'react-router-dom';
import { vibrate, gooAPIClient, wordCount } from '../common/util';/* morphologicalAnalysis */

import MIC from '../assets/img/mic.png';
import TALK from '../assets/img/talk.png';
import STOP from '../assets/img/stop.png';
import '../App.scss';

import { useDispatch, useSelector } from 'react-redux';
import { setPage, addWords, PAGES, addSentences } from '../actions/actions' 

//stateで管理すると2回目から録音ボタンを押しても何も始まらなくなるので設定
//いずれ解決する必要あり
let staterecording = false;

export default function Home() {
    //const currentPage = useSelector(state => state.setPages.currentPage);
    const targetMuzzle = useSelector(state => state.setMuzzle.targetMuzzle);
    const dispatch = useDispatch();
    const [ isRecording,setIsRecording ] = useState(false);
    const [ data, dispatcherReducer ] = useReducer((prevData,text) => {return [...prevData,text];}, []);
    const [ latestText,setLatestText ] = useState("");
    const history = useHistory();

    useEffect(() => {
        console.log("Effect is Called");
        window.SpeechRecognition =  window.webkitSpeechRecognition || window.SpeechRecognition;
        let recognize = new window.SpeechRecognition();

        if(isRecording){
            recognize.interimResults = true;
            recognize.lang = "ja-JP";

            let memoryIndex = 0;

            recognize.onresult = (event) =>  {
                let text = event.results[event.results.length-1][0].transcript;

                // Chromeの挙動チェック用
                console.log(event.results[event.results.length-1]["isFinal"],event.results[event.results.length-1][0].transcript)
                if(event.results[event.results.length-1]["isFinal"]) {
                    dispatcherReducer(text);
                    setLatestText(text)
                    memoryIndex = 0
                }
                let index = text.indexOf(targetMuzzle,memoryIndex);
                if(index !== -1){
                    console.log("vibrate");//PCでの確認用
                    vibrate();
                    memoryIndex += text.length - 1;
                }
            }

            recognize.onend = (event) => {
                if(staterecording){
                    recognize.stop();
                    recognize.start();
                }
            }
            recognize.start();
        }

        return () => {
            if(recognize != null) {
                recognize.abort();
            };
        }
        //targetMuzzleは更新されないので依存関係に含めていい（はず）
    },[ isRecording, dispatcherReducer, targetMuzzle ]);

    useEffect(() => {
        //対応していないブラウザで警告を表示する
        //IOS版のChrome，safari,Android版のChrome，firefox，デスクトップ版のchrome,firefoxで動作確認済み
        dispatch(setPage(PAGES.RECORDS));
        if(targetMuzzle==="口癖"){
            const agent = window.navigator.userAgent.toLowerCase();
            const chrome = (agent.indexOf('chrome') !== -1) && (agent.indexOf('edge') === -1)  && (agent.indexOf('opr') === -1);
            if(!chrome){
                window.alert("お使いのブラウザは対応しておりません．Android版のChromeをお使いください．");
            }
        }
    },[ targetMuzzle, dispatch ])

    function recordStart() {
        //将来的にまとめたい
        setIsRecording(true);
        staterecording = true;

        dispatch(setPage(PAGES.RECORDING));
    }

    async function recordStop() {
        //将来的にまとめたい
        setIsRecording(false);
        staterecording = false;
        
        //ストップボタン押下時に録音データが存在した場合にページ遷移
        const str = data.join('');

        if(str.trim().length !== 0) {
            let tokens = await gooAPIClient(str);
            let wc = wordCount(tokens["word_list"][0]);
            dispatch(addWords(wc));
            dispatch(addSentences(data));
            history.push({pathname:'/result'})
        }else{
            dispatch(setPage(PAGES.RECORDS));
        }
    }

    function transitionSelect() {
        history.push({pathname:"select"});
    }

    let recordButton = ( isRecording )? (
        <button onClick={recordStop} className="App-body_reco-stop"><img src={STOP} alt="停止"/>録音終了</button>
    ):(
        <button onClick={recordStart} className="App-body_reco-start"><img src={MIC} alt="マイク"/>会話を録音</button>
    )

    return (
        <div className="App-body">
            CircleCIのテスト
            <button onClick={transitionSelect}>
                Select Button
            </button>
            <div>
                {latestText}
            </div>
            <h1 className="App-body_reco-header">「<span className="App-body_reco-header-muzzle">{targetMuzzle}</span>」<br></br>を直そう</h1>
            {recordButton}
            <img className="App-body_reco-img" src={TALK} alt="会話する人間"/>
        </div>
    );
}
