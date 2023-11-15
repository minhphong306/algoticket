/* eslint-disable no-console */
import { ReactNode, useState } from 'react'
import { NftMarketplace, NftMarketplaceClient } from '../contracts/DaoClient'
import { useWallet } from '@txnlab/use-wallet'

/* Example usage
<NftMarketplaceGetEventName
  buttonClass="btn m-2"
  buttonLoadingNode={<span className="loading loading-spinner" />}
  buttonNode="Call getEventName"
  typedClient={typedClient}
  eventId={eventId}
/>
*/
type NftMarketplaceGetEventNameArgs = Dao['methods']['getEventName(uint64)string']['argsObj']

type Props = {
  buttonClass: string
  buttonLoadingNode?: ReactNode
  buttonNode: ReactNode
  typedClient: NftMarketplaceClient
  eventId: NftMarketplaceGetEventNameArgs['eventId']
}

const NftMarketplaceGetEventName = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const sender = { signer, addr: activeAddress! }

  const callMethod = async () => {
    setLoading(true)
    console.log(`Calling getEventName`)
    await props.typedClient.getEventName(
      {
        eventId: props.eventId,
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

export default NftMarketplaceGetEventName