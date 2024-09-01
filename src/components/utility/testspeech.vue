<template>
  <div>
    <button @click="speak">Speak</button>
    <p ref="textToRead">
      This is the text to be read aloud. It will be highlighted as it is read.
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    speak() {
      const utterance = new SpeechSynthesisUtterance(this.$refs.textToRead.innerText);
      const words = this.$refs.textToRead.innerText.split(' ');
      let index = 0;
      utterance.onboundary = event => {
        const activeWord = words[index];
        this.highlightWord(activeWord);
        index++;
      };
      window.speechSynthesis.speak(utterance);
    },
    highlightWord(word) {
      const text = this.$refs.textToRead.innerText;
      const position = text.indexOf(word);
      const highlightedWord = `<span style="background-color: yellow">${text.slice(0, position)} ${word}</span>`;
      const highlightedText = `${highlightedWord}${text.slice(position + word.length)}`;
      this.$refs.textToRead.innerHTML = highlightedText;
    },
  },
};
</script>
