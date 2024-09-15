<!-- CategoryList.vue -->
<template>
	<v-list dense>
		<v-list-item v-for="(item, i) in items" :key="i">
			<!-- Recursively render children if they exist -->
			<v-list v-if="item.subs && item.subs.length" no-action>
				<template>
					<v-list-item-title @click="helpers.fn.open(item.link)"> {{ '-'.repeat(level) + ' ' + item.name }}
					</v-list-item-title>
				</template>
				<!-- Call the recursive component for children -->
				<CategoryList :items="item.subs" isNested :level="level + 1" />
			</v-list>
			<v-list-item-content v-else>
				<v-list-item-title @click="helpers.fn.open(item.link)">
					{{ '-'.repeat(level) + ' ' + item.name }}
				</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
	</v-list>
</template>
<script>
import defaultMixin from "@/components/mixins/default";

export default {
	name: 'CategoryList',
	mixins: [defaultMixin],

	props: {
		items: {
			type: Array,
			required: true,
		},
		isNested: {
			type: Boolean
		},
		level: {
			type: Number,
			default() {
				return 0;
			}
		}
	},
	computed: {
		// level() {

		// }

	},
};
</script>