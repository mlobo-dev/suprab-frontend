import axios from 'axios';

const httpClient = axios.create({
  // baseURL: 'http://ec2-3-134-98-29.us-east-2.compute.amazonaws.com:8080/'
  baseURL: 'http://localhost:8080/',
});

class ApiService {
  constructor(apiurl) {
    this.apiurl = apiurl;
  }

  post(url, objeto) {
    const requestUrl = `${this.apiurl}${url}`;
    return httpClient.post(requestUrl, objeto);
  }

  put(url, objeto) {
    const requestUrl = `${this.apiurl}${url}`;
    return httpClient.put(requestUrl, objeto);
  }

  delete(url) {
    const requestUrl = `${this.apiurl}${url}`;
    return httpClient.delete(requestUrl);
  }

  get(url) {
    const requestUrl = `${url}`;
    return httpClient.get(requestUrl);
  }
}
export default ApiService;
