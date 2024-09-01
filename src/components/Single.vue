<template>
  <main>
    <v-card :loading="request.showLoading" class="mx-auto ma-12">
      <!-- <testspeech /> -->
      <article v-if="post">
        <v-card-title>
          <header>
            <responsive-image
              v-if="post.featured_media"
              :media-id="post.featured_media"
              :sizes="'(max-width: 1200px) 100vw, 1200px'"
            />
            <p class="text-h4" v-html="post.title.rendered"></p></header
        ></v-card-title>
        <v-card-actions class="float-left">
          <v-btn
            v-for="(action, i) in actions"
            :key="i"
            elevation="2"
            small
            :color="action.color"
            class="ma-2"
            @click="
              action.text == 'Listen'
                ? action.action(post.content.rendered)
                : action.action()
            "
          >
            <v-icon left> {{ action.icon }} </v-icon>
            {{ action.text }}
          </v-btn>
        </v-card-actions>
        <div class="float-right text-caption pr-4">
          <post-meta :post="post" />
        </div>

        <v-card-text class="mt-10">
          <post-taxonomies :post="post" />
          <div ref="textToRead" v-html="post.content.rendered" @dblclick="getSelText"></div>
          <brief-definition :item="briefDefinition" @show="toggleDefinition" />
        </v-card-text>
      </article>
    </v-card>
  </main>
</template>

<script>
import ResponsiveImage from "@/components/utility/ResponsiveImage";
import PostMeta from "@/components/utility/PostMeta";
import PostTaxonomies from "@/components/utility/PostTaxonomies";
import BriefDefinition from "@/components/utility/BriefDefinition";
import testspeech from "@/components/utility/testspeech";

import defaultMixin from "@/components/mixins/default";
export default {
  name: "Single",
  mixins: [defaultMixin],
  components: {
    ResponsiveImage,
    PostMeta,
    PostTaxonomies,
    BriefDefinition,
    testspeech
  },
  props: {
    slug: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      request: {
        type: "posts",
        slug: this.slug,
        showLoading: true,
      },
      briefDefinition: null
    };
  },
  computed: {
    speechText() {
      return this.post.content.rendered.replace(/<[^>]+>/g, "");
    },
    post() {
      return this.$store.getters.singleBySlug(this.request);
    },
    text() {
      return "The Internet is a series of tubes!";
    },
  },
  methods: {
    toggleDefinition(){
      // this.briefDefinition.isOpen = !this.briefDefinition.isOpen;
      this.briefDefinition=null;
    },
    getPost() {
      this.$store.dispatch("getSingleBySlug", this.request).then(() => {
        this.$store.dispatch("updateDocTitle", {
          parts: [this.post.title.rendered, this.$store.state.site.name],
        });
      });
    },
    getSelText() {
      const selObj = window.getSelection();
      const range = selObj.getRangeAt(0);

      const wholeParagraph = selObj.anchorNode.data;
      const text = wholeParagraph
        .slice(range.startOffset, range.endOffset)
        .trim();
      const clientRect = range.getClientRects()[0];
      const hasDefiniton = this.briefDefinition != null && this.briefDefinition.word == text;
      if(hasDefiniton){
        this.briefDefinition.isOpen = true;
      }else{
        this.$store.dispatch("getBriefDefinition", text).then((response) => {
          console.log(response, text);
          if (response.brief !== "" && response.brief != null) {
            this.briefDefinition = {
              content: response,
              word: text,
              isOpen: true,
              coordinates: {
                x: clientRect.x,
                y: clientRect.y + clientRect.height,
              },
            };
          } else {
            this.briefDefinition = null;
          }

        });
      }
      // alert(selObj);
      // const selRange = selObj.getRangeAt(0);
      // alert(selRange);
      // // do stuff with the range
      // var txt = "";
      // if (window.getSelection) {
      //   txt = window.getSelection();
      // } else if (document.getSelection) {
      //   txt = document.getSelection();
      // } else if (document.selection) {
      //   txt = document.selection.createRange().text;
      // }
      // console.log(txt);
      // document.aform.selectedtext.value = txt;
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
	const beforeWord = paragraphText.slice(0, wIndex+1);
    const afterWord = paragraphText.slice(wIndex+1);
            // Highlight all content inside the paragraph up to the active word
    highlightedText =`<span style="background-color: yellow">${beforeWord}</span>`
         +
		afterWord;
			console.log(beforeWord,"-----", afterWord,"----" , word);

    paragraph.innerHTML = highlightedText;


},






  },
  created() {
    this.getPost();

    // this.speech = new Speech(); // will throw an exception if not browser supported
  },
  mounted() {
    this.addAction(this.actionList.play);
  },
  beforeUnmount(){
    this.clear();
  },
	watch: {
		"speech.isStopped": {
			handler(newValue) {
				console.log(newValue, "isStopped");
				if (newValue) {
					const textContainer = this.$refs.textToRead;
					textContainer.innerHTML = this.post.content.rendered;
				}
			},
			deep:true
	}
  },
};
</script>
