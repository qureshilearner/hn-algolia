import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/public/Home";
// import Sidebar from "./components/public/Sidebar";
// import ProtectedHome from "./secure/ProtectedHome";
// import PrivateRoute from "./secure/PrivateRoute";
import Logout from "./secure/Logout";
// import icon from "./Images/typing-indicator.gif";
import A from "./components/public/bbc-news";
import Navbar from "./components/public/Navbar";
import AccountsRouters from "./secure/AccountsRouters";
// import Comments from "./components/comments";
import Post from "./components/public/post";

import "./Style/App.css";
import "./Style/forms.css";
import "./Style/animate.css";
import { FaHackerNews } from "react-icons/fa";
import NewsComments from "./components/public/comments/NewsComments";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }
  getNews = () => {
    axios
      .get("/news/newsPost")
      .then((res) => {
        this.setState({ data: res.data.news }, () =>
          console.log("From App.js Data From Server", res),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentWillMount() {
    this.getNews();
    let icon = FaHackerNews({ color: "blue" });
    document.querySelector("link").href = icon;
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          {/* <Sidebar /> */}
          {/* <header className="App-header">Header</header> */}
          <div className="components">
            <Switch>
              {/* <PrivateRoute path="/submit" component={Post} /> */}
              <Route path="/submit" component={Post} />
              {/* <PrivateRoute path="/private" component={ProtectedHome} /> */}
              <Route path="/author" component={AccountsRouters} />{" "}
              <Route path="/logout" component={Logout} />
              <Route path="/hooks" component={A} />
              {/* <Route path="/comments" component={Comments} /> */}
              <Route
                path="/comments"
                component={() => <NewsComments data={this.state.data} />}
              />
              <Route
                path="/"
                component={() => <Home data={this.state.data} />}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
