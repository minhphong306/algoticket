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
    <section className="tf-section top-seller">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div className="heading-live-auctions">
              <h2 className="tf-title mb-25">Top Seller</h2>
            </div>
          </div>
          <div className="col-md-12">
            <div className="tf-box">
              {data.slice(0, 10).map((item, index) => (
                <TopSellerItem key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TopSellerItem = (props: TopSellerItemProps) => (
  <div className={`box-item ${props.classPadding}`}>
    <div className="sc-author-box style-3 pd-0">
      <div className="author-avatar">
        <Link href="/authors-02">
          <Image src={props.img} alt="axies" className="avatar" />
        </Link>
        <div className="badge">
          <i className="ripple"></i>
        </div>
      </div>
      <div className="author-infor">
        <h5 className="fs-16">
          <Link href="/authors-02">{props.name}</Link>
        </h5>
        <span className="price">{props.price}</span>
      </div>
    </div>
  </div>
);

export default TopSeller;
