import React,{ useState, useEffect, useCallback } from 'react';
import './Home.css';
import { useHistory, useLocation } from 'react-router-dom';

import { morphologicalAnalysis, vibrate, gooAPIClient, wordCount } from '../assets/util';

export default function Home() {
    const [ isRecording,setIsRecording ] = useState(false);
    const [ recognition,setRecognition ] = useState(null)
    const [ targetMuzzle,setTargetMuzzle ] = useState({'text':'えっ'});

    const [data, setData] = useState("");

    function wrapSetData(text) { 
        setData(data + text)
        // useMemo((wrapdata) => setData(wrapdata),[]);
    };

    // const wrapSetData = useMemo(() => {})

    const memoizedValue = useCallback((text) => {
        wrapSetData(text)
    },[data,wrapSetData])
    
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
                console.log(text)
                memoizedValue(text);
            }

            recognition.start();
            setRecognition(recognition);
        }

        return () => {
            if(recognition != null) {
                recognition.abort();
            };
        }
    },[isRecording, memoizedValue]);

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
        let tokens = await gooAPIClient(data);
        let wc = wordCount(tokens["word_list"][0]);
        console.log(wc);
        history.push({pathname:'/result',state:{ countedWords: wc }})
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
            {recordButton}
        </body>
    );
}
