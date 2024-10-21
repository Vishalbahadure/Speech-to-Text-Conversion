const resultElement = document.getElementById("result");
let recognition;

function startConverting() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();  
        setupRecognition(recognition);
        recognition.start();
    } else {
        console.log("Speech recognition not supported in this browser.");
    }
}

function setupRecognition(recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';


    recognition.onresult = function (event) {
        const { finalTranscript, interTranscript } = processResult(event.results);
        resultElement.innerHTML = finalTranscript + interTranscript;
    };
}

function processResult(result) {
    let finalTranscript = '';
    let interTranscript = '';

    for (let i = 0; i < result.length; i++) {
        let transcript = result[i][0].transcript;
        transcript = transcript.replace("\n", "<br>");
        
        if (result[i].isFinal) {
            finalTranscript += transcript;
        } else {
            interTranscript += transcript;
        }
    }

    return { finalTranscript, interTranscript };  
}

function stopConverting() {
    if (recognition) {
        recognition.stop();
    }
}
