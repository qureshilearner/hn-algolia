import React from "react";
import { withRouter } from "react-router-dom";
import * as querystring from "query-string";
import { Meta, Title } from "./Route";

class Show extends React.Component {
  render() {
    const { pathname } = this.props.location;
    const q = querystring.parse(this.props.location.pathname);
    console.log(pathname, q);
    const comments = [1, 1];
    let a;
    // if (q !== undefined) console.log(q);
    return (
      <>
        <div className="news_container">
          {/*check comments.length > 0*/ (a = comments.length > 0)}
          <Title _id="123" desc="Show HN: Home" url="http://www.google.com" />
          <Meta
            _id="123"
            visibility={{
              _points: true,
              _time: true,
              _comments: a ? true : false,
              _discuss: !a ? true : false,
            }}
            points="1000"
            author="Author"
            post_at="14 hours ago"
            noOfComments={comments.length}
          />
        </div>
      </>
    );
  }
}

export default withRouter(Show);
