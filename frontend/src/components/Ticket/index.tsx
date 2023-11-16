"use client";
import { Ticket } from "@/types";
import Link from "next/link";
import AuthorAvatar from "@/assets/images/avatar/author_avatar.jpeg";
import Image from "next/image";
import SellModal from "./SellModal";
import CheckinModal from "./CheckinModal";
import { useState } from "react";

export default function TicketComponent({
  ticket,
  isCurrentProfile,
  isCheckin,
}: {
  ticket: Ticket;
  isCurrentProfile?: boolean;
  isCheckin?: boolean;
}) {
  const [isShowSellModal, setIsShowSellModal] = useState(false);
  const [isShowCheckinModal, setIsShowCheckinModal] = useState(false);
  const handleSellClick = () => {
    if (isCheckin) {
      setIsShowCheckinModal(true);
    } else {
      setIsShowSellModal(true);
    }
  };
  let detailUrl = `/ticket-details/${ticket.id}`;
  if (isCurrentProfile) {
    detailUrl = detailUrl += `?isOwner=true`;
  }

  return (
    <>
      <SellModal
        show={isShowSellModal}
        onHide={() => {
          setIsShowSellModal(false);
        }}
        nftId={ticket.nft_id}
        idCard={ticket.id}
      ></SellModal>
      <CheckinModal
        show={isShowCheckinModal}
        onHide={() => {
          setIsShowCheckinModal(false);
        }}
        ticketId={ticket.id}
      ></CheckinModal>
      <div className="col-xl-3 col-lg-4 col-md-6 col-12 ticket">
        <div className="sc-card-product explode ">
          <div className="card-media">
            {isCurrentProfile ? (
              <Image
                src={
                  ticket.image_url.includes("congcu.org")
                    ? ticket.image_url
                    : ""
                }
                width={400}
                height={400}
                alt="Ticket"
              />
            ) : (
              <Link href={detailUrl}>
                <Image
                  src={
                    ticket.image_url.includes("congcu.org")
                      ? ticket.image_url
                      : ""
                  }
                  width={400}
                  height={400}
                  alt="Ticket"
                />
              </Link>
            )}
            {ticket.status === "2" && (
              <div className="wishlist-button">
                <span className="number-like">Listed</span>
              </div>
            )}

            {isCurrentProfile && (
              <div className="button-place-bid ">
                <button
                  className="sc-button style-place-bid style bag fl-button pri-3"
                  onClick={handleSellClick}
                >
                  <span> {isCheckin ? "Checkin" : "List On Marketplace"} </span>
                </button>
              </div>
            )}
          </div>
          <div className="card-subtitle">{ticket.event_name}</div>
          <div className="card-title mg-bt-16">
            <h5>
              <Link href={detailUrl}>{ticket.name}</Link>
            </h5>
          </div>
          <div className="meta-info">
            <div className="author">
              <div className="avatar">
                <Image
                  src={AuthorAvatar}
                  width={400}
                  height={400}
                  alt={ticket.creator_name}
                />
              </div>
              <div className="info">
                <span>Owner</span>
                <h6> {ticket.creator_name} </h6>
              </div>
            </div>
          </div>
          <div className="card-bottom style-explode">
            <div className="price">
              <span>Price</span>
              <div className="price-details">
                <h5>{ticket.price} ALGO</h5>
                {/* <span>= {data.priceChange}</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
