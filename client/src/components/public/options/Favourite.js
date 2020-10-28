import React from "react";
import { withRouter } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

const Favourite = ({ _id, visible = false, history }) => {
  let favorites = () => {
    console.log("fvourites", _id);
    history.push(`/comments?id=${_id}`);
  };
  return (
    <>
      {visible && (
        <>
          |
          <span className="desc" onClick={favorites}>
            <FaRegHeart className="icon cicon" />
            Fvorite{" "}
          </span>
        </>
      )}
    </>
  );
};

export default withRouter(Favourite);
