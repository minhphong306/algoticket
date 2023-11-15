/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { NftMarketplace, NftMarketplaceClient } from '../contracts/DaoClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<NftMarketplaceGetEventByNFT
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call getEventByNFT"
  typedClient={typedClient}
  nftIndex={nftIndex}
/>
*/
type NftMarketplaceGetEventByNFTArgs = Dao['methods']['getEventByNFT(uint64)uint64']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: NftMarketplaceClient
  nftIndex: NftMarketplaceGetEventByNFTArgs['nftIndex']
}

const NftMarketplaceGetEventByNFT = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling getEventByNFT`)
    await props.typedClient.getEventByNFT(
      {
        nftIndex: props.nftIndex,
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

export default NftMarketplaceGetEventByNFT