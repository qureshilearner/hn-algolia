import React from "react";
import { withRouter } from "react-router-dom";
import { MdLanguage } from "react-icons/md";
const Web = ({ visible = false, query, history }) => {
  // let q = query.split(" ").join("%20");
  return (
    <>
      {visible && (
        <>
          |
          <span className="desc">
            <MdLanguage className="icon cicon" />
            <a
              href={`http://www.google.com/search?q=${query}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Web
            </a>
          </span>
        </>
      )}
    </>
  );
};

export default withRouter(Web);
