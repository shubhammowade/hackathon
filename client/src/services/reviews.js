import axios from 'axios'
import { config } from './config'


export async function addreview( movie_id, review, rating, user_id, modified ) {
  try {
   
    const url = `${config.server}/review/addReview`


    const body = {  movie_id, review, rating, user_id, modified }


    const response = await axios.post(url, body)
console.log(response)
  
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}

export async function getAllReview( ) {
  try {

    const url = `${config.server}/review/getAllReview`

    const response = await axios.get(url)

    console.log(response.data)
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }

  //return review and rating
}
