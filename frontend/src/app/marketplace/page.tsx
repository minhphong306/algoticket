import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Link from "next/link";
import Filter from "./Filter";
import { Event, Ticket } from "@/types";
import TicketListComponent from "@/components/TicketList";
import api from "@/axios.config";

async function getEvents(): Promise<Event[] | null> {
  try {
    const response = await api.get(`/php-nft-ticket/api/events.php`);
    return response?.data?.data;
  } catch (error) {
    return [
      {
        id: "1",
        name: "Event 1",
      },
      {
        id: "2",
        name: "Event 2",
      },
    ];
    return null;
  }
}

async function getTickets(collectionIds?: string[]): Promise<Ticket[] | null> {
  try {
    const url = `/php-nft-ticket/api/marketplace_listing.php?limit=50&page=1&collection_ids=${(
      collectionIds || []
    ).join(",")}`;
    const response = await api.get(url);
    const data = response?.data?.data;
    const filteredData = data.filter((ticket: Ticket) => {
      return (
        !collectionIds ||
        !collectionIds.length ||
        collectionIds.includes(ticket.event_id)
      );
    });
    return filteredData;
  } catch (error) {
    return null;
  }
}

const MarketPlacePage = async ({
  searchParams,
}: {
  searchParams: {
    collection_ids?: string;
  };
}) => {
  const collection_ids = (searchParams.collection_ids || "")
    .split(",")
    .filter((elm) => !!elm);

  const events = await getEvents();
  const tickets = await getTickets(collection_ids);

  return (
    <div>
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Explore 4</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="#">Explore</Link>
                  </li>
                  <li>Explore 4</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tf-explore tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-12">
              {(events && events.length && <Filter items={events}></Filter>) ||
                null}
            </div>

            <div className="col-xl-9 col-lg-9 col-md-12">
              {tickets && tickets.length ? (
                <TicketListComponent
                  isCurrentProfile={false}
                  ticketsList={tickets}
                ></TicketListComponent>
              ) : (
                <p>No Ticket</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MarketPlacePage;
