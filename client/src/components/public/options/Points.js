import React from "react";
import { withRouter } from "react-router-dom";
import { FaRegHandPointRight } from "react-icons/fa";
const Points = ({
  _id,
  author,
  points = 0,
  visible = false,
  history,
  clickAble = false,
}) => {
  return (
    <>
      {visible && (
        <>
          <p
            className={clickAble ? "karma karma_click" : "karma"}
            onClick={() =>
              clickAble ? history.push(`/comments?id=${_id}`) : null
            }
          >
            <FaRegHandPointRight className="icon" />
            <span className="points" style={{ cursor: !clickAble && "none" }}>
              {points}
            </span>
            &nbsp;points
          </p>
          &nbsp;by&nbsp;<cite className="desc">{author} </cite>|
        </>
      )}
    </>
  );
};

export default withRouter(Points);
