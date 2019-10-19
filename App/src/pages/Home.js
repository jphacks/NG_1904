import React,{ useState } from 'react';
import './Home.css';
import { useHistory } from 'react-router-dom';
import MIC from '../assets/img/mic.png';
import TALK from '../assets/img/talk.png';
import STOP from '../assets/img/stop.png';
import { morphologicalAnalysis,vibrate } from '../assets/util'

export default function Home() {
    let [ isRecording,setIsRecording ] = useState(false);
    let [ recognition,setRecognition ] = useState(null)
    let [ targetMuzzle,setTargetMuzzle ] = useState({
        'text':'えっ',
    });
    let [ wordList,setWordList ] = useState({
        words:[]
    })

    const history = useHistory();

    function recordStart() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let recognition = new window.SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "ja-JP";
        setIsRecording(true)

        // recognition.onerror = function(event){
        // }

        recognition.onresult = async function(event)  {
            let text = event.results[event.results.length-1][0].transcript;
            await vibrate();
            let tokens = await morphologicalAnalysis(text);
            for(let token of tokens) {
                console.log(token)
                wordList['words'].push(token['surface_form'])
                if(token['surface_form'] == targetMuzzle['text']) {
                    vibrate();
                }
            }

        }
        recognition.start();
        setRecognition(recognition);
    }

    function recordStop() {
        recognition.abort();
        setIsRecording(false);
    }

    let recordButton = ( isRecording )? (
        <button onClick={recordStop} className="App-body_reco-stop"><img src={STOP} alt="停止"/>録音終了</button>
    ):(
        <button onClick={recordStart} className="App-body_reco-start"><img src={MIC} alt="マイク"/>会話を録音</button>
    )

    return (
        <body className="App-body">
            <h1 className="App-body_reco-header">「<span className="App-body_reco-header-muzzle">口グセ</span>」<br></br>を直そう</h1>
            <button onClick={()=>history.push('/result')}>ToResult</button>
            {recordButton}
            <img className="App-body_reco-img" src={TALK} alt="会話する人間"/>
        </body>
    );
}
