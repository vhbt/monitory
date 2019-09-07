import Config from 'react-native-config';
import * as ConfigCat from 'configcat-js';

const configCatClient = ConfigCat.createClientWithAutoPoll(
  Config.CONFIGCAT_API,
  {pollIntervalSeconds: 85},
);

export default configCatClient;
