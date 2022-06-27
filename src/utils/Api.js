import axios from 'axios';
import {BASE_URL} from './BaseUrl';

const Api = axios.create({
  baseURL: BASE_URL,
});

export default Api;
