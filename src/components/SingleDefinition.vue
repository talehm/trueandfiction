<template>
<main>
    <!-- <v-card class="mx-auto ma-12"> -->
    <article v-if="post">
        <!-- <v-card-title> -->
        <header class="mx-auto pa-12">
            <!-- <responsive-image v-if="post.featured_media" :media-id="post.featured_media" :sizes="'(max-width: 1200px) 100vw, 1200px'" /> -->
            <span class="text-h4" v-html="content.word"></span>
            <span class="text-subtitle-1 blue-grey--text text--lighten-1">{{pronunciation}}</span>
            <v-btn icon class="mx-0 green--text" fab dark small>
                <v-icon dark @click="playAudio"> mdi-volume-high </v-icon>
            </v-btn>
        </header>
        <!-- </v-card-title> -->

        <!--  -->

        <!-- <v-card-text> -->
        <v-row no-gutters class="pa-0" v-for="(item,i) in content.results" :key="i">
            <definition :item="item" :length="content.results.length" :index="i+1" />
            <!-- <v-card class="mx-auto">
                <v-card-text class="pb-0">
                    <span class="green--text font-weight-medium text--darken-2">{{ item.partOfSpeech }}</span> <span class="grey lighten-4 pa-1">{{i+1}} of {{ content.results.length }}</span>
                    <p class="font-weight-medium text--primary"> {{ item.definition }} </p>
                    <div class="font-italic" v-if="item.examples">
                        <p v-for="(example,index) in item.examples" :key="'example'+index">{{ example }}</p>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn-toggle v-model="toggle_one" rounded="0" color="deep-purple-accent-3" group>
                        <v-btn> <span class="text-caption">synonyms</span> </v-btn>
                        <v-btn> <span class="text-caption">hasTypes</span> </v-btn>
                        <v-btn> <span class="text-caption">Types of</span> </v-btn>
                        <v-btn> <span class="text-caption">derivations</span>  </v-btn>
                    </v-btn-toggle>
                </v-card-actions>
                <v-expand-transition>
                    <div v-show="true">
                        <v-divider></v-divider>
                        <v-card-text>
                            <div v-if="show">
                           <span>Test</span>

                            </div>
                        </v-card-text>
                    </div>
                </v-expand-transition>
            </v-card> -->
            <!-- <v-col cols="12" sm="4" md="3">
                        test
                    </v-col>
                    <v-col sm="8" md="8">
                        <div v-html="post.content.rendered"></div>
                    </v-col> -->
        </v-row>
        <!-- <post-taxonomies :post="post" /> -->
        <!-- </v-card-text> -->
    </article>
    <!-- </v-card> -->
</main>
</template>

<script>
import he from 'he';

import ResponsiveImage from "@/components/utility/ResponsiveImage";
import PostMeta from "@/components/utility/PostMeta";
import PostTaxonomies from "@/components/utility/PostTaxonomies";
import speechMixin from "@/components/mixins/speech";
import definition from "@/components/utility/definition";
export default {
    name: "Single-Definition",
    mixins: [speechMixin],
    components: {
        ResponsiveImage,
        PostMeta,
        PostTaxonomies,
        definition
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
            return he.decode(this.content.pronunciation.all);
        },
        audio() {
            return new Audio(this.content.audio);
        },
        post() {
            return this.$store.getters.singleBySlug(this.request);
        },
        content() {
            const content = this.post.content.rendered.replaceAll("<p>", "").replaceAll("</p>", "");
            let decoded = he.decode(content).replaceAll(/[\u2018\u2019]/g, "'").replaceAll(/[\u201C\u201D]/g, '"').replaceAll(/″/g, '"').replaceAll(/[\u2032\u02B9]/g, "'");
            return JSON.parse(decoded);
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
