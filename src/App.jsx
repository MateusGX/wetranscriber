import "./App.css";
import "core-js/stable";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Download, RotateCcw } from "lucide-react";

function App() {
  const {
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  function exportTranscript(data) {
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "transcript.txt";
    link.href = url;
    link.click();
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="main">
      <div className="transcriptContainer">
        <p className="transcript">{finalTranscript || ". . ."}</p>
      </div>

      <div className="buttons">
        <button onClick={() => resetTranscript()}>
          <RotateCcw />
        </button>
        <button
          onClick={() =>
            listening
              ? SpeechRecognition.stopListening()
              : SpeechRecognition.startListening({ continuous: true })
          }
        >
          {listening ? "STOP LISTENING" : "START LISTENING"}
        </button>
        <button onClick={() => exportTranscript(finalTranscript)}>
          <Download />
        </button>
      </div>
    </div>
  );
}

export default App;
