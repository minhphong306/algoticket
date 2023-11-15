/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { NftMarketplace, NftMarketplaceClient } from '../contracts/DaoClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<NftMarketplaceListingNFT
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call listingNFT"
  typedClient={typedClient}
  nft={nft}
  price={price}
  axfer={axfer}
/>
*/
type NftMarketplaceListingNFTArgs = Dao['methods']['listingNFT(asset,uint64,axfer)void']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: NftMarketplaceClient
  nft: NftMarketplaceListingNFTArgs['nft']
  price: NftMarketplaceListingNFTArgs['price']
  axfer: NftMarketplaceListingNFTArgs['axfer']
}

const NftMarketplaceListingNFT = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling listingNFT`)
    await props.typedClient.listingNFT(
      {
        nft: props.nft,
        price: props.price,
        axfer: props.axfer,
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

export default NftMarketplaceListingNFT