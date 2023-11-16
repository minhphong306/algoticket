"use client";
import Header from "@/components/header/Header";
import Slider from "@/components/slider/Slider";
import Create from "@/components/layouts/Create";
import Footer from "@/components/footer/Footer";
import heroSliderData from "@/assets/fake-data/data-slider";
import { useGetHomePage } from "@/hooks/useGetHomePage";
import FeaturedEvent from "@/components/layouts/FeaturedEvent";

export default function Home() {
  const { listEvent, limitItem, showMoreItems, totalPage, currenPage } =
    useGetHomePage();

  return (
    <div className="home-1">
      <Header />
      <Slider data={heroSliderData} />
      <FeaturedEvent
        data={listEvent}
        limitItem={limitItem}
        showMoreItems={showMoreItems}
        totalPage={totalPage}
        currenPage={currenPage}
      />
      <Create />
      <Footer />
    </div>
  );
}
