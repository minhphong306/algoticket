import liveAuctionData from "@/assets/fake-data/data-live-auction";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import LiveAuction from "@/components/layouts/LiveAuction";
import Link from "next/link";

const LiveAuctions = () => {
  return (
    <div className="auctions">
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Auctions</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="#">Explore</Link>
                  </li>
                  <li>Auctions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LiveAuction data={liveAuctionData} />
      <Footer />
    </div>
  );
};

export default LiveAuctions;
