import React,{ useState, useEffect, useReducer } from 'react';
import './Home.css';
import { useHistory, useLocation } from 'react-router-dom';
import { morphologicalAnalysis, vibrate, gooAPIClient, wordCount } from '../assets/util';

import MIC from '../assets/img/mic.png';
import TALK from '../assets/img/talk.png';
import STOP from '../assets/img/stop.png';

export default function Home() {
    const [ isRecording,setIsRecording ] = useState(false);
    const [ recognition,setRecognition ] = useState(null)
    const [ targetMuzzle,setTargetMuzzle ] = useState({'text':'えっ'});

    const [data, dispatcher] = useReducer((prevData,text) => prevData + text ,"");
    
    useEffect(() => {
        console.log("Hey");
        if(isRecording){
            window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            let recognition = new window.SpeechRecognition();
            recognition.continuous = true;
            recognition.lang = "ja-JP";

            recognition.onresult = (event) =>  {
                let text = event.results[event.results.length-1][0].transcript;

                if(text.indexOf(targetMuzzle) != -1){
                    vibrate();
                }
                console.log(text);
                dispatcher(text);
            }

            recognition.onend = (event) => {
                //recognition.stop();
                recognition.start();
            }

            recognition.start();
            setRecognition(recognition);
        }

        return () => {
            if(recognition != null) {
                //recognition.abort();
                recognition.stop();
            };
        }
    },[isRecording, dispatcher]);

    const location = useLocation();    
    const history = useHistory();

    useEffect(() => {
        if(location.state) {
            setTargetMuzzle(location.state.str);
        } else {
            setTargetMuzzle("こんにちは");
        }
    },[location.state])


    function recordStart() {
        setIsRecording(true);
    }

    async function recordStop() {
        setIsRecording(false);
        if(data != "") {
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
            <h1 className="App-body_reco-header">「<span className="App-body_reco-header-muzzle">口グセ</span>」<br></br>を直そう</h1>
            <button onClick={()=>history.push('/result')}>ToResult</button>
            {recordButton}
            <img className="App-body_reco-img" src={TALK} alt="会話する人間"/>
        </div>
    );
}
