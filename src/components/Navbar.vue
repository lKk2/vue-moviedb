<template>
  <v-app-bar color="accent-4" dense dark>
    <!-- logo -->
    <v-toolbar-title class="cursor" @click="$emit('logo')">
      Vuetifilm
    </v-toolbar-title>
    <!-- /logo -->
    <v-spacer></v-spacer>
    <!-- search box -->
    <v-text-field
      v-if="search"
      class="mt-6"
      prepend-icon="mdi-magnify"
      solo
      dense
      v-model="query"
      @keyup="$emit('query', query)"
      clearable
      rounded
      :clear-icon-cb="$emit('clear')"
      placeholder="Search">
    </v-text-field>
    <!-- /search box -->
  </v-app-bar>
</template>

<script>
export default {
  props: ["search"],
  data: () => ({
    query: ""
  })
};
</script>

<style lang="scss" scoped>
.v-input {
  max-width: 300px !important;
}
.cursor {
  cursor: pointer;
}
.v-toolbar {
  max-height: 48px;
}
</style>