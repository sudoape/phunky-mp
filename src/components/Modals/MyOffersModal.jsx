import { Modal, Button } from 'antd'
import { localDirectory } from 'consts'
import { withdrawBidForPayc } from 'contracts/contractUtil'

const MyOffersModal = ({ nft, web3, visible, dispatch, delegate }) => {
  const imgLocation = localDirectory + nft.num + '.png'
  return (
    <Modal
      title={`My Offer`}
      open={visible}
      onCancel={() =>
        dispatch({
          type: 'SET_MY_OFFERS_MADE_MODAL_STATUS',
          value: false,
          nft: {},
        })
      }
      onOk={() => {}}
      okText="Rescind Offer"
      footer={[
        <Button
          onClick={() =>
            dispatch({
              type: 'SET_MY_OFFERS_MADE_MODAL_STATUS',
              value: false,
              nft: {},
            })
          }
        >
          Cancel
        </Button>,
        <Button
          onClick={async () => await withdrawBidForPayc(web3, nft.phunkyApeId)}
          type="primary"
        >
          Rescind Offer
        </Button>,
      ]}
    >
      <img
        alt="nft to rescind offer"
        src={imgLocation}
        style={{
          width: '250px',
          margin: 'auto',
          borderRadius: '10px',
          marginBottom: '15px',
        }}
      />
    </Modal>
  )
}

export default MyOffersModal
