"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface TopSellerItemProps {
  img: StaticImageData;
  name: string;
  price: string;
  classPadding: string;
}

interface TopSellerProps {
  data: TopSellerItemProps[];
}

const TopSeller = (props: TopSellerProps) => {
  const data = props.data;
  return (
    <section className="tf-section top-seller">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div className="heading-live-auctions">
              <h2 className="tf-title">Top Seller</h2>
            </div>
          </div>
          <div className="col-md-12">
            <Swiper
              modules={[Navigation, Scrollbar, A11y]}
              spaceBetween={30}
              navigation
              breakpoints={{
                0: {
                  slidesPerView: 2,
                },
                767: {
                  slidesPerView: 5,
                },
                991: {
                  slidesPerView: 7,
                },
                1200: {
                  slidesPerView: 8,
                },
                1350: {
                  slidesPerView: 9,
                },
              }}
              scrollbar={{ draggable: true, hide: true, enabled: false }}
            >
              {data.map((item, index) => (
                <SwiperSlide key={index}>
                  <TopSellerItem {...item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

const TopSellerItem = (props: TopSellerItemProps) => (
  <div className="swiper-container seller style2 seller-slider2 button-arow-style">
    <div className="swiper-wrapper">
      <div className="swiper-slide">
        <div className="slider-item">
          <div className="sc-author-box style-2">
            <div className="author-avatar">
              <Image src={props.img} alt="" className="avatar" />
              <div className="badge"></div>
            </div>
            <div className="author-infor">
              <h5>
                <Link href="/authors-02">{props.name}</Link>
              </h5>
              <span className="price">{props.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TopSeller;
