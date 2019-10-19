//録音するコンポーネント

export default function recordAudio () {

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new window.SpeechRecognition();

    recognition.onerror = function(event){
        window.alert(event.error);
    }

    recognition.onresult = function(event){
        if(0 < event.results.length){
            window.alert(event.results[0][0].transcript);
        }
    }
    
    recognition.start();
}