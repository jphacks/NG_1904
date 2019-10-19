import React,{ useState } from 'react';
import './Home.css';
import { useHistory, useLocation } from 'react-router-dom';
import { morphologicalAnalysis } from '../assets/util'

export default function Home() {
    let [ recognition,setRecognition ] = useState(null);
    let [ targetMuzzle,setTargetMuzzle ] = useState({
        'text':'えっ',
    });
    const [data, setData] = useState([]);

    const location = useLocation();
    const history = useHistory();
    

    function recordStart() {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let recognition = new window.SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "ja-JP";
        setRecognition(recognition)
    
        recognition.onerror = function(event){
            window.alert(event.error);
        }
    
        recognition.onresult = async function (event) {
            let text = event.results[event.results.length-1][0].transcript;
            let tokens = await morphologicalAnalysis(text);
            for(let token of tokens) {
                if(token['surface_form'] === targetMuzzle['text']) {
                    // ここにバイブレーションの動作を追加
                }
                let data_copy =  Object.create(data);
                data_copy.push(token['surface_form']);
                setData(data_copy);

                //window.confirm(token['surface_form']);
                //countedWords.push(token['surface_form']);
                console.log(data);
            }
        }
        recognition.start();
    }

    function recordStop() {
        recognition.stop();
        setRecognition(null);
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
    
    let recordButton = ( recognition )? (
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