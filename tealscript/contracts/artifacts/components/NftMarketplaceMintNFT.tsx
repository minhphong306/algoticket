/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { NftMarketplace, NftMarketplaceClient } from '../contracts/DaoClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<NftMarketplaceMintNFT
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call mintNFT"
  typedClient={typedClient}
  name={name}
  url={url}
  eventId={eventId}
  nftType={nftType}
  payment={payment}
/>
*/
type NftMarketplaceMintNFTArgs = Dao['methods']['mintNFT(string,string,uint64,uint64,pay)uint64']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: NftMarketplaceClient
  name: NftMarketplaceMintNFTArgs['name']
  url: NftMarketplaceMintNFTArgs['url']
  eventId: NftMarketplaceMintNFTArgs['eventId']
  nftType: NftMarketplaceMintNFTArgs['nftType']
  payment: NftMarketplaceMintNFTArgs['payment']
}

const NftMarketplaceMintNFT = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling mintNFT`)
    await props.typedClient.mintNFT(
      {
        name: props.name,
        url: props.url,
        eventId: props.eventId,
        nftType: props.nftType,
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

export default NftMarketplaceMintNFT