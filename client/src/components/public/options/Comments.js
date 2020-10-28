import React from "react";
import { FaRegComments } from "react-icons/fa";
import { withRouter } from "react-router-dom";

const Comments = ({ _id, commentsCount = 0, visible = false, history }) => {
  let getComments = () => {
    console.log("comments", _id);
    history.push(`/comments?id=${_id}`);
  };
  return (
    <>
      {visible && (
        <>
          |
          <span
            style={{ margin: "0" }}
            onClick={getComments}
            className="comments"
          >
            &nbsp;
            <FaRegComments className="icon cicon" /> {/* {commentsCount && ( */}
            <span className="points comments">{commentsCount}</span>
            {/* )} */}
            comments
          </span>
        </>
      )}
    </>
  );
};

export default withRouter(Comments);
