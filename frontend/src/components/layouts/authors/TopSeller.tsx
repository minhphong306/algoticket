import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

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
}

interface TopSellerProps {
  data: TopSellerItemProps[];
}

const LiveAuction = (props: TopSellerProps) => {
  const data = props.data;

  return (
    <section className="tf-section live-auctions">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="tf-title style4">Top Seller</h2>
            <p className="tf-sub-title">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum
              obcaecati dignissimos quae quo ad iste ipsum officiis deleniti
              asperiores sit.
            </p>
          </div>
          <div className="col-md-12">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={30}
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
                1300: {
                  slidesPerView: 9,
                },
              }}
              navigation
              pagination={{ clickable: true }}
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
  <div className="swiper-container seller seller-slider">
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
                <Link href="/author-02">{props.name}</Link>
              </h5>
              <span className="price">{props.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LiveAuction;
