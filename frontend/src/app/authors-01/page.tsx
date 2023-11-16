"use client";
import popularCollectionData from "@/assets/fake-data/data-popular-collection";
import topSellerData from "@/assets/fake-data/data-top-seller";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import TopSeller from "@/components/layouts/TopSeller";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Authors01 = () => {
  const [data] = useState(popularCollectionData);

  const [visible, setVisible] = useState(6);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 3);
  };
  return (
    <div className="authors">
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Authors</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="#">Pages</Link>
                  </li>
                  <li>Authors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <TopSeller data={topSellerData} />

      <section className="tf-section our-creater dark-style2">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="tf-title style4 mg-bt-38">Our Creator</h2>
            </div>
            {data.slice(0, visible).map((item, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-12">
                <div className="sc-card-collection style-2">
                  <div className="card-bottom">
                    <div className="author">
                      <div className="sc-author-box style-2">
                        <div className="author-avatar">
                          <Image
                            src={item.imgAuthor}
                            alt="Axies"
                            className="avatar"
                          />
                          <div className="badge"></div>
                        </div>
                      </div>
                      <div className="content">
                        <h4>
                          <Link href="/author-02">{item.name}</Link>
                        </h4>
                        <div className="infor">
                          <span>{item.count}</span>
                        </div>
                      </div>
                    </div>
                    <Link href="/login" className="sc-button fl-button pri-3">
                      <span>Following</span>
                    </Link>
                  </div>
                  <Link href="/author-02">
                    <div className="media-images-collection">
                      <div className="box-left">
                        <Image src={item.imgleft} alt="Axies" />
                      </div>
                      <div className="box-right">
                        <div className="top-img">
                          <Image src={item.imgright1} alt="Axies" />
                          <Image src={item.imgright2} alt="Axies" />
                        </div>
                        <div className="bottom-img">
                          <Image src={item.imgright3} alt="Axies" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
            {visible < data.length && (
              <div className="col-md-12 wrap-inner load-more text-center">
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
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Authors01;
