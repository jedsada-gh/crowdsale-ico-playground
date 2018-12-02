import * as maxTokenConfig from './contracts/MaxTokenV1.json';

export default {
  address: maxTokenConfig.networks['1234567'].address,
  decimal: 18,
  name: 'MaxToken',
  symbol: 'MTC',
  icon: 'max.jpg',
  abi: maxTokenConfig.abi
};
