import React from "react";
import { ClipLoader, BarLoader } from "react-spinners";

const loader = {
  ClipLoader() {
    const style = {
      justifyContent: "center",
      // height: "-webkit-fill-available",
      // position: "absolute",
      margin: "0 -29rem 0 0",
      zIndex: 1,
      background: "rgba(165, 165, 189, 0.8)",
      // top: "5.5rem",
      alignItems: "center",
    };
    return (
      <div className="form" style={style}>
        <ClipLoader size={50} color={"#9013FE"} loading={true} />
      </div>
    );
  },
  BarLoader() {
    return <BarLoader color={"blueviolet"} width={"inherit"} />;
  },
  CommentsLoader() {
    return (
      <>
        <div class="ui placeholder">
          <div class="image header">
            <div class="medium line"></div>
            <div class="full line"></div>
          </div>
        </div>
        <div class="ui placeholder _reply">
          <div class="paragraph">
            <div class="short line"></div>
          </div>
        </div>
      </>
    );
  },
};

export default loader;
