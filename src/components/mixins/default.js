
export default {
    data() {
        return {
            speech: {
                isSpeaking: false,
                isResumed: false,
                isStopped: false,
                isCancelled: false,
                isPending: false,
                isFinished: false,
                isBoundary: false,
                isPaused: false,
            },
            actions: [],
            synth: window.speechSynthesis,
			voices: [],
			activeParagraph: 0
        };
    },
    computed: {
        actionList() {
            const play = {
                color: "success",
                text: "Listen",
				action: (text) => {
					const paragraphs = text.match(/<p>.*?<\/p>/g);
					console.log(paragraphs);
					// return paragraphs.forEach((p,i) => this.speak(p, i));
                    return this.speak(paragraphs);
                },
                icon: "mdi-play",
            };
            const resume = {
                color: "info",
                text: "Resume",
                icon: "mdi-play",
                action: () => { this.synth.resume(); },
            };
            const pause = {
                color: "info",
                text: "Pause",
                icon: "mdi-pause",
                action: () => { this.synth.pause(); },
            };
            const stop = {
                color: "info",
                text: "Stop",
                icon: "mdi-stop-circle",
                action: () => { this.clear(); },
            };
            return { play, resume, pause, stop };
        }
    },
    methods: {
        clear() {
			window.speechSynthesis.cancel();
			this.onChangeSpeechAction("isStopped");
			this.actions.length = 0;
			this.activeParagraph = 0;
			this.addAction(this.actionList.play);
        },
        addAction({ color, text, icon, action }) {
            this.actions.push({ color, text, icon, action });
        },
        onChangeSpeechAction(speechKey) {
            Object.keys(this.speech).forEach(key => this.$set(this.speech, key, key == speechKey));
        },
		speak(paragraphs) {
			try {
				window.speechSynthesis.cancel();
				if ('speechSynthesis' in window) {
					const synth = window.speechSynthesis;

					const text = paragraphs[this.activeParagraph];
					// Ensure voices are loaded
					if (this.voices.length === 0) {
						this.voices = this.synth.getVoices();
					}

					const selectedVoice = this.voices.find(v => v.lang === "en-US");

					if (!selectedVoice) {
						console.error('Selected voice not found');
						return;
					}

					const utterance = new SpeechSynthesisUtterance(text);
					utterance.voice = selectedVoice;



					const words = text.split(' ');
					let index = 0;

					utterance.onstart = () => {
						console.log('Speech started');
						this.onChangeSpeechAction("isSpeaking");
						this.actions.length = 0;
						this.addAction(this.actionList.pause);
						this.addAction(this.actionList.stop);
					};

					utterance.onend = () => {
						console.log('Speech ended');
						this.activeParagraph++;
						if (this.activeParagraph < paragraphs.length - 1) {
							this.speak(paragraphs);
						}
						else {
							this.onChangeSpeechAction("isFinished");
							setTimeout(() => {
								if (this.speech.isFinished) {
									this.actions.length = 0;
									this.addAction(this.actionList.play);
								}
							}, 3000);
						}
					};

					utterance.onresume = () => {
						console.log('Speech resumed');
						this.onChangeSpeechAction("isResumed");
						this.actions.length = 0;
						this.addAction(this.actionList.pause);
						this.addAction(this.actionList.stop);
					};

					utterance.onpause = () => {
						console.log('Speech paused');
						this.onChangeSpeechAction("isPaused");
						this.actions.length = 0;
						this.addAction(this.actionList.resume);
						this.addAction(this.actionList.stop);
					};

					utterance.onboundary = (event) => {
						const activeWordIndex = event.charIndex;
						console.log(utterance.text);
						const activeWord = utterance.text.slice(activeWordIndex, utterance.text.indexOf(' ', activeWordIndex));
						console.log(event.charIndex,activeWord, "event.charIndex");
						this.highlightWord(activeWord, activeWordIndex, this.activeParagraph);
						// index++;
					};

					console.log('Utterance ready to speak:', utterance);
					synth.speak(utterance);
				}

            } catch (error) {
                console.error('Speech synthesis error:', error);
            }
        }
    },
    mounted() {
        // Load voices if not already loaded
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = () => {
                this.voices = this.synth.getVoices();
            };
        }
    }
};
