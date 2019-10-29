import React,{ useState, useEffect, useReducer } from 'react';
import './Home.css';
import { useHistory } from 'react-router-dom';
import { morphologicalAnalysis, vibrate, gooAPIClient, wordCount } from '../assets/util';

import MIC from '../assets/img/mic.png';
import TALK from '../assets/img/talk.png';
import STOP from '../assets/img/stop.png';

import { useDispatch, useSelector } from 'react-redux';
import { setPage, addWords, addSentences } from '../actions/actions' 

//stateで管理すると2回目から録音ボタンを押しても何も始まらなくなるので設定
//いずれ解決する必要あり
let staterecording = false;

export default function Home() {
    //const currentPage = useSelector(state => state.setPages.currentPage);
    const targetMuzzle = useSelector(state => state.setMuzzle.targetMuzzle);
    const dispatch = useDispatch();

    const [ isRecording,setIsRecording ] = useState(false);
    const [ recognition,setRecognition ] = useState(null);

    const [data, dispatcherReducer] = useReducer((prevData,text) => prevData + text ,"");

    useEffect(() => {
        console.log("Hey");
        if(isRecording){
            window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            let recognition = new window.SpeechRecognition();
            recognition.interimResults = true;
            recognition.lang = "ja-JP";

            let memoryIndex = 0;

            recognition.onresult = (event) =>  {
                let text = event.results[event.results.length-1][0].transcript;

                if(event.results[event.results.length-1]["isFinal"]) {
                    dispatcherReducer(text);
                    memoryIndex = 0
                }
                let index = text.indexOf(targetMuzzle,memoryIndex)
                if(index != -1){
                    console.log("here");
                    vibrate();
                    memoryIndex += text.length - 1;
                }
            }

            recognition.onend = (event) => {
                if(staterecording){
                    recognition.stop();
                    recognition.start();
                }
            }

            recognition.start();
            setRecognition(recognition);
        }

        return () => {
            if(recognition != null) {
                recognition.abort();
            };
        }
    },[isRecording, dispatcherReducer, staterecording]);

    const history = useHistory();

    useEffect(() => {
        //対応していないブラウザで警告を表示する
        //IOS版のChrome，safari,Android版のChrome，firefox，デスクトップ版のchrome,firefoxで動作確認済み
        dispatch(setPage("RECORDS"));
        if(targetMuzzle==="口癖"){
            const agent = window.navigator.userAgent.toLowerCase();
            const chrome = (agent.indexOf('chrome') !== -1) && (agent.indexOf('edge') === -1)  && (agent.indexOf('opr') === -1);
            if(!chrome){
                window.alert("お使いのブラウザは対応しておりません．Android版のChromeをお使いください．");
            }
        }
    },[])

    function recordStart() {
        setIsRecording(true);
        staterecording = true;
    }

    async function recordStop() {
        setIsRecording(false);
        staterecording = false;
        //dispatch(setPage());
        
        if(data.trim().length != 0) {
            let tokens = await gooAPIClient(data);
            let wc = wordCount(tokens["word_list"][0]);
            dispatch(addWords(wc));
            history.push({pathname:'/result'})
        }
    }

    let recordButton = ( isRecording )? (
        <button onClick={recordStop} className="App-body_reco-stop"><img src={STOP} alt="停止"/>録音終了</button>
    ):(
        <button onClick={recordStart} className="App-body_reco-start"><img src={MIC} alt="マイク"/>会話を録音</button>
    )

    return (
        <div className="App-body">
            <h1 className="App-body_reco-header">「<span className="App-body_reco-header-muzzle">{targetMuzzle}</span>」<br></br>を直そう</h1>
            {recordButton}
            <img className="App-body_reco-img" src={TALK} alt="会話する人間"/>
        </div>
    );
}
