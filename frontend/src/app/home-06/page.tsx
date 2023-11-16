import todayPickData from "@/assets/fake-data/data-today-pick";
import Footer from "@/components/footer/Footer";
import HeaderStyle2 from "@/components/header/HeaderStyle2";
import Create from "@/components/layouts/home-6/Create";
import LiveAuction from "@/components/layouts/home-6/LiveAuction";
import PopularCollection from "@/components/layouts/home-6/PopularCollection";
import TodayPicks from "@/components/layouts/home-6/TodayPicks";
import TopSeller from "@/components/layouts/home-6/TopSeller";
import SliderStyle3 from "@/components/slider/SliderStyle3";

const Home06 = () => {
  return (
    <div className="home-6">
      <HeaderStyle2 />
      <SliderStyle3 />
      <LiveAuction />
      <TopSeller />
      <TodayPicks data={todayPickData} />
      <PopularCollection />
      <Create />
      <Footer />
    </div>
  );
};

export default Home06;
