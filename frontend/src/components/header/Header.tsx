"use client";
import React, { useRef, useState, useEffect } from "react";
import DarkMode from "./DarkMode";
import logodark from "../../assets/images/logo/Logo3.png";
import imgsun from "../../assets/images/icon/sun.png";
import avt from "../../assets/images/avatar/avt-2.jpg";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import menus from "@/utils/menu";
import { Dropdown } from "react-bootstrap";
import { useWallet } from "@txnlab/use-wallet";
import { copyToClipboard } from "@/utils/clipboard";
import useWalletBalance from "@/hooks/useWalletBalance";
import ComingSoonModal from "../ComingSoon";

const Header = () => {
  const [comingSoonModal, setComingSoonModal] = useState<boolean>(false);
  const pathname = usePathname();
  const { providers, activeAccount, isActive } = useWallet();
  const { walletBalance, walletAvailableBalance } = useWalletBalance();
  const router = useRouter();

  const currentWalletProvider = providers?.find(
    (v) => v.metadata.id === activeAccount?.providerId
  );

  const headerRef = useRef(null);
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });
  const isSticky = (e: any) => {
    const header = document.querySelector(".js-header");
    const scrollTop = window.scrollY;
    scrollTop >= 300
      ? header?.classList.add("is-fixed")
      : header?.classList.remove("is-fixed");
    scrollTop >= 400
      ? header?.classList.add("is-small")
      : header?.classList.remove("is-small");
  };

  const menuLeft = useRef<HTMLElement>(null);
  const btnToggle = useRef<HTMLElement>(null);
  const btnSearch = useRef<HTMLElement>(null);

  const menuToggle = () => {
    menuLeft?.current?.classList?.toggle("active");
    btnToggle?.current?.classList?.toggle("active");
  };

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const handleOnClick = (index: number) => {
    setActiveIndex(index);
  };

  const formatAddress = (address: string) => {
    if (!address) {
      return "";
    }

    return `${activeAccount?.address.slice(0, 5)}...
    ${activeAccount?.address.slice(-5)}`;
  };

  return (
    <header id="header_main" className="header_1 js-header" ref={headerRef}>
      <div className="themesflat-container">
        <div className="row">
          <div className="col-md-12">
            <div id="site-header-inner">
              <div className="wrap-box flex">
                <div id="site-logo" className="clearfix">
                  <div id="site-logo-inner">
                    <Link href="/" rel="home" className="">
                      <Image
                        className="logo-dark"
                        id="logo_header"
                        src={logodark}
                        alt="nft-gaming"
                      />
                      <Image
                        className="logo-light"
                        id="logo_header"
                        src={logodark}
                        alt="nft-gaming"
                      />
                    </Link>
                  </div>
                </div>
                <div
                  className="mobile-button"
                  ref={btnToggle as React.RefObject<HTMLDivElement>}
                  onClick={menuToggle}
                >
                  <span></span>
                </div>
                <nav id="main-nav" className="main-nav" ref={menuLeft}>
                  <ul id="menu-primary-menu" className="menu">
                    {menus.map(
                      (data, index) =>
                        !data.author && (
                          <li key={index} onClick={() => handleOnClick(index)}>
                            <Link
                              className={
                                pathname === data.links
                                  ? "active-menu"
                                  : "menu-market"
                              }
                              href={data.links}
                            >
                              {data.name}
                            </Link>
                          </li>
                        )
                    )}
                    {menus.map(
                      (data, index) =>
                        isActive &&
                        data.author && (
                          <li key={index} onClick={() => handleOnClick(index)}>
                            <Link
                              className={
                                pathname === data.links
                                  ? "active-menu"
                                  : "menu-market"
                              }
                              href={data.links}
                            >
                              {data.name}
                            </Link>
                          </li>
                        )
                    )}
                  </ul>
                </nav>
                <div className="flat-search-btn flex">
                  {isActive ? (
                    <Dropdown>
                      <Dropdown.Toggle
                        split={false}
                        as={"div"}
                        style={{ cursor: "pointer" }}
                      >
                        <Image
                          style={{ borderRadius: "7px", marginTop: "5px" }}
                          className=""
                          width={40}
                          height={40}
                          src={currentWalletProvider?.metadata.icon ?? ""}
                          alt="avatar"
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu style={{ margin: 0 }}>
                        <Dropdown.Item>
                          <div className="d-flex align-items-center copy-text justify-content-between menu-item-rewrite">
                            <span>
                              {formatAddress(activeAccount?.address ?? "")}
                            </span>
                            <span
                              className="ml-2"
                              onClick={() =>
                                copyToClipboard(activeAccount?.address ?? "")
                              }
                            >
                              <i className="fal fa-copy"></i>
                            </span>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <div className="menu-item-rewrite">
                            Balance: {walletBalance} ALGO
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                          <div
                            className="menu-item-rewrite"
                            onClick={() => router.push("/me")}
                          >
                            <i className="fab fa-accusoft mr-1"></i>
                            <span> My items</span>
                          </div>
                        </Dropdown.Item>

                        <Dropdown.Item>
                          <div
                            className="menu-item-rewrite"
                            onClick={() => setComingSoonModal(true)}
                          >
                            <i className="fas fa-pencil-alt mr-1"></i>
                            <span> Edit Profile</span>
                          </div>
                        </Dropdown.Item>

                        <Dropdown.Item>
                          <div
                            className="menu-item-rewrite mr-1"
                            id="logout"
                            onClick={() => {
                              currentWalletProvider?.disconnect();
                              router.push("/");
                            }}
                          >
                            <i className="fal fa-sign-out"></i>
                            <span> Logout</span>
                          </div>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <div className="sc-btn-top mg-r-12" id="site-header">
                      <Link
                        href="/wallet-connect-algorand"
                        className="sc-button header-slider style style-1 wallet fl-button pri-1"
                      >
                        <span>Wallet connect</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ComingSoonModal
        onHide={() => setComingSoonModal(false)}
        show={comingSoonModal}
      />
      <DarkMode />
    </header>
  );
};

export default Header;
