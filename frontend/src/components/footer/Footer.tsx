"use client";
import * as React from "react";
// import logodark from "../../assets/images/logo/logo_dark.png";
import logofooter from "../../assets/images/logo/Logo3.png";
import Link from "next/link";
import Image from "next/image";
const Footer = () => {
  const accountList = [
    {
      title: "Authors",
      link: "/authors-01",
    },
    {
      title: "Collection",
      link: "/wallet-connect-algorand",
    },
    {
      title: "Author Profile",
      link: "/edit-profile",
    },
    {
      title: "Create Item",
      link: "/create-item",
    },
  ];
  const resourcesList = [
    {
      title: "Help & Support",
      link: "/help-center",
    },
    {
      title: "Live Auctions",
      link: "/live-auctions",
    },
    {
      title: "Item Details",
      link: "/item-details-01",
    },
    {
      title: "Activity",
      link: "/activity-01",
    },
  ];
  const companyList = [
    {
      title: "Explore",
      link: "/explore-01",
    },
    {
      title: "Contact Us",
      link: "/contact-01",
    },
    {
      title: "Our Blog",
      link: "/blog",
    },
    {
      title: "FAQ",
      link: "/faq",
    },
  ];
  const socialList = [
    {
      icon: "fab fa-facebook",
      link: "#",
    },
    {
      icon: "fab fa-twitter",
      link: "#",
    },
    {
      icon: "fab fa-google",
      link: "#",
    },
  ];

  const [isVisible, setIsVisible] = React.useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div>
      <footer id="footer" className="footer-light-style clearfix bg-style">
        <div className="themesflat-container">
          <div className="widget d-flex flex-column align-items-center">
            <div className="logo-footer" id="logo-footer">
              <Link href="/">
                <Image
                  className="logo-dark"
                  id="logo_footer"
                  src={logofooter}
                  alt="nft-gaming"
                />
                <Image
                  className="logo-light"
                  id="logo_footer"
                  src={logofooter}
                  alt="nft-gaming"
                />
              </Link>
            </div>
            <p className="sub-widget-logo">
              An event ticketing marketplace helping event organisers <br />
              foster a closer connection with fans and sell more tickets.
            </p>
            <div className="widget-social style-1 mg-t32">
              <ul>
                {socialList.map((item, index) => (
                  <li key={index}>
                    <Link href={item.link}>
                      <i className={item.icon}></i>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
      {isVisible && (
        <Link onClick={scrollToTop} href="#" id="scroll-top"></Link>
      )}
    </div>
  );
};

export default Footer;
