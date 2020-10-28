import React from "react";
import { withRouter } from "react-router-dom";
import * as querystring from "query-string";
import { Meta, Title } from "./Route";
import DummyData from "../DummyData";

class Ask extends React.Component {
  render() {
    const { pathname } = this.props.location;
    const { q } = querystring.parse(pathname);
    console.log(pathname);
    let a;
    if (this.props.data) {
      return (
        <>
          {this.props.data.map(
            ({ _id, title, points, author, post_at, url }, key) => (
              <div className="news_container" key={key}>
                {(a = this.hasOwnProperty("comments") ? true : false)}
                <Title _id={_id} desc={title} url={url} />
                <Meta
                  _id={_id}
                  visibility={{
                    _points: true,
                    _time: true,
                    _comments: a ? true : false,
                    _discuss: !a ? true : false,
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

export default withRouter(Ask);
