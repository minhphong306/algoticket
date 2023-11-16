import api from "@/axios.config";
import { nftContractClient } from "@/components/AlgorandWalletProviders";
import { useWallet } from "@txnlab/use-wallet";
import algosdk from "algosdk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const useCreateEvent = () => {
  const route = useRouter();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { activeAddress, signer } = useWallet();
  const sender = { signer, addr: activeAddress! };
  const defaultTicketContract = { amount: 0, price: 0 };

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const btnAcceptModal = () => {
    route.push("/");
  };

  const createEvent = async (data: any) => {
    setIsLoading(true);
    const ticket1 =
      data?.tickets?.length > 0 ? data?.tickets[0] : defaultTicketContract;

    const ticket2 =
      data?.tickets?.length > 1 ? data?.tickets[1] : defaultTicketContract;

    const ticket3 =
      data?.tickets?.length > 2 ? data?.tickets[2] : defaultTicketContract;

    try {
      const index = await nftContractClient.getGlobalState();
      const numberBox = index.eventIndex?.asNumber() ?? 0;

      const createEvent = await nftContractClient.createEvent(
        {
          name: data?.event?.name ?? "",
          nft1: ticket1?.amount ?? 0,
          nft2: ticket2?.amount ?? 0,
          nft3: ticket3?.amount ?? 0,
          nft1price: ticket1?.price ?? 0,
          nft2price: ticket2?.price ?? 0,
          nft3price: ticket3?.price ?? 0,
        },
        {
          boxes: [algosdk.encodeUint64(numberBox)],
          sender: sender,
        }
      );

      await api.post("/php-nft-ticket/api/create_event.php", data).then(() => {
        setIsOpenModal(true);
      });
    } catch (error) {
      console.log(error);
      toast.error(String(error), {
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { createEvent, isOpenModal, onCloseModal, btnAcceptModal, isLoading };
};
