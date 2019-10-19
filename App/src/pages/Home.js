import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

import { morphologicalAnalysis } from '../assets/util'

export default function Home() {
    let [ recognition,setRecognition ] = useState(null);
    let [ targetMuzzle,setTargetMuzzle ] = useState({
        'text':'えっ',
    });

    function recordStart() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let recognition = new window.SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "ja-JP";
        setRecognition(recognition)
    
        recognition.onerror = function(event){
            window.alert(event.error);
        }
    
        recognition.onresult = async function(event){
            let text = event.results[event.results.length-1][0].transcript;
            let tokens = await morphologicalAnalysis(text);
            for(let token of tokens) {
                if(token['surface_form'] == targetMuzzle['text']) {
                    // ここにバイブレーションの動作を追加
                }
            }

        }
        recognition.start();
    }

    function recordStop() {
        recognition.stop();
        setRecognition(null);
    }
    
    let recordButton = ( recognition )? (
        <button onClick={recordStop}>RecordStop</button>
    ):(
        <button onClick={recordStart}>RecordStart</button>
    )

    return (
        <div className="App">
            <body className="App-body">
                <a>HomePage</a>
                <Link to="/record">
                    <button>ToRecord</button>
                </Link>
            </body>
            {recordButton}
        </div>
    );
}