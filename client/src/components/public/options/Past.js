import React from "react";
import { withRouter } from "react-router-dom";
import { MdFirstPage } from "react-icons/md";
const Past = ({ visible = false,query, history }) => {
  let search = () => {
    console.log("Past");
    history.push(`/?query=${query}`);
  };
  return (
    <>
      {visible && (
        <>
          |
          <span className="desc" onClick={search}>
            <MdFirstPage
              style={{ fontSize: "22px", margin: " 0 -5px -5px" }}
              className="icon cicon"
            />
            Past{" "}
          </span>
        </>
      )}
    </>
  );
};

export default withRouter(Past);
