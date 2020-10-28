import React from "react";
import { withRouter } from "react-router-dom";
import { GoCommentDiscussion } from "react-icons/go";
const Discuss = ({ _id, visible = false, history }) => {
  let discussion = () => {
    console.log("discussion", _id);
    history.push(`/comments?id=${_id}`);
  };
  return (
    <>
      {visible && (
        <>
          |
          <span className="desc" onClick={discussion}>
            <GoCommentDiscussion className="icon cicon" />
            Discuss
          </span>
        </>
      )}
    </>
  );
};

export default withRouter(Discuss);
