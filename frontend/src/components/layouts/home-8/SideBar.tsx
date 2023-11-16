"use client";
import React, { useState } from "react";
import { Accordion } from "react-bootstrap";

const SideBar = () => {
  const [dataCate] = useState([
    {
      title: "Categories",
      content: [
        {
          field: "Art",
          checked: true,
        },
        {
          field: "Music",
          checked: false,
        },
        {
          field: "Domain Names",
          checked: false,
        },
        {
          field: "Virtual Worlds",
          checked: false,
        },
        {
          field: "Trading Cards",
          checked: false,
        },
        {
          field: "Collectibles",
          checked: false,
        },
        {
          field: "Sports",
          checked: false,
        },
        {
          field: "Utility",
          checked: true,
        },
      ],
    },
    {
      title: "File Types",
      content: [
        {
          field: "Image",
          checked: true,
        },
        {
          field: "Video",
          checked: false,
        },
        {
          field: "Audio",
          checked: false,
        },
      ],
    },
    {
      title: "Currencies",
      content: [
        {
          field: "BNB",
          checked: true,
        },
        {
          field: "BUSD",
          checked: false,
        },
        {
          field: "ETH",
          checked: false,
        },
      ],
    },
  ]);
  return (
    <div id="side-bar" className="side-bar style-3 item">
      <div className="widget widget-filter style-1 mgbt-0">
        <div className="header-widget-filter">
          <h4 className="title-widget">Filter</h4>
        </div>
      </div>
      <div className="divider"></div>
      <div className="wrap-category">
        {dataCate.map((item, index) => (
          <div key={index} className="widget widget-category boder-bt">
            <Accordion key={index} defaultActiveKey={"0"}>
              <Accordion.Item eventKey={`${index}`}>
                <Accordion.Header>{item.title}</Accordion.Header>
                <Accordion.Body>
                  <form action="#">
                    {item.content.map((itemm, index) => (
                      <div key={index}>
                        <label>
                          <span>{itemm.field}</span>
                          <span className="pst-re">
                            <input
                              type="checkbox"
                              defaultChecked={itemm.checked}
                            />
                            <span className="btn-checkbox"></span>
                          </span>
                        </label>
                        <br />
                      </div>
                    ))}
                  </form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
