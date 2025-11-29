import axios from 'axios'
import { config } from './config'

export async function register( first_name, last_name, email, password, mobile , birth) {
  try {
    // url to send the request
    const url = `${config.server}/user/register`

    // create a body object
    const body = { first_name, last_name, email, password, mobile , birth }

    // send POST request
    const response = await axios.post(url, body)

    // return response body
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}
export async function login(email, password) {
  try {
    // create url
    const url = `${config.server}/user/login`

    // create body
    const body = { email, password }

    // send the POST request
    const response = await axios.post(url, body)

    // return response body
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}

