"use client";

import React from "react";
import shape1 from "../../assets/images/backgroup-secsion/bg-gradient1.png";
import shape2 from "../../assets/images/backgroup-secsion/bg-gradient2.png";
import shape3 from "../../assets/images/backgroup-secsion/bg-gradient3.png";
import imgbg from "../../assets/images/backgroup-secsion/img_bg_page_title.jpg";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
// import Swiper core and required modules
import { Navigation, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface SliderItemProps {
  title_1: string;
  title_2: string;
  title_3: string;
  description: string;
  img?: StaticImageData;
  imgbg?: StaticImageData;
  class: string;
}

interface SliderProps {
  data: SliderItemProps[];
}

const Slider = (props: SliderProps) => {
  const data = props.data;
  return (
    <div className="mainslider">
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        scrollbar={{ draggable: true, hide: true, enabled: false }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className={item.class}>
            <SliderItem {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const SliderItem = (props: SliderItemProps) => (
  <div className="flat-title-page" style={{ backgroundImage: `url(${imgbg})` }}>
    <Image className="bgr-gradient gradient1" src={shape1} alt="Axies" />
    <Image className="bgr-gradient gradient2" src={shape2} alt="Axies" />
    <Image className="bgr-gradient gradient3" src={shape3} alt="Axies" />
    <div className="shape item-w-16"></div>
    <div className="shape item-w-22"></div>
    <div className="shape item-w-32"></div>
    <div className="shape item-w-48"></div>
    <div className="shape style2 item-w-51"></div>
    <div className="shape style2 item-w-51 position2"></div>
    <div className="shape item-w-68"></div>
    <div className="overlay"></div>
    <div className="swiper-container mainslider home">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <div className="slider-item">
            <div className="themesflat-container ">
              <div className="wrap-heading flat-slider flex">
                <div className="content">
                  {/* <h2 className="heading">{props.title_1}</h2> */}
                  <h1 className="heading mb-style">
                    <span className="tf-text s1">{props.title_2}</span>
                  </h1>
                  <h1 className="heading">{props.title_3}</h1>
                  <p className="sub-heading">{props.description}</p>
                  <div className="flat-bt-slider flex style2">
                    <Link
                      href="/marketplace"
                      className="sc-button header-slider style style-1 rocket fl-button pri-1"
                    >
                      <span>Marketplace</span>
                    </Link>
                    <Link
                      href="/create-event"
                      className="sc-button header-slider style style-1 note fl-button pri-1"
                    >
                      <span>Create Event</span>
                    </Link>
                  </div>
                </div>
                <div className="image">
                  <Image
                    className="img-bg"
                    src={props.imgbg ?? ""}
                    alt="axies"
                  />
                  <Image src={props.img ?? ""} alt="axies" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default Slider;
