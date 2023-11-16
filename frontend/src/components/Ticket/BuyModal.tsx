import Link from "next/link";
import React from "react";
import { Modal } from "react-bootstrap";
import * as algokit from "@algorandfoundation/algokit-utils";
import { algodClient, nftContractClient } from "../AlgorandWalletProviders";
import algosdk from "algosdk";
import toast from "react-hot-toast";
import { useWallet } from "@txnlab/use-wallet";
interface CardModalProps {
  show: boolean;
  onHide: () => void;
}
const BuyModal = (props: CardModalProps) => {
  const { signer, activeAddress, isActive, activeAccount } = useWallet();
  const sender = { signer, addr: activeAddress! };
  const appAddress =
    "23XFZ4LY7OE2GTVMGC2FT2OHG2OHVM6RY4GFIV6RUPR6IZ7GAPUFYGMJJI";

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
        assetIndex: 479741082,
      });

    await algokit.sendTransaction(
      { from: sender, transaction: registeredAsaOptInTxn },
      algodClient
    );

    toast.success("done optedIn", {
      duration: 3000,
    });
  };

  const handleBuyNft = async () => {
    await optedIn();

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
      await nftContractClient.buyNftFromMarketplace(
        {
          orderId: 0,
          payment,
          nft: 479741082,
        },
        {
          sender,
          sendParams: {
            fee: algokit.microAlgos(2000),
          },
        }
      );
      toast.success("done buy", {
        duration: 3000,
      });
    } catch (e) {
      console.warn(e);
      throw e;
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton></Modal.Header>

      <div className="modal-body space-y-20 pd-40">
        <h3>Buy Ticket</h3>

        <p>Price (ALGO)</p>
        <input
          type="number"
          disabled={true}
          className="form-control"
          placeholder="1"
        />
        {/* <button className="btn btn-primary" onClick={optedIn}>
          opted in Ticket
        </button> */}
        <button className="btn btn-primary mt-3" onClick={handleBuyNft}>
          Buy Ticket
        </button>
      </div>
    </Modal>
  );
};

export default BuyModal;
