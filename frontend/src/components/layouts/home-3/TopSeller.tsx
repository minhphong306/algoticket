"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

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
    <section className="tf-section top-seller bg-home-3">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div className="">
              <h2 className="tf-title style2">Top Seller</h2>
              <div className="heading-line s1"></div>
            </div>
          </div>
          {data.map((item, index) => (
            <TopSellerItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TopSellerItem = (props: TopSellerItemProps) => (
  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
    <div className="sc-author-box">
      <div className="author-avatar">
        <Link href="/authors-02">
          <Image src={props.img} alt="Axies" className="avatar" />
        </Link>
        <div className="badge">
          <i className="ripple"></i>
        </div>
      </div>
      <div className="author-infor">
        <h5 className="style2">
          <Link href="/authors-02">{props.name}</Link>
        </h5>
        <span className="price">{props.price}</span>
      </div>
    </div>
  </div>
);

export default TopSeller;
