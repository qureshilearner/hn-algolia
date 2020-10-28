import React from "react";
import { withRouter } from "react-router-dom";
// import * as querystring from "query-string";
import { Meta, Title } from "./Route";
import DummyData from "../DummyData";

class Past extends React.Component {
  render() {
    // const { pathname } = this.props.location;
    // const { q } = querystring.parse(pathname);
    // console.log(pathname);
    // if (q !== undefined) console.log(q);
    let a;
    if (this.props.data) {
      return (
        <>
          {this.props.data.map(
            ({ _id, title, url, points, author, post_at }, key) => (
              <div className="news_container" key={key}>
                {(a = this.hasOwnProperty("comments"))}
                <Title _id={_id} desc={title} url={url} from={true} />
                <Meta
                  _id={_id}
                  visibility={{
                    _points: true,
                    _time: true,
                    _hide: true,
                    _comments: true,
                  }}
                  points={points}
                  author={author}
                  post_at={post_at}
                  noOfComments={a && this.comments.length}
                />
              </div>
            ),
          )}
        </>
      );
    } else {
      return <DummyData />;
    }
  }
}

export default withRouter(Past);
