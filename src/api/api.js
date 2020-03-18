import axios from 'axios';
 
const instance = axios.create({
  timeout: 10000,
   headers: {
    'Content-Type': "application/json;charset=utf-8"
  }
});
 
export default {
  addQuestion ( data ) {
    return instance.post('http://118.178.196.114:8081/add', data);
  }
};