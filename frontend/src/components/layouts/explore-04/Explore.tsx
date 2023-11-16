"use client";
import React from "react";
import ExploreItem from "./ExploreItem";
import todayPickData from "../../../assets/fake-data/data-today-pick";
import { Accordion } from "react-bootstrap";

interface ExploreProps {
  data: {
    id: number;
    title: string;
    content: {
      field: string;
      checked?: boolean;
    }[];
  }[];
}

const Explore = (props: ExploreProps) => {
  const data = props.data;
  return (
    <section className="tf-explore tf-section">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-12">
            <div id="side-bar" className="side-bar style-3">
              {data.map((item, index) => (
                <div
                  className="widget widget-category mgbt-24 boder-bt"
                  key={index}
                >
                  <div className="content-wg-category">
                    <Accordion key={index} defaultActiveKey={"0"}>
                      <Accordion.Item eventKey={`${index}`}>
                        <Accordion.Header>{item.title}</Accordion.Header>
                        <Accordion.Body>
                          <form action="#">
                            {item.content.map((itemm, index) => (
                              <div key={index}>
                                <label>
                                  {itemm.field}
                                  <input
                                    type="checkbox"
                                    defaultChecked={itemm.checked}
                                  />
                                  <span className="btn-checkbox"></span>
                                </label>
                                <br />
                              </div>
                            ))}
                          </form>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-xl-9 col-lg-9 col-md-12">
            <ExploreItem data={todayPickData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;
