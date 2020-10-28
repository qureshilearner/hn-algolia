import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";
import * as querystring from "query-string";
import { FaHome } from "react-icons/fa";
import {
  News,
  New,
  Past,
  NewComments,
  Ask,
  Show,
  Jobs,
} from "./navRoutes/Route";
import authService from "../../services/authService";

class Home extends Component {
  axiosCancelSource = axios.CancelToken.source();
  state = {
    data: this.props.data ? this.props.data : null,
  };
  componentDidMount() {
    document.title = "Home";
    // document.querySelector("link[rel='shortcut icon']").href = <FaHome />;
    // this.getNews();
    console.log(this.props.data);
  }

  componentWillMount() {
    authService.getUser() !== null &&
      this.setState({ data: null }, () => this.getNews());
    // : null;
  }

  getNews() {
    axios
      .get("/news/newsPost", { cancelToken: this.axiosCancelSource.token })
      .then((res) => {
        this.setState({ data: res.data.news });
        console.log("From Home", res.data);
      })
      .catch((err) => console.log(err));
  }

  componentWillUnmount() {
    this.axiosCancelSource.cancel("Component unmounted.");
  }

  render() {
    const { search } = this.props.location;
    const { q } = querystring.parse(search);
    if (q !== undefined) console.log(q);
    let { data } = this.state;
    return (
      <>
        <div className="main">
          <Route path="/newest" component={() => <New data={data} />} />
          {/*new or all*/}
          <Route path="/front" component={() => <Past data={data} />} />
          {/*past*/}
          <Route path="/newcomments" component={NewComments} />
          {/*comments or threads*/}

          {/*comments or threads*/}
          <Route path="/ask" component={() => <Ask data={data} />} />
          <Route path="/show" component={() => <Show data={data} />} />
          <Route path="/jobs" component={() => <Jobs data={data} />} />
          <Route path="/" exact component={() => <News data={data} />} />
        </div>
        <div className="otherNews">
          <h1>Home</h1>
          <FaHome />
        </div>
      </>
    );
  }
}

export default withRouter(Home);
