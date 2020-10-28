import React from "react";
import { withRouter } from "react-router-dom";
// import * as querystring from "query-string";
import Meta from "./Meta";
import Title from "./Title";
import DummyData from "../DummyData";

class New extends React.Component {
  render() {
    let a;
    if (this.props.data) {
      return (
        <>
          {this.props.data.map(
            ({ _id, title, url, points, author, post_at }, key) => (
              <div className="news_container" key={key}>
                {(a = this.hasOwnProperty("comments") ? true : false)}
                <Title _id={_id} desc={title} url={url} from={true} />
                <Meta
                  _id={_id}
                  visibility={{
                    _points: true,
                    _time: true,
                    _comments: a ? true : false,
                    _discuss: !a ? true : false,
                    _hide: true,
                    _past: true,
                    _web: true,
                  }}
                  points={points}
                  author={author}
                  post_at={post_at}
                  noOfComments={a && this.comments.length}
                  search={title}
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

export default withRouter(New);
