import React from "react";
import { Upvote } from "../options/allOptions";
import { withRouter } from "react-router-dom";
import { Animated } from "react-animated-css";

const Title = ({
  _id,
  desc,
  url = null,
  from = false,
  upvoteVisible = true,
  history,
}) => {
  let { pathname } = history.location;
  let openUrl = pathname === "/";
  return (
    <Animated animationIn="fadeIn" animationOut="fadeOut">
      <div
        className="news_title"
        style={{ padding: !upvoteVisible && "0 3.2rem" }}
      >
        <Upvote _id={_id} visible={upvoteVisible} />
        {(_id && !url) || openUrl ? (
          <dfn
            className="newslink"
            onClick={() => history.push(`/comments?id=${_id}`)}
          >
            {desc}
          </dfn>
        ) : (
          <a
            className="newslink"
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {desc}
          </a>
        )}
        {url !== null && !from ? (
          <a href={url} rel="noopener noreferrer" target="_blank">
            ({modifyUrl(url)})
          </a>
        ) : (
          url !== null && (
            <span
              className="from"
              onClick={() => history.push(`/from?site=${modifyUrl(url)}`)}
            >
              ({modifyUrl(url)})
            </span>
          )
        )}
      </div>
    </Animated>
  );
};

let modifyUrl = (url) => {
  console.log(typeof url);
  let urlRegex = /^\http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\./;
  let replaceRegex = /^\http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\./g;
  if (urlRegex.test(url)) {
    url = url.replace(replaceRegex, "");
  }
  if (url.includes("/")) {
    url = url.split("/")[0];
  }
  return url;
};

export default withRouter(Title);
