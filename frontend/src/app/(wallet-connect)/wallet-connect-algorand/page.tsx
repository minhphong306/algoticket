"use client";
import React, { useEffect, useState } from "react";

import Header from "@/components/header/Header";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/footer/Footer";
import { useWallet } from "@txnlab/use-wallet";
import { useRouter } from "next/navigation";
import api from "@/axios.config";

const WalletConnect = () => {
  const { providers, isActive, activeAddress } = useWallet();
  const route = useRouter();

  const login = async () => {
    const { data } = await api.post("/php-nft-ticket/api/authen.php", {
      wallet_address: activeAddress,
    });

    localStorage.setItem("userId", data.data.id);
    return route.push("/");
  };

  useEffect(() => {
    if (isActive) {
      login();
    }
  }, [isActive]);

  return (
    <div>
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Connect Wallet</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>Connect Wallet</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tf-connect-wallet tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="sc-box-icon-inner style-2">
                {providers?.map((provider, index) => (
                  <div
                    onClick={provider.connect}
                    style={{ cursor: "pointer" }}
                    key={provider.metadata.id}
                    className="sc-box-icon"
                  >
                    <div className="img">
                      <Image
                        width={60}
                        height={60}
                        src={provider.metadata.icon}
                        alt={`${provider.metadata.name} icon`}
                      />
                    </div>
                    <h4 className="heading">{provider.metadata.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WalletConnect;
