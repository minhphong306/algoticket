/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { NftMarketplace, NftMarketplaceClient } from '../contracts/DaoClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<NftMarketplaceGetNFTType
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call getNFTType"
  typedClient={typedClient}
  nftIndex={nftIndex}
/>
*/
type NftMarketplaceGetNFTTypeArgs = Dao['methods']['getNFTType(uint64)uint64']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: NftMarketplaceClient
  nftIndex: NftMarketplaceGetNFTTypeArgs['nftIndex']
}

const NftMarketplaceGetNFTType = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling getNFTType`)
    await props.typedClient.getNFTType(
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

export default NftMarketplaceGetNFTType