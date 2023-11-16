import * as React from "react";
import { eventDetailType, ticketType } from "@/types/home.type";
import { useParams } from "next/navigation";
import api from "@/axios.config";
import algosdk from "algosdk";
import { useWallet } from "@txnlab/use-wallet";
import {
  algodClient,
  nftContractClient,
} from "@/components/AlgorandWalletProviders";
import * as algokit from "@algorandfoundation/algokit-utils";
import toast from "react-hot-toast";
import { convertArr } from "@/utils";

export const useDetailEvent = () => {
  const [detailEvent, setDetailEvent] = React.useState<eventDetailType>();
  const [ticketSelected, setTicketSelected] = React.useState<ticketType>({
    id: "",
    name: "",
    current_qty: 0,
    total_qty: 0,
    price: "",
    amount: "",
    created_at: "",
    event_id: "",
    image_url: "",
    status: "",
    updated_at: null,
    type: 0,
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { signer, activeAddress, isActive, activeAccount } = useWallet();
  const sender = { signer, addr: activeAddress! };

  let nft: bigint;

  const params = useParams();

  const getDetailEvent = async () => {
    const { data } = await api.get("/php-nft-ticket/api/event_detail.php", {
      params: {
        id: params.eventId,
      },
    });

    setDetailEvent(data?.data);
  };

  const mintNft = async () => {
    const bootstrapResult = await nftContractClient.mintNft(
      {
        name: ticketSelected?.name ?? "",
        url: ticketSelected?.image_url ?? "",
      },
      {
        sender: sender,
        sendParams: {
          fee: algokit.microAlgos(2000),
        },
      }
    );
    nft = bootstrapResult.return!.valueOf();
    console.log(nft);
    toast.success("done mint", {
      duration: 3000,
    });
  };

  const mapNftData = async () => {
    const index = await nftContractClient.getGlobalState();
    const nftIndex = index.nftIndex?.asNumber() ?? 0;
    const eventIndex = index.eventIndex?.asNumber() ?? 0;

    const template = new TextEncoder().encode("n");

    const combined = convertArr(template, algosdk.encodeUint64(nftIndex));

    try {
      await nftContractClient.mapNfTdata(
        {
          nft: nft,
          eventId: eventIndex - 1,
          nftType: Number(ticketSelected.type),
        },
        { boxes: [combined], sender }
      );
      toast.success("done mapnft", {
        duration: 3000,
      });
    } catch (e) {
      console.log("loi cmnr");
      console.warn(e);
      throw e;
    }
  };

  const optedIn = async () => {
    // opted in
    const registeredAsaOptInTxn =
      algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: activeAddress ?? "",
        to: activeAddress ?? "",
        amount: 0,
        suggestedParams: await algokit.getTransactionParams(
          undefined,
          algodClient
        ),
        assetIndex: Number(nft),
      });
    await algokit.sendTransaction(
      { from: sender, transaction: registeredAsaOptInTxn },
      algodClient
    );
    toast.success("done opted", {
      duration: 3000,
    });
  };

  const handleBuyNft = async () => {
    setIsLoading(true);
    await mintNft();
    await mapNftData();
    await optedIn();

    const appAddress =
      "23XFZ4LY7OE2GTVMGC2FT2OHG2OHVM6RY4GFIV6RUPR6IZ7GAPUFYGMJJI";
    const payment = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: activeAddress ?? "",
      to: appAddress,
      amount: 1,
      suggestedParams: await algokit.getTransactionParams(
        undefined,
        algodClient
      ),
    });
    try {
      await nftContractClient.buyNftFromEvent(
        { payment: payment, nft: nft },
        {
          sender: sender,
          sendParams: {
            fee: algokit.microAlgos(2000),
          },
        }
      );

      await api.post("/php-nft-ticket/api/mint_success.php", {
        ticket_id: ticketSelected?.id,
        user_id: localStorage.getItem("userId"),
        nft_id: Number(nft),
      });
      await getDetailEvent();

      toast.success("done buy", {
        duration: 3000,
      });
    } catch (e) {
      console.warn(e);
      toast.error(String(e), {
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getDetailEvent();
  }, []);

  return {
    detailEvent,
    handleBuyNft,
    setTicketSelected,
    ticketSelected,
    isLoading,
  };
};
