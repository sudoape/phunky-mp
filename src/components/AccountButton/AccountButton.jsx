import { getEllipsisTxt } from 'helpers/formatters'
import styled from '@emotion/styled'
import { PrimaryButton, SecondaryButton } from '../../uikit/Buttons/Buttons'
import { withdraw } from 'contracts/contractUtil'
import { cryptoPhunksMarketAbi } from 'contracts/abi/cryptoPhunksMarketABI'
import { useEffect, useState } from 'react'
import { paycMarketPlaceContractAddr } from 'consts'

function AccountButton({ web3 }) {
  const walletAddress = window.ethereum
    ? window.ethereum.selectedAddress
    : 'N/A'

  const [withdrawAmt, setWithdrawAmt] = useState('')

  useEffect(() => {
    const updateWithdrawAmt = async () => {
      const contract = new web3.eth.Contract(
        cryptoPhunksMarketAbi,
        paycMarketPlaceContractAddr
      )
      const amt = await contract.methods
        .pendingWithdrawals(window.ethereum.selectedAddress)
        .call()
      setWithdrawAmt(web3.utils.fromWei(amt, 'ether') + ' ≡')
    }
    updateWithdrawAmt()
  })
  return (
    <AccountContainer>
      <PrimaryButton
        onClick={() => {}}
        text={walletAddress == 'N/A' ? 'N/A' : getEllipsisTxt(walletAddress, 4)}
      ></PrimaryButton>
      <SecondaryButton
        text={`🚰 ${withdrawAmt}`}
        onClick={async () => await withdraw(web3)}
      ></SecondaryButton>
    </AccountContainer>
  )
}

const AccountContainer = styled.div`
  display: flex;
  width: 100%;
`

export default AccountButton
