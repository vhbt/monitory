import axios from 'axios';
import Config from 'react-native-config';

export const suap_api = axios.create({
  baseURL: 'https://suap.ifrn.edu.br/api/v2',
});

export const api = axios.create({
  baseURL: Config.API_URL,
  timeout: 15000,
});

export const onesignal = axios.create({
  baseURL: 'https://onesignal.com/api/v1',
  headers: {
    Authorization: `BASIC ${Config.ONESIGNAL_KEY}`,
  },
});
