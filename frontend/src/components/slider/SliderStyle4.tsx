"use client";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import img1 from "../../assets/images/box-item/img_item1.png";
import img2 from "../../assets/images/box-item/img_item2.png";
import img3 from "../../assets/images/box-item/img_item3.png";
import shape1 from "../../assets/images/backgroup-secsion/bg-gradient1.png";
import shape2 from "../../assets/images/backgroup-secsion/bg-gradient2.png";
import shape3 from "../../assets/images/backgroup-secsion/bg-gradient3.png";
import Image from "next/image";
import Link from "next/link";

const SliderStyle4 = () => {
  return (
    <div>
      <section className="flat-title-page style3 mainslider">
        <Image className="bgr-gradient gradient1" src={shape1} alt="Axies" />
        <Image className="bgr-gradient gradient2" src={shape2} alt="Axies" />
        <Image className="bgr-gradient gradient3" src={shape3} alt="Axies" />
        <div className="overlay"></div>
        <div className="themesflat-container ">
          <div className="wrap-heading flat-slider flex">
            <div className="content">
              <h2 className="heading mt-15">Discover, find,</h2>
              <h1 className="heading mb-style">
                <span className="tf-text s1">Sell extraordinary</span>
              </h1>
              <h1 className="heading">Monster NFTs</h1>
              <p className="sub-heading mt-19 mb-40">
                Marketplace for monster character cllections non fungible token
                NFTs
              </p>
              <div className="flat-bt-slider flex style2">
                <Link
                  href="/explore-01"
                  className="sc-button header-slider style style-1 rocket fl-button pri-1"
                >
                  <span>Explore</span>
                </Link>
                <Link
                  href="/create-item"
                  className="sc-button header-slider style style-1 note fl-button pri-1"
                >
                  <span>Create</span>
                </Link>
              </div>
            </div>
            <Swiper
              modules={[Autoplay]}
              direction={"vertical"}
              spaceBetween={25}
              slidesPerView={4}
              loop
              autoplay={{
                delay: 1,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={2000}
            >
              <SwiperSlide>
                <Image src={img1} alt="Axies" />
              </SwiperSlide>
              <SwiperSlide>
                <Image src={img2} alt="Axies" />
              </SwiperSlide>
              <SwiperSlide>
                <Image src={img3} alt="Axies" />
              </SwiperSlide>
              <SwiperSlide>
                <Image src={img2} alt="Axies" />
              </SwiperSlide>
              <SwiperSlide>
                <Image src={img3} alt="Axies" />
              </SwiperSlide>
            </Swiper>
            <Swiper
              modules={[Autoplay]}
              direction={"vertical"}
              spaceBetween={25}
              slidesPerView={4}
              loop
              autoplay={{
                delay: 1,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={1800}
            >
              <SwiperSlide>
                <Image src={img3} alt="Axies" />
              </SwiperSlide>
              <SwiperSlide>
                <Image src={img2} alt="Axies" />
              </SwiperSlide>
              <SwiperSlide>
                <Image src={img3} alt="Axies" />
              </SwiperSlide>
              <SwiperSlide>
                <Image src={img1} alt="Axies" />
              </SwiperSlide>
              <SwiperSlide>
                <Image src={img2} alt="Axies" />
              </SwiperSlide>
            </Swiper>
            <Swiper
              modules={[Autoplay]}
              direction={"vertical"}
              spaceBetween={25}
              slidesPerView={4}
              loop
              autoplay={{
                delay: 1,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={2200}
            >
              <SwiperSlide>
                <Image src={img2} alt="Axies" />
              </SwiperSlide>
              <SwiperSlide>
                <Image src={img1} alt="Axies" />
              </SwiperSlide>
              <SwiperSlide>
                <Image src={img3} alt="Axies" />
              </SwiperSlide>
              <SwiperSlide>
                <Image src={img2} alt="Axies" />
              </SwiperSlide>
              <SwiperSlide>
                <Image src={img1} alt="Axies" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SliderStyle4;
