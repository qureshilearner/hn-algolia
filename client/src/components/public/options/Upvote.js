import React from "react";
import { FaRegThumbsUp } from "react-icons/fa";

const Upvote = ({ _id, visible }) => {
  let voteTo = () => {
    console.log("Vote", _id);
  };
  return (
    <>
      {visible && (
        <FaRegThumbsUp className="icon" onClick={voteTo} cursor={"grab"} />
      )}
    </>
  );
};

// let voteTo = (_id) => {
//   console.log("Vote", _id);
// };

export default Upvote;
