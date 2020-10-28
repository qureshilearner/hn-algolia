import React from "react";
import { withRouter } from "react-router-dom";
import * as querystring from "query-string";
import Meta from "./Meta";
import Title from "./Title";
import DummyData from "../DummyData";

class News extends React.Component {
  render() {
    let { query } = querystring.parse(this.props.location.search);
    console.log(query);
    if (this.props.data) {
      // let hasComments = {}.hasOwnProperty.call(this.props.data, "comments");
      return (
        <>
          {this.props.data.map(
            ({ _id, title, url, points, author, post_at }, key) => (
              <div className="news_container" key={key}>
                <Title _id={_id} desc={title} url={url} upvoteVisible={false} />
                <Meta
                  _id={_id}
                  visibility={{
                    _points: true,
                    _pointsClickAble: true,
                    _time: true,
                    _comments: true,
                  }}
                  points={points}
                  author={author}
                  post_at={post_at}
                  noOfComments={
                    this.hasOwnProperty("comments") ? this.comments.length : 0
                  }
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

export default withRouter(News);
