/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { NftMarketplace, NftMarketplaceClient } from '../contracts/DaoClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<NftMarketplaceBuyNFT
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call buyNFT"
  typedClient={typedClient}
  orderId={orderId}
  payment={payment}
/>
*/
type NftMarketplaceBuyNFTArgs = Dao['methods']['buyNFT(uint64,pay)void']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: NftMarketplaceClient
  orderId: NftMarketplaceBuyNFTArgs['orderId']
  payment: NftMarketplaceBuyNFTArgs['payment']
}

const NftMarketplaceBuyNFT = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling buyNFT`)
    await props.typedClient.buyNFT(
      {
        orderId: props.orderId,
        payment: props.payment,
      },
      { sender },
    )
    setLoading(false)
  }

  return (
    <button className={props.buttonClass} onClick={callMethod}>
      {loading ? props.buttonLoadingNode || props.buttonNode : props.buttonNode}
    </button>
  )
}

export default NftMarketplaceBuyNFT