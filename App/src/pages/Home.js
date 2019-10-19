import React,{ useState } from 'react';
import './Home.css';
import { useHistory, useLocation } from 'react-router-dom';

import { morphologicalAnalysis,vibrate } from '../assets/util'

export default function Home() {
    let [ isRecording,setIsRecording ] = useState(false);
    let [ recognition,setRecognition ] = useState(null)
    let [ targetMuzzle,setTargetMuzzle ] = useState({
        'text':'えっ',
    });
    let [data, setData] = useState({"text":[]});

    const location = useLocation();    
    
    const history = useHistory();

    function recordStart() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let recognition = new window.SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "ja-JP";
        setIsRecording(true)
    
        // recognition.onerror = function(event){
        // }

        recognition.onresult = (event) =>  {
            let text = event.results[event.results.length-1][0].transcript;
            let tokens = morphologicalAnalysis(text).then(tokens => {
                for(let token of tokens) {
                    if(token['surface_form'] === targetMuzzle['text']) {
                        // ここにバイブレーションの動作を追加
                        vibrate()
                    }
                    // let data_copy =  Object.create(data);
                    // data_copy.push(token['surface_form']);
                    //console.log(setData,token['surface_form'])
                    data["text"].push(token['surface_form']);
    
                    //window.confirm(token['surface_form']);
                    //countedWords.push(token['surface_form']);
                    console.log(data);
                }
            });
        }
        recognition.start();
        setRecognition(recognition);
    }

    function recordStop() {
        recognition.abort();
        setIsRecording(false);
    }

    function test () {
        let data_copy =  Object.create(data);
        data_copy.push("#");
        setData(data_copy);
    }

    let showMuzzleResult = ( location.state )? (
        <a>{location.state.str}を治そう</a>
    ):(
        <a>えっとを治そう</a>
    )
    
    let recordButton = ( isRecording )? (
        <button onClick={recordStop}>RecordStop</button>
    ):(
        <button onClick={recordStart}>RecordStart</button>
    )
    
    return (
        <body className="App-body">
            <a>HomePage</a>
            {showMuzzleResult}
            <button onClick={()=>history.push({pathname:'/result',state:{ countedWords: data.text }})}>ToResult</button>
            {recordButton}
        </body>
    );
}
