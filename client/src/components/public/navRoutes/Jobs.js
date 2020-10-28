import React from "react";
import { withRouter } from "react-router-dom";
import * as querystring from "query-string";
import { Meta, Title } from "./Route";

class Jobs extends React.Component {
  render() {
    const { pathname } = this.props.location;
    const { q } = querystring.parse(pathname);
    console.log(pathname);
    if (q !== undefined) console.log(q);
    return (
      <>
        <div className="news_container">
          <Title
            desc="Show HN: Home"
            url="http://www.google.com"
            upvoteVisible={false}
          />
          <Meta visibility={{ _time: true }} post_at="14 hours ago" />
        </div>
        {/* <div className="news_container">
          <Title />
          <Meta />
        </div> */}
      </>
    );
  }
}

export default withRouter(Jobs);
