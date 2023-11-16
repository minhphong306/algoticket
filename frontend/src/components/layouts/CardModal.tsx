import Link from "next/link";
import React from "react";
import { Modal } from "react-bootstrap";
interface CardModalProps {
  show: boolean;
  onHide: () => void;
}
const CardModal = (props: CardModalProps) => {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton></Modal.Header>

      <div className="modal-body space-y-20 pd-40">
        <h3>Place a Bid</h3>
        <p className="text-center">
          You must bid at least{" "}
          <span className="price color-popup">4.89 ETH</span>
        </p>
        <input type="text" className="form-control" placeholder="00.00 ETH" />
        <p>
          Enter quantity. <span className="color-popup">5 available</span>
        </p>
        <input type="number" className="form-control" placeholder="1" />
        <div className="hr"></div>
        <div className="d-flex justify-content-between">
          <p> You must bid at least:</p>
          <p className="text-right price color-popup"> 4.89 ETH </p>
        </div>
        <div className="d-flex justify-content-between">
          <p> Service free:</p>
          <p className="text-right price color-popup"> 0,89 ETH </p>
        </div>
        <div className="d-flex justify-content-between">
          <p> Total bid amount:</p>
          <p className="text-right price color-popup"> 4 ETH </p>
        </div>
        <Link
          href="/wallet-connect-algorand"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#popup_bid_success"
          data-dismiss="modal"
          aria-label="Close"
        >
          {" "}
          Place a bid
        </Link>
      </div>
    </Modal>
  );
};

export default CardModal;
