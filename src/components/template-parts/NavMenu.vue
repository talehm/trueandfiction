<template>
  <v-tabs right class="mr-16" color="grey darken-1">
    <v-tab v-for="(item,i) in menu" :key="i">
      <!-- {{ link }} -->
      <!-- {{ item.content }} -->
      <a
        :href="item.url"
        :target="item.target"
        :title="item.title"
        v-html="item.content"
      ></a>
    </v-tab>
  </v-tabs>
</template>


<script>
export default {
  name: "NavMenu",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
	  menu() {
		console.log(this.name);
      return this.$store.getters.menu({ name: this.name });
    },
  },
};
</script>
