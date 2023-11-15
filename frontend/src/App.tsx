import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { DaffiWalletConnect } from '@daffiwallet/connect'
import { PeraWalletConnect } from '@perawallet/connect'
import { PROVIDER_ID, ProvidersArray, WalletProvider, useInitializeProviders, useWallet } from '@txnlab/use-wallet'
import algosdk from 'algosdk'
import { SnackbarProvider } from 'notistack'
import { useState, useEffect } from 'react'
import ConnectWallet from './components/ConnectWallet'
import Transact from './components/Transact'
import { getAlgodConfigFromViteEnvironment, getKmdConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'
import * as algokit from '@algorandfoundation/algokit-utils'
import NftMarketplaceCreateEvent from './components/NftMarketplaceCreateEvent'
import { NftMarketplaceClient } from './contracts/NftMarketplaceClient'
import NftMarketplaceMintNFT from './components/NftMarketplaceMintNFT'
let providersArray: ProvidersArray
if (import.meta.env.VITE_ALGOD_NETWORK === '') {
  const kmdConfig = getKmdConfigFromViteEnvironment()
  providersArray = [
    {
      id: PROVIDER_ID.KMD,
      clientOptions: {
        wallet: kmdConfig.wallet,
        password: kmdConfig.password,
        host: kmdConfig.server,
        token: String(kmdConfig.token),
        port: String(kmdConfig.port),
      },
    },
  ]
} else {
  providersArray = [
    { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
    { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
    { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
    { id: PROVIDER_ID.EXODUS },
    // If you are interested in WalletConnect v2 provider
    // refer to https://github.com/TxnLab/use-wallet for detailed integration instructions
  ]
}

export default function App() {
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false)
  const [openDemoModal, setOpenDemoModal] = useState<boolean>(false)
  const { activeAddress, signer } = useWallet()
  const [eventIndex, setEventIndex] = useState<number>(0)
  const appID = 1051;
  let eventIndex2 = 0;
  const name = "t1 vs weibo";
  const nft1 = 100;
  const nft2 = 50;
  const nft3 = 20;
  const nft1price = 10;
  const nft2price = 20;
  const nft3price = 30;
  const url = "https://google.com";
  const nftType = 1;
  const setState = async () => {
    try {
      const state = await typedClient.getGlobalState()
      setEventIndex(state.eventIndex!.asNumber);
      eventIndex2 = eventIndex + 10;
      console.log(eventIndex2);
    } catch(e) {
      console.log(e);
    }
  }
  
  useEffect(() => {
    setState()
  }, [appID])

  const toggleWalletModal = () => {
    setOpenWalletModal(!openWalletModal)
  }

  const toggleDemoModal = () => {
    setOpenDemoModal(!openDemoModal)
  }

  const algodConfig = getAlgodConfigFromViteEnvironment()
  const algodClient = algokit.getAlgoClient({
    server: algodConfig.server,
    port: algodConfig.port,
    token: algodConfig.token
  })

  const typedClient = new NftMarketplaceClient(
    {
      resolveBy: 'id',
      id: appID,
    },
    algodClient,
  )
  
  const walletProviders = useInitializeProviders({
    providers: providersArray,
    nodeConfig: {
      network: algodConfig.network,
      nodeServer: algodConfig.server,
      nodePort: String(algodConfig.port),
      nodeToken: String(algodConfig.token),
    },
    algosdkStatic: algosdk,
  })

  return (
    <SnackbarProvider maxSnack={3}>
      <WalletProvider value={walletProviders}>
        <div className="hero min-h-screen bg-teal-400">
          <div className="hero-content text-center rounded-lg p-6 max-w-md bg-white mx-auto">
            <div className="max-w-md">
              <h1 className="text-4xl">
                Welcome to <div className="font-bold">AlgoKit 🙂</div>
              </h1>
              <p className="py-6">
                This starter has been generated using official AlgoKit React template. Refer to the resource below for next steps.
              </p>

              <div className="grid">
                <button data-test-id="connect-wallet" className="btn m-2" onClick={toggleWalletModal}>
                  Wallet Connection
                </button>
                <div className="divider" />
                {activeAddress && (
                  <button data-test-id="transactions-demo" className="btn m-2" onClick={toggleDemoModal}>
                    Transactions Demo
                  </button>
                )}
              </div>
              
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
                eventIndex={eventIndex2}
              />
              <NftMarketplaceMintNFT
                buttonClass="btn m-2"
                buttonLoadingNode={<span className="loading loading-spinner" />}
                buttonNode="Call mintNFT"
                typedClient={typedClient}
                name={name}
                url={url}
                eventId={eventIndex}
                nftType={nftType}
                algodClient={algodClient}
              />
              <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
              <Transact openModal={openDemoModal} setModalState={setOpenDemoModal} />
            </div>
          </div>
        </div>
      </WalletProvider>
    </SnackbarProvider>
  )
}
