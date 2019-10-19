import React,{ useState } from 'react';
import './Home.css';
import { useHistory } from 'react-router-dom';

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
        <button onClick={recordStop}>RecordStop</button>
    ):(
        <button onClick={recordStart}>RecordStart</button>
    )
    
    return (
        <body className="App-body">
            <a>HomePage</a>
            <button onClick={()=>history.push('/result')}>ToResult</button>
            {recordButton}
        </body>
    );
}
