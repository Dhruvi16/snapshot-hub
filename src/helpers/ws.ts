import { WebSocketProvider } from '@ethersproject/providers';

const wsProvider = new WebSocketProvider(
  `wss://eth-ropsten.ws.alchemyapi.io/v2/${process.env.VUE_APP_ALCHEMY_KEY}`
);

// const wsProvider = new WebSocketProvider(
//   `wss://eth-mainnet.ws.alchemyapi.io/v2/${process.env.VUE_APP_ALCHEMY_KEY}`
// );

export default wsProvider;
