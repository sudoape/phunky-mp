import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import { web3ProviderURL } from 'consts'

const web3 = new Web3(web3ProviderURL)

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
