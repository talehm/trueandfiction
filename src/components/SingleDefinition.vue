<template>
	<main>
		<tile type="article" :article="post">
			<template #content>
				<v-card class="mx-auto ma-2">
					<article v-if="post">
						<header class="mx-auto pa-8">
							<span class="text-h4 text--primary font-weight-medium" v-html="content.word"></span><br>
							<span v-if="pronunciation" class="text-subtitle-1 blue-grey--text text--lighten-1">[{{
								pronunciation }}]</span>
							<v-icon dark @click="playAudio" class="font-size-sm green--text" v-if="audio"> fa4 fa-solid
								fa-play </v-icon>
						</header>
						<v-row no-gutters class="pa-0 mb-4" v-for="(item, i) in content.results" :key="i">
							<definition :item="item" :length="content.results.length" :index="i + 1" />
						</v-row>
					</article>
				</v-card></template>
		</tile>
	</main>
</template>
<script>
import he from 'he';

import ResponsiveImage from "@/components/utility/ResponsiveImage";
import PostMeta from "@/components/utility/PostMeta";
import PostTaxonomies from "@/components/utility/PostTaxonomies";
import speechMixin from "@/components/mixins/speech";
import definition from "@/components/utility/definition";
import tile from "./template-parts/Tile.vue";

export default {
	name: "Single-Definition",
	mixins: [speechMixin],
	components: {
		ResponsiveImage,
		PostMeta,
		PostTaxonomies,
		definition,
		tile
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
				type: "definition",
				slug: this.slug,
				showLoading: true,
			},
		};
	},
	computed: {
		// details() {
		//     // console.log(this.post.details);
		//     return JSON.parse(this.post.details);
		// },
		pronunciation() {
			if (!this.content.pronunciation.all) return;
			const regex = /u([0-9a-fA-F]{4})/g; // Match 'uXXXX' without backslashes
			const replaceUnicodeMatches = (match, hexCode) => {
				// Convert the hexadecimal string (e.g., '026a') to an integer and return the corresponding Unicode character
				return String.fromCharCode(parseInt(hexCode, 16));
			}
			return this.content.pronunciation.all.replace(regex, replaceUnicodeMatches);
		},
		audio() {
			if (this.content.audio === "") return;
			return new Audio(this.content.audio);
		},
		post() {
			return this.$store.getters.singleBySlug(this.request);
		},
		content() {
			const content = this.post.content.rendered.replaceAll("<p>", "").replaceAll("</p>", "").trim();
			// let decoded = he.decode(content).replaceAll(/[\u2018\u2019]/g, "'").replaceAll(/[\u201C\u201D]/g, '"').replaceAll(/″/g, '"').replaceAll(/[\u2032\u02B9]/g, "'").trim();
			return JSON.parse(content);
		},
		tileCardItems() {
// const posts = this.posts.map(p => {
// 	return {
// 		name: p.title.rendered,
// 		link: p.link
// 	}
// })
// return {
// 	right: [{
// 		title: "Related Stories",
// 		items: posts
// 	}, {
// 		title: "Categories",
// 		items: this.categories
// 	}]
// }
		}
    },
    methods: {
        playAudio() {
            this.audio.play();
        },
        getPost() {
            this.$store.dispatch("getSingleBySlug", this.request).then(() => {
                this.$store.dispatch("updateDocTitle", {
                    parts: [this.post.title.rendered, this.$store.state.site.name],
                });
            });
        },
    },
    created() {
        this.getPost();
    },
};
</script>
