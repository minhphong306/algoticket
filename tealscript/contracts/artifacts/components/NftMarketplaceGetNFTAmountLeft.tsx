/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { NftMarketplace, NftMarketplaceClient } from '../contracts/DaoClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<NftMarketplaceGetNFTAmountLeft
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call getNFTAmountLeft"
  typedClient={typedClient}
  eventId={eventId}
  nftType={nftType}
/>
*/
type NftMarketplaceGetNFTAmountLeftArgs = Dao['methods']['getNFTAmountLeft(uint64,uint64)uint64']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: NftMarketplaceClient
  eventId: NftMarketplaceGetNFTAmountLeftArgs['eventId']
  nftType: NftMarketplaceGetNFTAmountLeftArgs['nftType']
}

const NftMarketplaceGetNFTAmountLeft = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling getNFTAmountLeft`)
    await props.typedClient.getNFTAmountLeft(
      {
        eventId: props.eventId,
        nftType: props.nftType,
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

export default NftMarketplaceGetNFTAmountLeft