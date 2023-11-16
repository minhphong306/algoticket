"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { listEventItem } from "@/types/home.type";
import moment from "moment";
import { useRouter } from "next/navigation";
import img1 from "../../assets/images/avatar/avt-1.jpg";
import imgThumb from "../../assets/images/blog/thumb-1.jpg";

interface ItemProps {
  id: number | string;
  img: string;
  title: string;
  imgAuthor: StaticImageData | string;
  walletAuthor: string;
  time: string | number;
  content: string;
}

interface FeaturedEventProps {
  data: listEventItem[];
  limitItem: number;
  showMoreItems: () => void;
  totalPage: number;
  currenPage: number;
}

const Item = (props: ItemProps) => {
  const route = useRouter();
  return (
    <div className="fl-blog fl-item2 col-lg-4 col-md-6">
      <article className="sc-card-article">
        <div className="card-media">
          {/* <Link href="/blog-details"> */}
          <Image
            src={props.img.includes("congcu.org") ? props.img : imgThumb}
            width={300}
            height={300}
            alt="Axies"
          />
          {/* </Link> */}
        </div>
        <div className="meta-info">
          <div className="author">
            <div className="avatar">
              <Image src={props.imgAuthor} width={50} height={50} alt="Axies" />
            </div>
            <div className="info">
              <span>Post owner</span>
              <h6>
                {" "}
                {/* <Link href="/author-02"> */}
                {`${props.walletAuthor.slice(0, 8)}...`}
                {/* </Link>{" "} */}
              </h6>
            </div>
          </div>
          <div className="date">{moment(props.time).format("ll")}</div>
        </div>
        <div className="text-article">
          <h3>
            {/* <Link href="/blog-details"> */}
            {props.title}
            {/* </Link> */}
          </h3>
          <p>
            {props.content.length > 150
              ? `${props.content.slice(0, 150)}...`
              : props.content}
          </p>
        </div>
        <Link
          href={`/featured-event/${props.id}`}
          className="sc-button fl-button pri-3"
        >
          <span>Buy Ticket</span>
        </Link>
      </article>
    </div>
  );
};

const FeaturedEvent = (props: FeaturedEventProps) => {
  const data = props.data;

  return (
    <div className="tf-section sc-card-blog dark-style2">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div className="heading-live-auctions mg-bt-21">
              <h2 className="tf-title pad-l-7">Featured Event</h2>
              {/* <Link href="/explore-03" className="exp style2">
                EXPLORE MORE
              </Link> */}
            </div>
          </div>
          {data.map((item, index) => (
            <Item
              key={index}
              id={item.id}
              content={item.description}
              img={item.feature_image}
              imgAuthor={item.author_avatar ?? img1}
              walletAuthor={item.author_wallet_address}
              time={item.date}
              title={item.name}
            />
          ))}
          {props.totalPage > 0 && props.currenPage < props.totalPage && (
            <div className="col-md-12 wrap-inner load-more text-center">
              <button
                id="load-more"
                className="sc-button loadmore fl-button pri-3 mt-6"
                onClick={props.showMoreItems}
              >
                <span>Load More</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvent;
