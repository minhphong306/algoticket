"use client";

import React from "react";
import {
  WalletProvider,
  useInitializeProviders,
  PROVIDER_ID,
} from "@txnlab/use-wallet";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import { PeraWalletConnect } from "@perawallet/connect";
import { DaffiWalletConnect } from "@daffiwallet/connect";
import algosdk from "algosdk";
import { AppConfig } from "../../app.config";
import { NftMarketplaceClient } from "@/contracts/NftMarketplaceClient";

export const algodClient = new algosdk.Algodv2(
  AppConfig.algorandToken ?? "",
  AppConfig.algorandEndpoint ?? "",
  AppConfig.algorandPort ?? ""
);

export const nftContractClient = new NftMarketplaceClient(
  {
    resolveBy: "id",
    id: 479675445,
  },
  algodClient
);

export function AlgorandWalletProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const providers = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
      { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
    ],
    nodeConfig: {
      network: AppConfig.algorandNetwork ?? "",
      nodeServer: AppConfig.algorandEndpoint ?? "",
      nodeToken: AppConfig.algorandToken ?? "",
      nodePort: AppConfig.algorandPort ?? "",
    },
  });

  return <WalletProvider value={providers}>{children}</WalletProvider>;
}
