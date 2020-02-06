<template>
  <v-container>
    <v-layout>
      <v-row>
        <!-- floating icon -->
        <v-btn absolute dark fab text top left class="mt-10" color="indigo accent-2" @click="$emit('back')">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <!-- /floating icon -->
        <v-col>
          <v-img v-if="movie.poster_path" :src="`http://image.tmdb.org/t/p/w500/${movie.poster_path}`"></v-img>
        </v-col>
        <v-col>
          <v-row class="flex-column">
            <!-- movie infos -->
            <v-text-field outlined label="English Movie Title" v-model="selectedMovie.title" class="mt-2 mb--3" />
            <span class="ml-1">Rating:</span>
            <v-rating class="mb-4" v-model="selectedMovie.vote_average" :length="10"></v-rating>
            <v-text-field type="date" outlined label="Released Date" v-model="selectedMovie.release_date" />
            <v-textarea outlined :auto-grow="true" label="Overview" v-model="selectedMovie.overview" />
            <v-text-field type="number" outlined label="Populatiry" v-model="selectedMovie.popularity" />
            <v-text-field type="number" outlined label="Vote Count" v-model="selectedMovie.vote_count" />
            <!-- /movie infos -->
          </v-row>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["movie"],
  data: () => ({
    selectedMovie: {}
  }),
  watch: {
    movie: {
      handler() {
        this.selectedMovie = this.movie;
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.mb--3 {
  margin-bottom: -15px !important;
}
</style>