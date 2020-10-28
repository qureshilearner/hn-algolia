import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import * as querystring from "query-string";
import axios from "axios";
import authService from "../../services/authService";
import {
  FaAlgolia,
  // FaHackerNews,
  FaComments,
  FaLifeRing,
  FaRegHandPaper,
  FaQuestion,
  FaSignInAlt,
  FaSignOutAlt,
  FaSearch,
  FaVoteYea,
} from "react-icons/fa";

import { MdFiberNew, MdSkipPrevious } from "react-icons/md";

class Navbar extends Component {
  state = {
    user: null,
    settings: "",
    keywords: "",
  };

  componentWillMount() {
    // this.getUser();
    this.fetchUser();
  }

  componentWillUnmount() {
    this.setState({ keywords: "" });
  }

  fetchUser() {
    axios
      .get("/author/profile")
      .then((res) => this.setState({ user: res.data }))
      .catch((e) => console.log(e));
  }

  getUser() {
    let { user } = this.state;
    let bool = user !== null && authService.getUser() !== null;
    // console.log(bool);
    if (bool) {
      !user.success && this.fetchUser();
    } else {
      return null;
    }
  }

  render() {
    this.getUser();

    let { pathname } = this.props.location;
    return (
      <div>
        <nav>
          <header className="navHeader">
            <FaAlgolia className="headIcon" />
            HN Algolia
          </header>
          {pathname === "/" ? (
            <div className="serachBox">
              {this.checkQuery()}
              <FaSearch className="search-icon" />
              <input
                value={this.state.keywords}
                className="seo"
                autoFocus
                placeholder="Search stories by title, url or author"
                onChange={this.search}
              />
            </div>
          ) : (
            <>
              <NavLink
                to="/newest"
                activeClassName="activeNavLink"
                className="navLink"
                exact
              >
                <MdFiberNew className="navIcon" />
                New
              </NavLink>
              <NavLink
                to="/front"
                activeClassName="activeNavLink"
                className="navLink"
                exact
              >
                <MdSkipPrevious className="navIcon" />
                Past
              </NavLink>
              <NavLink
                to="/newcomments"
                activeClassName="activeNavLink"
                className="navLink"
              >
                <FaComments className="navIcon" />
                Comments
              </NavLink>
              <NavLink
                to="/ask"
                activeClassName="activeNavLink"
                className="navLink"
              >
                <FaQuestion className="navIcon" />
                Ask
              </NavLink>
              <NavLink
                to="/show"
                activeClassName="activeNavLink"
                className="navLink"
              >
                <FaVoteYea className="navIcon" />
                Show
              </NavLink>
              <NavLink
                to="/jobs"
                activeClassName="activeNavLink"
                className="navLink"
              >
                <FaLifeRing className="navIcon" />
                Jobs
              </NavLink>
              <NavLink
                to="/submit"
                activeClassName="activeNavLink"
                className="navLink"
              >
                <FaRegHandPaper className="navIcon" />
                Submit
              </NavLink>
            </>
          )}
          {this.state.user !== null && (
            <div
              style={{
                display: "flex",
                flex: "auto",
                justifyContent: "flex-end",
              }}
            >
              {this.state.user.success ? (
                <div>
                  <span
                    onClick={this._togle}
                    className="navLink"
                    style={{ padding: "10px", margin: 0 }}
                  >
                    <FaSignOutAlt className="navIcon" />
                    {this.state.user.user.userName}
                  </span>
                  {this.state.settings}
                </div>
              ) : (
                <NavLink
                  to="/author/login"
                  className="navLink btn-login"
                  style={{ padding: "10px", flexDirection: "row-reverse" }}
                >
                  <FaSignInAlt className="navIcon" />
                  Login
                </NavLink>
              )}
            </div>
          )}
        </nav>
      </div>
    );
  }

  checkQuery = () => {
    let { search } = this.props.location;
    let { query } = querystring.parse(search);
    console.log(query, query === undefined);
    if (query !== undefined && this.state.keywords.trim() !== query) {
      this.setState({ keywords: query });
    }
  };

  _togle = (_) => {
    this.state.settings !== ""
      ? this.setState({ settings: "" })
      : this.setState({
          settings: (
            <div className="toggle">
              <span>Profile</span>
              <span onClick={this.logout}>Logout</span>
            </div>
          ),
        });
  };

  search = (e) => {
    const { value } = e.target;
    this.setState({ keywords: value }, (_) =>
      value !== ""
        ? this.props.history.push(`?query=${value}`)
        : this.props.history.push(`/`)
    );
  };

  logout = () => {
    axios
      .get("/author/logout")
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          authService.signOut();
          this.setState({ settings: "", user: "" });
        }
      })
      .catch((e) => console.log(e));
  };
}

export default withRouter(Navbar);
