/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { NftMarketplace, NftMarketplaceClient } from '../contracts/DaoClient'
import { useWallet } from '@txnlab/use-wallet'
import algosdk from 'algosdk'
import * as algokit from '@algorandfoundation/algokit-utils'
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
  algodClient: algosdk.Algodv2
}

const NftMarketplaceMintNFT = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }
  

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling mintNFT`)

    const { appAddress } = await props.typedClient.appClient.getAppReference()

    const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: sender.addr,
      to: appAddress,
      amount: 15_700,
      suggestedParams: await algokit.getTransactionParams(undefined, props.algodClient),
    })

    await props.typedClient.mintNFT(
      {
        name: props.name,
        url: props.url,
        eventId: props.eventId,
        nftType: props.nftType,
        payment: paymentTxn,
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