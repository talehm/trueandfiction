import Vue from 'vue'
import Speech from "speak-tts";

// Vue.use(Speech);
const synth = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance();
utterance.volume = 0.5;
utterance.lang = 'en-GB';
utterance.rate = 1;
utterance.pitch = 1;
utterance.voice = synth.getVoices().find(v => v.name === 'Google UK English Female');
// utterance.text = 'The quick brown fox jumps over the lazy dog.';
// console.log(synth.getVoices().find(v => v.name === 'Google UK English Female'));
export default {
  synth, utterance
}
// const speech = new Speech(); 
// if (speech.hasBrowserSupport()) {
//     // returns a boolean
//     // Speech.setVoice('Fiona')
//     console.log("speech synthesis supported");
//     // speech.synthesisVoice('Fiona');
//     speech
//       .init({
//         volume: 0.5,
//         lang: 'en-GB',
//         rate: 1,
//         pitch: 1,
//         voice:'Google UK English Female',
//         splitSentences: true,})
//       .then((data) => {
//         // The "data" object contains the list of available voices and the voice synthesis params
//         console.log("Speech is ready, voices are available", data);
//       })
//       .catch((e) => {
//         console.error("An error occured while initializing : ", e);
//       });
//   }
//   export default speech;