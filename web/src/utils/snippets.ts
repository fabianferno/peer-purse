export const WEB3AUTH_SNIPPET = `import { Web3AuthModalPack } from '@safe-global/auth-kit'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'

const options: Web3AuthOptions = {
  clientId: process.env.REACT_APP_WEB3AUTH_CLIENT_ID,
  web3AuthNetwork: 'testnet',
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: chainId,
    rpcTarget: rpcTarget
  },
  uiConfig: {
    theme: 'dark',
    loginMethodsOrder: ['google', 'facebook']
  }
}

const modalConfig = {
  [WALLET_ADAPTERS.TORUS_EVM]: {
    label: 'torus',
    showOnModal: false
  },
  [WALLET_ADAPTERS.METAMASK]: {
    label: 'metamask',
    showOnDesktop: true,
    showOnMobile: false
  }
}

const openloginAdapter = new OpenloginAdapter({
  loginSettings: {
    mfaLevel: 'mandatory'
  },
  adapterSettings: {
    uxMode: 'popup',
    whiteLabel: {
      name: 'Safe'
    }
  }
})

const web3AuthModalPack = new Web3AuthModalPack({
  txServiceUrl: 'https://safe-transaction-{chain}.safe.global',
})

await web3AuthModalPack.init({
  options,
  adapters: [openloginAdapter],
  modalConfig
})

// Allow to login and get the derived EOA
await web3AuthModalPack.signIn()

// Logout
await web3AuthModalPack.signOut()

// Get the provider
web3AuthModalPack.getProvider()
`;

export const STRIPE_SNIPPET = `import { StripePack } from '@safe-global/onramp-kit'

const stripePack = new StripePack({
  stripePublicKey: process.env.REACT_APP_STRIPE_PUBLIC_KEY,
  onRampBackendUrl: process.env.REACT_APP_STRIPE_BACKEND_BASE_URL
})

await stripePack.init()

const sessionData = await stripePack.open({
  element: '#stripe-root',
  theme: 'light',
  defaultOptions: {
    transaction_details: {
      wallet_address: walletAddress,
      supported_destination_networks: ['ethereum', 'polygon'],
      supported_destination_currencies: ['usdc'],
      lock_wallet_address: true
    },
    customer_information: {
      email: 'john@doe.com'
    }
  }
}))

stripePack.subscribe('onramp_ui_loaded', () => {
  console.log('UI loaded')
})

stripePack.subscribe('onramp_session_updated', (e) => {
  console.log('Session Updated', e.payload)
})
`;

export const GELATO_SNIPPET = `import { GelatoRelayPack } from '@safe-global/relay-kit'

const relayPack = new GelatoRelayPack()

relayPack.relayTransaction({
  target: '0x...', // the Safe address
  encodedTransaction: '0x...', // Encoded Safe transaction data
  chainId: 5
})`;
