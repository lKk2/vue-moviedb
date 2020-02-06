<template>
  <v-app>
    <!-- navbar -->
    <navbar :search="selectedMovieLength === 0" @query="query" @clear="clear" @logo="selectedMovie = {}" />
    <!-- /navbar -->
    <v-content>
      <v-container v-if="selectedMovieLength === 0">
        <v-layout>
          <!-- loading -->
          <v-row v-if="$store.state.isLoading">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-row>
          <!-- /loading -->
          <!-- movies searched -->
          <v-row v-if="Object.entries(searchResults).length">
            <movie-card v-for="movie in searchResults.results" :key="movie.id" :movie="movie" @selectedMovie="expandMovie" />
          </v-row>
          <!-- /movies searched -->
          <!-- most rated movies -->
          <v-row v-else>
            <movie-card v-for="movie in moviesResult" :key="movie.id" :movie="movie" @selectedMovie="expandMovie" />
            <pagination :value="moviesPage" :length="moviesLength" :totalVisible="'10'" @next="nextPage" />
          </v-row>
          <!-- /most rated movies -->
        </v-layout>
      </v-container>
    <!-- move details expansion -->
      <movie-expanded v-if="selectedMovieLength" :movie="selectedMovie" @back="selectedMovie = {}" />
    <!-- /move details expansion -->
    </v-content>
  </v-app>
</template>


<script>
import { mapMutations, mapGetters } from "vuex";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import MovieCard from "../components/MovieCard";
import MovieExpanded from "../components/MovieExpanded";
import moment from "moment";
import IMDB from "../api/imdb";

export default {
  components: {
    Pagination,
    MovieCard,
    Navbar,
    MovieExpanded
  },
  data: () => ({
    overlay: false,
    selectedMovie: {},
    searchResults: {},
    api: new IMDB()
  }),
  mounted() {
    this.fetchMovies({ isLoading: true, page: this.moviesPage });
  },
  methods: {
    ...mapMutations(["fetchMovies"]),
    ...mapGetters(["findMovie"]),
    formatReleaseDate(date) {
      return moment(date).format("MM/YY");
    },
    nextPage(page) {
      this.fetchMovies({ isLoading: true, page: page });
    },
    expandMovie(id) {
      this.selectedMovie =
        this.moviesResult.find(movie => movie.id === id) ||
        this.searchResults.results.find(movie => movie.id === id);
    },
    async query(query) {
      const movies = await this.api.searchMovies(query);
      this.searchResults = movies.data;
    },
    clear() {
      this.searchResults = {};
    }
  },
  computed: {
    ...mapGetters(["movies", "page"]),
    moviesResult() {
      return this.movies.results;
    },
    moviesPage() {
      return this.page || 1;
    },
    moviesLength() {
      return this.movies.total_pages;
    },
    selectedMovieLength() {
      return Object.entries(this.selectedMovie).length;
    }
  }
};
</script>