<template>
	<v-card :loading="loading" elevation="7" outlined class="ma-2 post-item__card" @click="openArticle(post.link)">
		<responsive-image v-if="post.featured_media" :media-id="post.featured_media" />
		<div>
		<v-card-title><a class="post-item__title" :title="post.title.rendered"
				v-html="post.title.rendered"></a></v-card-title>
		<v-card-text>
			<div v-html="post.excerpt.rendered"></div>
			<post-meta :post="post" />

		</v-card-text>
	</div>
	</v-card>
</template>
<script>
import ResponsiveImage from "@/components/utility/ResponsiveImage";
import PostMeta from "@/components/utility/PostMeta";
import PostTaxonomies from "@/components/utility/PostTaxonomies";

export default {
	name: "PostItem",
	components: {
		ResponsiveImage,
		PostMeta,
		PostTaxonomies,
	},
	props: {
		post: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {};
	},
	methods: {
		openArticle(link) {
			window.open(link, "_blank", "noreferrer");
		},
	},
};
</script>
<style>
.post {
	display: flex;
	flex-flow: row-reverse nowrap;
	justify-content: flex-start;
	align-items: flex-start;
	margin: 4rem 0;
	padding-bottom: 4rem;
	border-bottom: 1px solid #e8e8e8;
}

.post__featured-media {
	display: block;
	flex: 0 0 33%;
	max-width: 400px;
	height: 240px;
	margin-left: 5%;
}

.post__featured-media>img {
	position: absolute;
	top: 50%;
	left: 50%;
	min-height: 100%;
	min-width: 100%;
	transform: translate3d(-50%, -50%, 0);
}

.post__content {
	flex: 1 1 auto;
	max-width: 100%;
	overflow: hidden;
}

.post__content>h2 {
	margin-top: 0;
}

a {
	text-decoration: none;
}

@media (max-width: 680px) {
	.post {
		flex-flow: row wrap;
	}

	.post__featured-media {
		flex: 0 1 100%;
		max-width: 100%;
		margin: 0 0 2rem 0;
	}
}
</style>