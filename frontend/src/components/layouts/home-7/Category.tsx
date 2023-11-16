"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import img1 from "../../../assets/images/box-item/img_category1.jpg";
import img2 from "../../../assets/images/box-item/img_category2.jpg";
import img3 from "../../../assets/images/box-item/img_category3.jpg";
import img4 from "../../../assets/images/box-item/img_category4.jpg";
import img5 from "../../../assets/images/box-item/img_category5.jpg";
import img6 from "../../../assets/images/box-item/img_category6.jpg";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface CategoryItemProps {
  title: string;
  img: StaticImageData;
}

const Category = () => {
  const [data] = useState([
    {
      title: "Digital Art",
      img: img1,
    },
    {
      title: "Style",
      img: img2,
    },
    {
      title: "Music",
      img: img3,
    },
    {
      title: "Domain Name",
      img: img4,
    },
    {
      title: "Sports",
      img: img5,
    },
    {
      title: "Utilities",
      img: img6,
    },
    {
      title: "Digital Art",
      img: img1,
    },
    {
      title: "Style",
      img: img2,
    },
    {
      title: "Music",
      img: img3,
    },
    {
      title: "Domain Name",
      img: img4,
    },
    {
      title: "Sports",
      img: img5,
    },
    {
      title: "Utilities",
      img: img6,
    },
  ]);
  return (
    <section className="tf-section category">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div className="heading-live-auctions">
              <h2 className="tf-title pb-39">All Catergories</h2>
            </div>
          </div>
          <div className="col-md-12">
            <Swiper
              modules={[Navigation, Scrollbar, A11y]}
              spaceBetween={25}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                },
                767: {
                  slidesPerView: 4,
                },
                991: {
                  slidesPerView: 6,
                },
              }}
              navigation
              scrollbar={{ draggable: true, hide: true, enabled: false }}
            >
              {data.map((item, index) => (
                <SwiperSlide key={index}>
                  <CategoryItem {...item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};
const CategoryItem = (props: CategoryItemProps) => (
  <div className="swiper-container carousel11">
    <div className="swiper-wrapper">
      <div className="swiper-slide">
        <div className="slider-item">
          <div className="sc-categoty">
            <div className="card-media">
              <Link href="#">
                <Image src={props.img} alt="Axies" />
              </Link>
            </div>
            <div className="card-title">
              <Link href="#">
                <h4>{props.title}</h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Category;
