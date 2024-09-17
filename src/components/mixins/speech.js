
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
				handle: (text) => {
					const paragraphs = text.match(/>.*?</g);
					// return paragraphs.forEach((p,i) => this.speak(p, i));
					console.log(paragraphs, text);
                    return this.speak(paragraphs);
                },
                icon: "fa4 fa-solid fa-play",
            };
            const resume = {
                color: "info",
                text: "Resume",
                icon: "fa4 fa-solid fa-play",
                handle: () => { this.synth.resume(); },
            };
            const pause = {
                color: "info",
                text: "Pause",
                icon: "fa4 fa-solid fa-pause",
                handle: () => { this.synth.pause(); },
            };
            const stop = {
                color: "info",
                text: "Stop",
                icon: "fa4 fa-solid fa-stop",
                handle: () => { this.clear(); },
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
        addAction({ color, text, icon, handle }) {
            this.actions.push({ color, text, icon, handle });
        },
        onChangeSpeechAction(speechKey) {
            Object.keys(this.speech).forEach(key => this.$set(this.speech, key, key == speechKey));
		},
		highlightWord(word, wIndex, pIndex) {
			const textContainer = this.$refs.textToRead;
			const paragraphs = textContainer.getElementsByTagName('p');
			let highlightedText = '';
			const paragraph = paragraphs[pIndex];

			// Find the <p> tag containing the active word
			const paragraphText = paragraph.innerText;
			console.log(paragraphText);
			// const activeWord = paragraphText.slice(wIndex, paragraphText.indexOf(' ', wIndex));
			const beforeWord = paragraphText.slice(0, wIndex + 1);
			const afterWord = paragraphText.slice(wIndex + 1);
			// Highlight all content inside the paragraph up to the active word
			highlightedText = `<span style="background-color: yellow">${beforeWord}</span>`
				+
				afterWord;
			console.log(beforeWord, "-----", afterWord, "----", word);

			paragraph.innerHTML = highlightedText;

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
						const activeWord = utterance.text.slice(activeWordIndex, utterance.text.indexOf(' ', activeWordIndex));
						this.highlightWord(activeWord, activeWordIndex, this.activeParagraph);
						// index++;
					};

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
