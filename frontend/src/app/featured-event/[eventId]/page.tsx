"use client";
import React, { useState } from "react";
import Header from "@/components/header/Header";
import Image from "next/image";
import Footer from "@/components/footer/Footer";
import { useDetailEvent } from "@/hooks/useDetailEvent";
import moment from "moment";
import { useWallet } from "@txnlab/use-wallet";
import { useRouter } from "next/navigation";
import { ticketType } from "@/types/home.type";
import { ButtonLoading } from "@/components/buttonLoading";

const EventDetails = () => {
  const {
    detailEvent,
    handleBuyNft,
    setTicketSelected,
    ticketSelected,
    isLoading,
  } = useDetailEvent();
  const { isActive } = useWallet();
  const route = useRouter();

  const selectOptionTicket = (item: ticketType) => {
    if (!isActive) {
      return route.push("/wallet-connect-algorand");
    }

    if (ticketSelected.id === item.id) {
      setTicketSelected({
        id: "",
        name: "",
        current_qty: 0,
        total_qty: 0,
        price: "",
        amount: "",
        created_at: "",
        event_id: "",
        image_url: "",
        status: "",
        updated_at: null,
        type: 0,
      });
    } else {
      setTicketSelected(item);
    }
  };

  const checkQty =
    Number(ticketSelected.current_qty) >= Number(ticketSelected.amount)
      ? true
      : false;

  return (
    <div>
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Event Detail</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tf-section post-details">
        <div className="themesflat-container">
          <div className="wrap-flex-box style">
            <div className="post">
              <div className="inner-content">
                <h2 className="title-post">{detailEvent?.event.name}</h2>
                <div className="divider"></div>
                <div className="meta-post flex mg-bt-31">
                  <div className="box d-flex">
                    <div className="inner boder pad-r-50">
                      <h6 className="desc">LOCATION</h6>
                      <p>{detailEvent?.event.location}</p>
                    </div>
                    <div className="inner mg-l-39 mg-r-1">
                      <h6 className="desc">DATE</h6>
                      <p>{moment(detailEvent?.event.date).format("LL")}</p>
                    </div>
                  </div>
                </div>
                <div className="image">
                  <Image
                    src={detailEvent?.event.feature_image ?? ""}
                    width={1000}
                    height={500}
                    alt="Axies"
                  />
                </div>
                <div className="inner-post mg-t-40">
                  <p className="mg-bt-24">{detailEvent?.event.description}</p>
                </div>
              </div>
            </div>
            <div className="side-bar details">
              <div className="widget widget-recent-post mg-bt-43">
                <h3 className="title-widget mg-bt-23">Buy Ticket</h3>
                <ul>
                  {detailEvent?.tickets?.map((item, index) => (
                    <li
                      key={index}
                      className={`box-recent-post ${
                        ticketSelected.id === item.id
                          ? "btn-select-ticket-active"
                          : "btn-select-ticket"
                      }`}
                      onClick={() => selectOptionTicket(item)}
                    >
                      <div className="box-feature">
                        <Image
                          src={item.image_url}
                          width={40}
                          height={40}
                          alt="Axies"
                        />
                      </div>
                      <div className="box-content">
                        <p className="title-recent-post">{item.name}</p>
                        <span>
                          <span className="sub-recent-post">
                            {item.current_qty}/{item.amount}
                          </span>
                          <b className="day-recent-post text-white">
                            {item.price} ALGO
                          </b>
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {isLoading ? (
                <ButtonLoading />
              ) : (
                <button
                  style={{ width: "100%" }}
                  className="sc-button loadmore style bag fl-button pri-3 mt-4"
                  disabled={
                    (ticketSelected?.id?.length > 0 ? false : true) || checkQty
                  }
                  onClick={handleBuyNft}
                >
                  <span>Buy</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default EventDetails;
