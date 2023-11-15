/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { NftMarketplace, NftMarketplaceClient } from '../contracts/DaoClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<NftMarketplaceCreateEvent
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call createEvent"
  typedClient={typedClient}
  name={name}
  nft1={nft1}
  nft2={nft2}
  nft3={nft3}
  nft1price={nft1price}
  nft2price={nft2price}
  nft3price={nft3price}
/>
*/
type NftMarketplaceCreateEventArgs = Dao['methods']['createEvent(string,uint64,uint64,uint64,uint64,uint64,uint64)void']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: NftMarketplaceClient
  name: NftMarketplaceCreateEventArgs['name']
  nft1: NftMarketplaceCreateEventArgs['nft1']
  nft2: NftMarketplaceCreateEventArgs['nft2']
  nft3: NftMarketplaceCreateEventArgs['nft3']
  nft1price: NftMarketplaceCreateEventArgs['nft1price']
  nft2price: NftMarketplaceCreateEventArgs['nft2price']
  nft3price: NftMarketplaceCreateEventArgs['nft3price']
}

const NftMarketplaceCreateEvent = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling createEvent`)
    await props.typedClient.createEvent(
      {
        name: props.name,
        nft1: props.nft1,
        nft2: props.nft2,
        nft3: props.nft3,
        nft1price: props.nft1price,
        nft2price: props.nft2price,
        nft3price: props.nft3price,
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

export default NftMarketplaceCreateEvent