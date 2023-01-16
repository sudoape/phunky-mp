import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import { web3ProviderURL } from 'consts'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

const web3 = new Web3(web3ProviderURL)

Sentry.init({
  dsn: 'https://e79c03ee5546443993243b72dd081237@o4504510885527552.ingest.sentry.io/4504510899683328',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.5,
})

const Application = () => {
  useEffect(() => {
    async function setProvider() {
      const provider = await detectEthereumProvider()
      if (provider) {
        await window.ethereum.enable()
      } else {
        alert('Connect to MetaMask to use this app')
      }
    }
    setProvider()
  }, [])

  return <App web3={web3} />
}

ReactDOM.render(
  // <React.StrictMode>
  <Application />,
  // </React.StrictMode>,
  document.getElementById('root')
)
