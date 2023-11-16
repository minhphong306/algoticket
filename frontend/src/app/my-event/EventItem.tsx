"use client";
import { Event } from "@/types";
import api from "@/axios.config";
import { useEffect, useRef, useState } from "react";
import style from "./scanner.module.scss";
import toast, { Toaster } from "react-hot-toast";

export default function EventComponent({ event }: { event: Event }) {
  const html5QrCode = useRef<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (html5QrCode.current) return;
    import("html5-qrcode").then(
      ({ Html5Qrcode, Html5QrcodeSupportedFormats }) => {
        html5QrCode.current = new Html5Qrcode("reader", {
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
          verbose: false,
        });
      }
    );
  });

  async function handleScanTicket() {
    if (!html5QrCode.current) return;
    setIsScanning(true);
    requestAnimationFrame(() => {
      const qrCodeSuccessCallback = async (
        decodedText: any,
      ) => {
        await stopScanning();
        toast("Checking...");
        const { success } = await checkin(decodedText);
        toast.dismiss()
        if (success) {
          toast.success('Check In Success!')
        } else {
          toast.error('Already Checked In!')
        }
      };
      const qrCodeErrorCallback = async (decodedText: string) => {
      };
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };

      requestAnimationFrame(() => {
        // If you want to prefer front camera
        html5QrCode.current.start(
          { facingMode: "environment" },
          config,
          qrCodeSuccessCallback,
          qrCodeErrorCallback
        );
      });
    });
  }

  async function checkin(code: string) {
    try {
      const response = await api.post(`/php-nft-ticket/api/checkin.php`, {
        code,
      });
      return response.data?.data;
    } catch (error) {
      return {
        success: true,
      };
    }
  }

  async function stopScanning() {
    await html5QrCode.current.stop();
    await html5QrCode.current.clear();
    setIsScanning(false);
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 5000,
          },
        }}
      />
      <div
        className={`${style["scanner-wrapper"]} ${
          isScanning ? style["scanner-wrapper--active"] : ""
        }`}
      >
        <div className={style["reader"]} id="reader"></div>
        <button
          className="sc-button style-place-bid style note fl-button pri-3"
          onClick={stopScanning}
        >
          <span>Stop Scanning</span>
        </button>
      </div>
      <div className="col-xl-3 col-lg-4 col-md-6 col-12 ticket">
        <div className="sc-card-product explode ">
          <div className="card-media">
            <img src={event.image_url} width={400} height={400} alt="event" />
          </div>
          <div className="card-title mg-bt-16">
            <h5>{event.name}</h5>
          </div>
          <div className="meta-info">
            <p>{event.description}</p>
          </div>
          <div className="card-bottom style-explode">
            <button
              className="sc-button style-place-bid style bag fl-button pri-3"
              onClick={handleScanTicket}
            >
              <span> SCAN TICKET </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
