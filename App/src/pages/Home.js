import React,{ useState, useEffect } from 'react';
import './Home.css';
import { useHistory, useLocation } from 'react-router-dom';

import { morphologicalAnalysis,vibrate } from '../assets/util'

export default function Home() {
    let [ isRecording,setIsRecording ] = useState(false);
    let [ recognition,setRecognition ] = useState(null)
    let [ targetMuzzle,setTargetMuzzle ] = useState({
        'text':'えっ',
    });

    let [data, setData] = useState("");

    useEffect(() => {
        if(isRecording){
            window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            let recognition = new window.SpeechRecognition();
            recognition.continuous = true;
            recognition.lang = "ja-JP";

            recognition.onresult = (event) =>  {
                let text = event.results[event.results.length-1][0].transcript;
                console.log(text)
                setData(data + text);

                console.log(data)
            }

            recognition.start();
            setRecognition(recognition);
        }


        return function cleanup() {
            //recognition.abort();
        };
    },[isRecording,data]);
    

    const location = useLocation();    
    
    const history = useHistory();

    function recordStart() {
        setIsRecording(true);
    }

    function recordStop() {
        recognition.abort();
        setIsRecording(false);
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
            <button onClick={()=>history.push({pathname:'/result',state:{ countedWords: data }})}>ToResult</button>
            {recordButton}
        </body>
    );
}
