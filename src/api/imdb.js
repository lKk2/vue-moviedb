import axios from 'axios'
import config from './config'

/**
 * @class IMDB
 * @function getMovies returns a list of movies sorted by popularity
 * @function searchMovies return a list of movies found on search query
 * @note config.js is not the best practice, this sensitive informations should be on a .env file
 */
class IMDB {
  async getMovies(page = 1) {
    const apiUrl = `https://api.themoviedb.org/3/${config.mode}/movie?api_key=${config.apiKey}&language=${config.lang}&sort_by${config.sortBy}&include_adult=${config.includeAdult}&include_video=${config.includeVideo}&page=${page}`
    return await axios.get(apiUrl)
  }

  async searchMovies(query, page = 1) {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${config.apiKey}&language=${config.lang}&query=${query}&include_adult=${config.includeAdult}&page=${page}`
    return await axios.get(apiUrl)
  }
}

export default IMDB