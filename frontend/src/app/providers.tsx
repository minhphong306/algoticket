"use client";

import { AlgorandWalletProviders } from "@/components/AlgorandWalletProviders";
import ScrollToTop from "@/components/ScrollToTop";
import { ReduxProviders } from "@/redux/provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

type Props = {
  children?: React.ReactNode;
};

const queryClient = new QueryClient();

export const Providers = ({ children }: Props) => {
  return (
    <AlgorandWalletProviders>
      <ReduxProviders>
        <QueryClientProvider client={queryClient}>
          <ScrollToTop />
          {children}
          <Toaster />
        </QueryClientProvider>
      </ReduxProviders>
    </AlgorandWalletProviders>
  );
};
