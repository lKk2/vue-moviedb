<template>
  <v-pagination
    :value="value"
    circle
    prev-icon="mdi-menu-left"
    next-icon="mdi-menu-right"
    :total-visible="totalVisible"
    @input="next"
    :length="length">
  </v-pagination>
</template>

<script>
export default {
  props: ["value", "length", "totalVisible"],
  methods: {
    next(page) {
      this.$emit("next", page);
    }
  }
};
</script>