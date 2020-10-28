import React from "react";
import loader from "./Loaders";

const DummyData = ({ required = 5 }) => {
  let d = [];
  for (let i = 0; i < required; i++) {
    d.push(
      <div key={i}>
        <div className="dummy_news_container">{loader.BarLoader()}</div>
        <br />
      </div>
    );
  }
  return d;
};

export default DummyData;
