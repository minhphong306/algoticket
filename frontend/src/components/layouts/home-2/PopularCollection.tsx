"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper/modules";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface PopularCollectionItemProps {
  title: string;
  imgAuthor: StaticImageData;
  name: string;
  imgleft: StaticImageData;
  imgright1: StaticImageData;
  imgright2: StaticImageData;
  count: string;
  imgright3: StaticImageData;
  imgright4: StaticImageData;
  imgtop: StaticImageData;
  wishlist: string;
}

interface PopularCollectionProps {
  data: PopularCollectionItemProps[];
}

const PopularCollection = (props: PopularCollectionProps) => {
  const data = props.data;
  return (
    <section className="tf-section popular-collection">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div className="heading-live-auctions">
              <h2 className="tf-title pb-22 text-left">Popular Collection</h2>
              <Link href="/explore-03" className="exp style2">
                EXPLORE MORE
              </Link>
            </div>
          </div>
          <div className="col-md-12">
            <div className="collection">
              <Swiper
                modules={[Navigation, Scrollbar, A11y]}
                spaceBetween={30}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  767: {
                    slidesPerView: 2,
                  },
                  991: {
                    slidesPerView: 3,
                  },
                }}
                scrollbar={{ draggable: true, hide: true, enabled: false }}
              >
                {data.map((item, index) => (
                  <SwiperSlide key={index}>
                    <PopularCollectionItem {...item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PopularCollectionItem = (props: PopularCollectionItemProps) => (
  <div className="swiper-container show-shadow carousel4 button-arow-style">
    <div className="swiper-wrapper">
      <div className="swiper-slide">
        <div className="slider-item">
          <div className="sc-card-collection style-3">
            <Link href="/authors-02">
              <div className="media-images-box">
                <div className="top-media">
                  <Image src={props.imgleft} alt="Axies" />
                  <Image src={props.imgright3} alt="Axies" />
                </div>
                <div className="bottom-media">
                  <Image src={props.imgright1} alt="Axies" />
                  <Image src={props.imgright2} alt="Axies" />
                  <Image src={props.imgright4} alt="Axies" />
                </div>
              </div>
            </Link>
            <div className="card-bottom">
              <div className="author">
                <div className="sc-author-box style-2">
                  <div className="author-avatar">
                    <Image src={props.imgAuthor} alt="" className="avatar" />
                    <div className="badge">
                      <i className="ripple"></i>
                    </div>
                  </div>
                </div>
                <div className="content">
                  <h4>
                    <Link href="/authors-01">{props.title}</Link>
                  </h4>
                  <div className="infor">
                    <span>Created by</span>
                    <span className="name">
                      <Link href="/authors-02">{props.name}</Link>
                    </span>
                  </div>
                </div>
              </div>
              <Link href="/login" className="wishlist-button public heart">
                <span className="number-like">{props.wishlist}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PopularCollection;
