import React from "react";
import "react-tabs/style/react-tabs.css";
import Header from "@/components/header/Header";
import Link from "next/link";
import Footer from "@/components/footer/Footer";
import { notFound } from "next/navigation";
import { Ticket } from "@/types";
import TicketDetails from "./TicketDetails";
import api from "@/axios.config";

async function getTicket(id: string = "1"): Promise<Ticket | null> {
  try {
    const response = await api.get(
      `/php-nft-ticket/api/marketplace_detail.php?id=${id}`
    );
    return response?.data?.data;
  } catch (error) {
    return null;
  }
}

const TicketDetailsPage = async ({
  params,
  searchParams,
}: {
  params: {
    id?: string;
  };
  searchParams: {
    isOwner?: string;
  };
}) => {
  const id = params["id"] || "1";
  const isOwner = searchParams.isOwner == "true";
  const ticket = await getTicket(id);

  if (!ticket) return notFound();

  return (
    <div className="item-details">
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Ticket Details</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="#">Explore</Link>
                  </li>
                  <li>Ticket Details</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TicketDetails isCurrentProfile={isOwner} ticket={ticket}></TicketDetails>

      <div className="tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-12">
              <h2>{ticket.event_name}</h2>
              <p className="mg-t-40 mg-bt-40">{ticket.event_description}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TicketDetailsPage;
