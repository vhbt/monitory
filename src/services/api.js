import axios from 'axios';
import Config from 'react-native-config';

export const suap_api = axios.create({
  baseURL: 'https://suap.ifrn.edu.br/api/v2',
});

export const api = axios.create({
  baseURL: Config.RN_API_URL,
});
