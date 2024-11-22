<template>
	<v-card class="mx-auto mb-2">
		<v-card-text class="pb-0">
			<span class="green--text font-weight-medium text--darken-2">{{ item.partOfSpeech }}</span> <span
				class=" lighten-4 pa-1 text-caption">{{ index }} of {{ length }}</span>
			<p class="font-weight-medium text--primary text-h5"> {{ item.definition }} </p>
			<div class="font-italic" v-if="item.examples">
				<p v-for="(example, index) in item.examples" :key="'example' + index">Example: {{ example }}</p>
			</div>
		</v-card-text>
		<v-card-actions>
			<v-btn-toggle vertical :model="expandedBtn" mandatory active-class="green--text">
				<v-btn v-for="(btn, i) in btns" :key="i" small @click="showDetails(i)"> <span
						class="text-caption text-lowercase"> {{ btn }} </span> </v-btn>
			</v-btn-toggle>
		</v-card-actions>
		<v-expand-transition>
			<div>
				<!-- <v-divider></v-divider> -->
				<v-card-text>
					<div>
						<v-row no-gutters class="pa-0">
							<v-col cols="12" sm="4" md="3" v-for="(element, i) in item[expandedDetail]" :key="i">
								<span class="green--text text--darken-3 font-weight-medium"> {{ element }}</span>
							</v-col>
						</v-row>
					</div>
				</v-card-text>
			</div>
		</v-expand-transition>
	</v-card>
</template>

<script>
export default {
    data() {
        return {
            // expendedDetail: "synonyms",
            expandedBtn:0
        }
    },
    props: {
        item: Object,
        length: Number,
        index: Number
    },
    methods: {
        showDetails(index) {
            this.expandedBtn = index;
        }
    },
    computed: {
        btns() {
            return Object.keys(this.item).filter(key => key != "definition" && key != "partOfSpeech" && key != "examples");
        },
        expandedDetail(){
            return this.btns[this.expandedBtn];
        }
    }
}
</script>
