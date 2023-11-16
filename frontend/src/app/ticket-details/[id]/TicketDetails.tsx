"use client";
import { Ticket } from "@/types";
import Image from "next/image";
import AuthorAvatar from "@/assets/images/avatar/author_avatar.jpeg";
import Link from "next/link";
import SellModal from "@/components/Ticket/SellModal";
import BuyModal from "@/components/Ticket/BuyModal";
import { useState } from "react";
import moment from "moment";

export default function TicketDetails({
  ticket,
  isCurrentProfile,
}: {
  ticket: Ticket;
  isCurrentProfile: boolean;
}) {
  const [isShowSellModal, setIsShowSellModal] = useState(false);
  const [isShowBuyModal, setIsShowBuyModal] = useState(false);

  return (
    <>
      <SellModal
        show={isShowSellModal}
        onHide={() => {
          setIsShowSellModal(false);
        }}
      ></SellModal>
      <BuyModal
        show={isShowBuyModal}
        onHide={() => {
          setIsShowBuyModal(false);
        }}
      ></BuyModal>
      <div className="tf-section tf-item-details">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-6 col-md-12">
              <div className="content-left">
                <div className="media">
                  <Image
                    src={ticket.image_url}
                    width={1000}
                    height={1000}
                    alt={ticket.name}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-12">
              <div className="content-right">
                <div className="sc-item-details">
                  <h2 className="style2">{ticket.name}</h2>
                  <div className="client-infor sc-card-product">
                    <div className="meta-info">
                      <div className="author">
                        <div className="avatar">
                          <Image
                            width={1000}
                            height={1000}
                            src={AuthorAvatar}
                            alt="Axies"
                          />
                        </div>
                        <div className="info">
                          <span>Owned By</span>
                          <h6> {ticket.owner_name || "Owner Name"} </h6>
                        </div>
                      </div>
                    </div>
                    <div className="meta-info">
                      <div className="author">
                        <div className="avatar">
                          <Image
                            src={AuthorAvatar}
                            width={1000}
                            height={1000}
                            alt="Axies"
                          />
                        </div>
                        <div className="info">
                          <span>Create By</span>
                          <h6> {ticket.creator_name || "Creator Name"} </h6>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="meta-item-details style2">
                    <div className="item meta-price">
                      <span className="heading">ID</span>
                      <div className="price">
                        <div className="price-box">
                          <h5> {ticket.id}</h5>
                        </div>
                      </div>
                    </div>
                    <div className="item meta-price">
                      <span className="heading">Create</span>
                      <div className="price">
                        <div className="price-box">
                          <h5> {moment(ticket.created_at).format("ll")}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="meta-item-details style2">
                    <div className="item meta-price">
                      <span className="heading">Event</span>
                      <div className="price">
                        <div className="price-box">
                          <h5> {ticket.event_name}</h5>
                        </div>
                      </div>
                    </div>
                    <div className="item meta-price">
                      <span className="heading">Price</span>
                      <div className="price">
                        <div className="price-box">
                          <h5> {ticket.price} ALGO</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="#"
                    className="sc-button loadmore style bag fl-button pri-3"
                    onClick={() => {
                      isCurrentProfile
                        ? setIsShowSellModal(true)
                        : setIsShowBuyModal(true);
                    }}
                  >
                    <span>{isCurrentProfile ? "Sell" : "Buy ticket"}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
