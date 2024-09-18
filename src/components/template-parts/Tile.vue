<template>
	<main>
		<section>
			<v-container class="bg-surface-variant">
				<template v-if="isList">
					<v-skeleton-loader v-if="!title" v-bind="attrs" class="pa-2" type="list-item"></v-skeleton-loader>
					<p v-else class="text-h5 pa-2 text-center font-weight-black">{{ title }}</p>
				</template>
				<v-row no-gutters class="">
					<v-col md="2" sm="2" cols="12" v-if="!isList && !isMobile">
						<slot name="top-left"></slot>
						<v-card class="d-flex align-center justify-center pa-3 ma-2" height="200" width="auto">
							<span>Ads</span>
						</v-card>
						<v-card class="d-flex align-center justify-center pa-3 ma-2" height="200" width="auto">
							<span>Ads</span>
						</v-card>
						<slot name="bottom-left"></slot>
					</v-col>
					<v-col :md="!isList ? 7 : 9" :sm="!isList ? 7 : 9" cols="12">
						<div v-if="(isList && (!items || items.length == 0))">
							<v-row v-if="isList" >
								<v-col v-for="n in 3"  cols="12" sm="4" >
									<v-skeleton-loader  class="ma-8" v-bind="attrs"
										type="card"></v-skeleton-loader>
								</v-col>
							</v-row>
						</div>
						<div v-else-if="(!isList && !article)">
							<v-skeleton-loader  class="ma-8" v-bind="attrs"
										type="article"></v-skeleton-loader>
						</div>
						<template v-else>
							<v-row v-if="isList">
								<template v-for="(item, i) in items" >
									<!-- <v-col  v-if="i == 1" cols="12" sm="4" >
									<v-card class="d-flex align-center justify-center pa-3 mx-2 mb-2 post-item__card"
										height="100" width="auto">
										<span>Ads</span>
									</v-card>
									</v-col> -->
									<v-col  cols="12" sm="4">
										<!-- Render the slot content, passing 'item' as a slot prop -->
										<slot name="list" :item="item"></slot>
									</v-col>
								</template>
							</v-row>
							<template v-else>
								<slot name="content"></slot>
							</template>
						</template>
					</v-col>
					<v-col md="3" sm="3" cols="12">
						<slot name="topRight"></slot>
						<template v-if="cardItems.right && cardItems.right.length > 0">
							<v-card v-for="collection in cardItems.right" class="pa-3 ma-2" width="auto">
								<span class="header">{{ collection.title }}</span>
								<v-skeleton-loader v-if="collection.items.length == 0"
									type="list-item-three-line"></v-skeleton-loader>
								<template v-else>
									 <CategoryList :items="collection.items" />

									<!-- <v-list-item-group>
										<v-list-item v-for="(item, i) in collection.items" :key="i">
											<v-list-item-content>
												<v-list-item-title v-text="item.name" @click="helpers.fn.open(item.link)"></v-list-item-title>
											</v-list-item-content>
										</v-list-item>
									</v-list-item-group> -->
								</template>
							</v-card>
						</template>
						<slot name="bottomRight"></slot>
					</v-col>
				</v-row>
			</v-container>
			<!-- <pagination v-if="totalPages > 1" :total="totalPages" :current="page" /> -->
		</section>
	</main>
</template>
<script>
import PostItem from "@/components/template-parts/PostItem";
import Pagination from "@/components/template-parts/Pagination";
import defaultMixin from "@/components/mixins/default";
import CategoryList from "@/components/CategoryList";
export default {
	name: "tile",
	mixins:[defaultMixin],
	components: {
		PostItem,
		Pagination,
		CategoryList
	},
	props: {
		article: {
			type: Object
		},
		type: {
			type: String,
			validator(value, props) {
				// The value must match one of these strings
				return ['article', 'list'].includes(value)
			}
		},
		items: {
			type: Array,
			default() {
				return [];
			}
		},
		title: {
			type: String,
		},
		cardItems: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data() {
		return {

		};
	},
	computed: {
		isList() {
			return this.type === "list";
		}
	},
	methods: {
	},
	created() {

	},
	watch: {

	}
};
</script>