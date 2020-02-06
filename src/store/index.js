import Vue from 'vue'
import Vuex from 'vuex'
import IMDB from '../api/imdb'

Vue.use(Vuex)

const api = new IMDB()

const state = {
  isLoading: false,
  movies: {},
  selectedMovie: {},
}

const mutations = {
  async fetchMovies(state, payload) {
    state.isLoading = true
    try {
      const movies = await api.getMovies(payload.page)
      state.movies = movies.data
      state.page = payload.page
      state.isLoading = false
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('There was an error fetching the movies: ', err.message)
    }
  },
  async fetchMovie(state, payload) {
    state.isLoading = true
    try {
      const movie = await api.getMovie(payload)
      state.selectedMovie = movie.data
      state.isLoading = false
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('There was an error fetching the movie: ', err.message)
    }
  },
}

const getters = {
  movies: state => state.movies,
  page: state => state.movies.page,
  movie: state => state.selectedMovie
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})