import { PAGE_DEFAULT } from "@/utils/constant";
import * as React from "react";
import { listEventItem } from "@/types/home.type";
import api from "@/axios.config";

export const useGetHomePage = () => {
  const [listEvent, setListEvent] = React.useState<listEventItem[]>([]);
  const [currenPage, setCurrenPage] = React.useState<number>(PAGE_DEFAULT);
  const [totalPage, setTotalPage] = React.useState<number>(0);
  const [limitItem, setLimitItem] = React.useState<number>(6);
  const showMoreItems = async () => {
    if (currenPage === totalPage) {
      return;
    }
    const { data } = await api.get("/php-nft-ticket/api/feature_event.php", {
      params: {
        page: currenPage + 1,
        limit: limitItem,
      },
    });
    setListEvent([...listEvent, ...data?.data]);
    setCurrenPage(Number(data?.current_page) ?? 0);
  };

  const getListDataEvent = async () => {
    const { data } = await api.get("/php-nft-ticket/api/feature_event.php", {
      params: {
        page: PAGE_DEFAULT,
        limit: limitItem,
      },
    });

    setListEvent(data?.data ?? []);
    setCurrenPage(Number(data?.current_page) ?? 0);
    setTotalPage(Number(data?.total_pages) ?? 0);
  };

  React.useEffect(() => {
    getListDataEvent();
  }, []);

  return {
    listEvent,
    currenPage,
    limitItem,
    showMoreItems,
    totalPage,
  };
};
