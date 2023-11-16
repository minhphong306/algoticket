"use client";

import Link from "next/link";
import * as React from "react";
import { Modal } from "react-bootstrap";
import { algodClient, nftContractClient } from "../AlgorandWalletProviders";
import algosdk from "algosdk";
import * as algokit from "@algorandfoundation/algokit-utils";
import { useWallet } from "@txnlab/use-wallet";
import toast from "react-hot-toast";
import { convertArr } from "@/utils";
import { ButtonLoading } from "../buttonLoading";
import { useRouter } from "next/navigation";
import api from "@/axios.config";
interface CardModalProps {
  show: boolean;
  onHide: () => void;
  nftId?: string;
  idCard?: string;
}
const SellModal = (props: CardModalProps) => {
  const [price, setPrice] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const route = useRouter();
  const { signer, activeAddress, isActive, activeAccount } = useWallet();
  const sender = { signer, addr: activeAddress! };
  const appAddress =
    "23XFZ4LY7OE2GTVMGC2FT2OHG2OHVM6RY4GFIV6RUPR6IZ7GAPUFYGMJJI";

  const onchangeInput = (e: any) => {
    setPrice(e.target.value);
  };

  const handleSellNft = async () => {
    try {
      setIsLoading(true);
      const index = await nftContractClient.getGlobalState();
      const orderIndex = index.orderIndex?.asNumber() ?? 0;

      const template = new TextEncoder().encode("o");
      const combined = convertArr(template, algosdk.encodeUint64(orderIndex));

      const axfer = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: activeAddress ?? "",
        to: appAddress,
        closeRemainderTo: appAddress,
        amount: 1,
        assetIndex: Number(props.nftId),
        suggestedParams: await algokit.getTransactionParams(
          undefined,
          algodClient
        ),
      });
      await nftContractClient.listingNft(
        {
          nft: Number(props.nftId),
          price: Number(price),
          axfer,
        },
        { sender: sender, boxes: [combined] }
      );

      await api.get("/php-nft-ticket/api/update_status.php", {
        params: {
          id: Number(props.idCard),
          status: 2,
        },
      });
      toast.success("done listing", {
        duration: 3000,
      });
    } catch (e) {
      console.warn(e);
      throw e;
    } finally {
      setIsLoading(false);
      props.onHide();
      route.push("/me");
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton></Modal.Header>

      <div className="modal-body space-y-20 pd-40">
        <h3>List NFT</h3>

        <p>Price (ALGO)</p>
        <input
          type="number"
          className="form-control"
          value={price}
          onChange={onchangeInput}
        />

        {isLoading ? (
          <ButtonLoading />
        ) : (
          <button className="btn btn-primary" onClick={handleSellNft}>
            Place To MarketPlace
          </button>
        )}
      </div>
    </Modal>
  );
};

export default SellModal;
