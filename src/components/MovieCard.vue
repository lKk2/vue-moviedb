<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card class="mx-2 my-2">
        <!-- movie image -->
        <v-img v-if="movie.poster_path" :src="`http://image.tmdb.org/t/p/w185/${movie.poster_path}`"></v-img>
        <!-- /movie image -->
        <v-fade-transition>
          <v-overlay
            v-if="hover"
            absolute
            color="#036358"
          >
          <!-- movie infos -->
            <div class="d-flex flex-column">
              <span class="subtitle-2 mb-4 text-center font-weight-bold">{{ movie.title }}</span>
              <span class="ml-2 body-2 font-weight-bold">Released {{ releasedDate }}</span>
              <span class="ml-2 mb-3 caption font-weight-bold">Stars: {{ movie.vote_average }}/10</span>
            <v-btn @click="selectMovie(movie.id)">See more info</v-btn>
            </div>
          <!-- /movie infos -->
          </v-overlay>
        </v-fade-transition>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import moment from "moment";
export default {
  props: ["movie"],
  data: () => ({
    overlay: false
  }),
  computed: {
    releasedDate() {
      return moment(this.movie.release_date).format("MM/YY");
    }
  },
  methods: {
    selectMovie(id) {
      this.$emit("selectedMovie", id);
    }
  }
};
</script>

<style lang="scss" scoped>
.subtitle-2 {
  max-width: 180px;
}
</style>