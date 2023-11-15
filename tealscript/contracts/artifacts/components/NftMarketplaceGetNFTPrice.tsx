/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { NftMarketplace, NftMarketplaceClient } from '../contracts/DaoClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<NftMarketplaceGetNFTPrice
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call getNFTPrice"
  typedClient={typedClient}
  eventId={eventId}
  nftType={nftType}
/>
*/
type NftMarketplaceGetNFTPriceArgs = Dao['methods']['getNFTPrice(uint64,uint64)uint64']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: NftMarketplaceClient
  eventId: NftMarketplaceGetNFTPriceArgs['eventId']
  nftType: NftMarketplaceGetNFTPriceArgs['nftType']
}

const NftMarketplaceGetNFTPrice = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling getNFTPrice`)
    await props.typedClient.getNFTPrice(
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

export default NftMarketplaceGetNFTPrice