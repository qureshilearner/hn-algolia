import React, { Component } from "react";
import { Meta, Title } from "./Route";
// import * as querystring from "query-string";

export default class NewComments extends Component {
  render() {
    const { pathname } = this.props.location;
    console.log(pathname, this.props.location);
    return (
      <>
        <div className="news_container">
          <Meta
            visibility={{ _time: true }}
            author="Author"
            post_at="14 hours ago"
          />
          <Title _id="123" desc="Home" />
        </div>
      </>
    );
  }
}
