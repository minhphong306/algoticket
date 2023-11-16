"use client";
import React, { useState, Fragment } from "react";
import CardModal from "../CardModal";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface ExploreItemProps {
  data: {
    img: StaticImageData;
    title: string;
    tags: string;
    imgAuthor: StaticImageData;
    nameAuthor: string;
    price: string;
    priceChange: string;
    wishlist: string;
    imgCollection: StaticImageData;
    nameCollection: string;
    feature?: any;
  }[];
}

const ExploreItem = (props: ExploreItemProps) => {
  const data = props.data;

  const [visible, setVisible] = useState(6);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 6);
  };

  const [modalShow, setModalShow] = useState(false);
  return (
    <Fragment>
      <div className="explore">
        <div className="box-epxlore">
          {data.slice(0, visible).map((item, index) => (
            <div
              className={`sc-card-product explode style2 mg-bt ${
                item.feature ? "comingsoon" : ""
              } `}
              key={index}
            >
              <div className="card-media">
                <Link href="/item-details-01">
                  <Image src={item.img} alt="Axies" />
                </Link>
                <div className="button-place-bid">
                  <button
                    onClick={() => setModalShow(true)}
                    className="sc-button style-place-bid style bag fl-button pri-3"
                  >
                    <span>Place Bid</span>
                  </button>
                </div>
                <Link href="/login" className="wishlist-button heart">
                  <span className="number-like">{item.wishlist}</span>
                </Link>
                <div className="coming-soon">{item.feature}</div>
              </div>
              <div className="card-title">
                <h5>
                  <Link href="/item-details-01">{item.title}</Link>
                </h5>
              </div>
              <div className="meta-info">
                <div className="author">
                  <div className="avatar">
                    <Image src={item.imgAuthor} alt="Axies" />
                  </div>
                  <div className="info">
                    <span>Creator</span>
                    <h6>
                      {" "}
                      <Link href="/author-02">{item.nameAuthor}</Link>{" "}
                    </h6>
                  </div>
                </div>
                <div className="tags">{item.tags}</div>
              </div>
              <div className="card-bottom style-explode">
                <div className="price">
                  <span>Price</span>
                  <div className="price-details">
                    <h5>{item.price}</h5>
                    <span>= {item.priceChange}</span>
                  </div>
                </div>
                <Link href="/activity-01" className="view-history reload">
                  View History
                </Link>
              </div>
            </div>
          ))}
        </div>
        {visible < data.length && (
          <div className="btn-auction center">
            <Link
              href="#"
              id="load-more"
              className="sc-button loadmore fl-button pri-3"
              onClick={showMoreItems}
            >
              <span>Load More</span>
            </Link>
          </div>
        )}
      </div>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  );
};

export default ExploreItem;
