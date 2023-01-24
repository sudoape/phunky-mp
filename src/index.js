import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import Web3 from 'web3'
import { web3ProviderURL } from 'consts'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import { AccountContext } from 'context/AccountContext'
import detectEthereumProvider from '@metamask/detect-provider'
import {
  handleChainChanged,
  handleAccountsChanged,
  handleAccountDisconnect,
} from 'helpers/metamask'

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
  const [account, setAccount] = useState('0x0')

  useEffect(
    () => {
      if (!window.ethereum) {
        // Nothing to do here... no ethereum provider found
        console.log('Please install MetaMask!')
        return
      }
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts) =>
          handleAccountsChanged(accounts, account, setAccount)
        )
        .catch((err) => {
          // Some unexpected error.
          // For backwards compatibility reasons, if no accounts are available,
          // eth_accounts will return an empty array.
          console.error(err)
          setAccount('0x0')
        })
      window.ethereum.on('chainChanged', handleChainChanged)
      window.ethereum.on('accountsChanged', (accounts) => {
        handleAccountsChanged(accounts, account, setAccount)
      })
      // window.ethereum.on('connect', getAndSetAccount);
      window.ethereum.on('disconnect', () => {
        handleAccountDisconnect(setAccount)
      })
      return () => {
        // Return function of a non-async useEffect will clean up on component leaving screen, or from re-reneder to due dependency change
        window.ethereum.off('chainChanged', handleChainChanged)
        window.ethereum.off('accountsChanged', (accounts) => {
          handleAccountsChanged(accounts, account, setAccount)
        })
        window.ethereum.off('disconnect', () => {
          handleAccountDisconnect(setAccount)
        })
      }
    },
    [
      /* empty array to avoid re-request on every render, but if you have state related to a connect button, put here*/
    ]
  )

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      <App web3={web3} />
    </AccountContext.Provider>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <Application />
  // <React.StrictMode>
)
