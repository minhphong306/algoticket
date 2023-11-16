"use client";

import React, { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";

import Header from "@/components/header/Header";
import Link from "next/link";
import Footer from "@/components/footer/Footer";
import TicketListComponent from "@/components/TicketList";
import { Profile, Ticket } from "@/types";
import ProfileComponent from "./Profile";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import api from "@/axios.config";
import { useWallet } from "@txnlab/use-wallet";

const ProfilePage = () => {
  const [ticketsList, setTicketsList] = useState<Ticket[]>([]);
  const [author, setAuthor] = useState<Profile | null>(null);
  const search = useSearchParams();
  const isCheckin = search.get("checkin") == "true";

  async function getTicketList(id: string = "1") {
    try {
      const response = await api.get(
        `/php-nft-ticket/api/my_nfts.php?user_id=${id}`
      );
      setTicketsList(response?.data?.data);
    } catch (error) {}
  }

  async function getProfile(id: string = "1") {
    try {
      const response = await api.get(
        `/php-nft-ticket/api/profile.php?id=${id}`
      );
      setAuthor(response?.data?.data);
    } catch (error) {}
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    getTicketList(userId ?? "1");
    getProfile(userId ?? "1");
  }, []);

  return (
    <div className="authors-2">
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Author</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="#">Pages</Link>
                  </li>
                  <li>Author</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tf-section authors">
        <div className="themesflat-container">
          <div className="flat-tabs tab-authors">
            {author && <ProfileComponent {...author}></ProfileComponent>}
          </div>
          {ticketsList?.length > 0 ? (
            <TicketListComponent
              isCurrentProfile={true}
              ticketsList={ticketsList}
              isCheckin={isCheckin}
            ></TicketListComponent>
          ) : null}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProfilePage;
