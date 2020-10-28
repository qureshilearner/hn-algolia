import React from "react";
import { withRouter } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";

const Hide = ({ _id, visible = false, history }) => {
  let hide = () => {
    console.log("hide", _id);
    // history.push(`/comments?id=${_id}`);
    axios
      .get(`/news/hide/${_id}`)
      .then((res) => {
        res.data.success ? alert("Hide successfully!") : alert(res.data.errMsg);
      })
      .catch(() => alert("404 Not found\n Oops server not responding..."));
  };
  return (
    <>
      {visible && (
        <>
          |
          <span className="desc" onClick={hide}>
            <FaRegEyeSlash className="icon cicon" />
            Hide{" "}
          </span>
        </>
      )}
    </>
  );
};

export default withRouter(Hide);
