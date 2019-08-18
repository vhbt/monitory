import axios from 'axios';

export const suap_api = axios.create({
  baseURL: 'https://suap.ifrn.edu.br/api/v2',
});

export const api = axios.create({
  baseURL: 'http://10.0.3.2:3333',
});
