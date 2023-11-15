/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { NftMarketplace, NftMarketplaceClient } from '../contracts/DaoClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<NftMarketplaceGetNFTAsset
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call getNFTAsset"
  typedClient={typedClient}
  nftIndex={nftIndex}
/>
*/
type NftMarketplaceGetNFTAssetArgs = Dao['methods']['getNFTAsset(uint64)uint64']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: NftMarketplaceClient
  nftIndex: NftMarketplaceGetNFTAssetArgs['nftIndex']
}

const NftMarketplaceGetNFTAsset = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling getNFTAsset`)
    await props.typedClient.getNFTAsset(
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

export default NftMarketplaceGetNFTAsset