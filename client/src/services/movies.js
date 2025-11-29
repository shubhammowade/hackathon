import axios from 'axios'
import { config } from './config'

export async function displayallmovies() {
  try {

    const url = `${config.server}/movie/getMovies`
    const response = await axios.get(url)

    // return response body
    console.log(response);
    return response.data

  } catch (ex) {
    console.log(`exception: `, ex)
  }
}