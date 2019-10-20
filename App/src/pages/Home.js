import React,{ useState, useEffect, useReducer } from 'react';
import './Home.css';
import { useHistory, useLocation } from 'react-router-dom';
import { morphologicalAnalysis, vibrate, gooAPIClient, wordCount } from '../assets/util';

import MIC from '../assets/img/mic.png';
import TALK from '../assets/img/talk.png';
import STOP from '../assets/img/stop.png';

let staterecording = false;

export default function Home() {
    const [ isRecording,setIsRecording ] = useState(false);
    const [ recognition,setRecognition ] = useState(null)
    const [ targetMuzzle,setTargetMuzzle ] = useState({'text':'口グセ'});

    const [data, dispatcher] = useReducer((prevData,text) => prevData + text ,"");
    
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
                    dispatcher(text);
                    memoryIndex = 0
                }
                let index = text.indexOf(targetMuzzle.text,memoryIndex)
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
                //recognition.abort();
                recognition.abort();
            };
        }
    },[isRecording, dispatcher]);

    const location = useLocation();    
    const history = useHistory();

    useEffect(() => {
        if(location.state) {
            setTargetMuzzle({"text": location.state.str});
        } else {
            setTargetMuzzle({"text":"口グセ"});
        }
    },[location.state])


    function recordStart() {
        setIsRecording(true);
        staterecording = true;
    }

    async function recordStop() {
        setIsRecording(false);
        staterecording = false;
        
        if(data.trim().length != 0) {
            let tokens = await gooAPIClient(data);
            let wc = wordCount(tokens["word_list"][0]);
            history.push({pathname:'/result',state:{ countedWords: wc }})
        } 
    } 

    let recordButton = ( isRecording )? (
        <button onClick={recordStop} className="App-body_reco-stop"><img src={STOP} alt="停止"/>録音終了</button>
    ):(
        <button onClick={recordStart} className="App-body_reco-start"><img src={MIC} alt="マイク"/>会話を録音</button>
    )

    return (
        <div className="App-body">
            <h1 className="App-body_reco-header">「<span className="App-body_reco-header-muzzle">{targetMuzzle.text}</span>」<br></br>を直そう</h1>
            {recordButton}
            <img className="App-body_reco-img" src={TALK} alt="会話する人間"/>
        </div>
    );
}
