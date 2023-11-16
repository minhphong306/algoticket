import widgetSidebarData from "@/assets/fake-data/data-widget-sidebar";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Explore from "@/components/layouts/explore-04/Explore";
import Link from "next/link";

const Explore04 = () => {
  return (
    <div>
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Explore 4</h1>
              </div>
              <div className="breadcrumbs style2">
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="#">Explore</Link>
                  </li>
                  <li>Explore 4</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Explore data={widgetSidebarData} />
      <Footer />
    </div>
  );
};

export default Explore04;
