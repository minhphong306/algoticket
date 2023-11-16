"use client";
import React, { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";

import Header from "@/components/header/Header";
import Link from "next/link";
import Footer from "@/components/footer/Footer";
import { Event } from "@/types";
import api from "@/axios.config";
import EventList from "./EventList";
import { useWallet } from "@txnlab/use-wallet";
import { useRouter } from "next/navigation";

export default function MyEventPage() {
  const [eventList, setEventList] = useState<Event[]>([]);

  async function getEventList(id: string = "1") {
    try {
      const response = await api.get(
        `/php-nft-ticket/api/my_events.php?user_id=${id}`
      );
      setEventList(response?.data?.data?.events);
    } catch (error) {
      setEventList([
        {
          id: "1",
          name: "Sample event 1",
          description:
            "Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...",
          image_url: "https://congcu.org/php-nft-ticket/images/1.jpg",
        },
        {
          id: "2",
          name: "Sample event 2",
          description:
            "Dolore officia sint incididunt non excepteur ea mollit commodo ut enim reprehenderit cupidatat labore ad laborum consectetur consequat...",
          image_url: "https://congcu.org/php-nft-ticket/images/1.jpg",
        },
      ]);
    }
  }

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    getEventList(userId ?? "1");
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
                  <li>My Events</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tf-section authors">
        <div className="themesflat-container">
          {eventList?.length > 0 ? (
            <EventList eventList={eventList}></EventList>
          ) : (
            "No event"
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
