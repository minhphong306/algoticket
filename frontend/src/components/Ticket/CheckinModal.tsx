"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import QRImage from "@/assets/images/item-background/qr-code.png";
import Image from "next/image";
import api from "@/axios.config";
import Loader from "../Loader";

const mockURL = "/qr-code.png";

async function generateQRCode(id: string = "1") {
  try {
    const response = await api.get(`/php-nft-ticket/api/gen_qr.php?id=${id}`);
    return response?.data?.data?.qr_url;
  } catch (error) {
    return mockURL;
  }
}

interface CardModalProps {
  show: boolean;
  onHide: () => void;
  ticketId: string;
}
const CheckinModal = (props: CardModalProps) => {
  const [loading, setLoading] = useState(false);
  const [qrURL, setQrURL] = useState("");
  // useEffect(() => {
  //   setLoading(true);
  //   generateQRCode(props.ticketId).then((response) => {
  //     setLoading(false);
  //     if (!response) return setQrURL(mockURL);
  //     return setQrURL(response);
  //   });
  // }, []);
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton></Modal.Header>

      <div className="modal-body space-y-20 pd-40">
        <h3>QR Code</h3>

        {loading ? (
          <Loader></Loader>
        ) : (
          <Image alt="" src={qrURL} width={500} height={500}></Image>
        )}
      </div>
    </Modal>
  );
};

export default CheckinModal;
