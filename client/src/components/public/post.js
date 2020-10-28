import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Animated } from "react-animated-css";
import ReactModal from "./Modal";
import loader from "./Loaders";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: "",
      text: "",
      errMsg: "",
      isLoading: false,
      success: false,
    };
    /* When Not Use Arrow Functions bind the values */
    //this.handleNameChange = this.handleNameChange.bind(this);
    //this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  render() {
    return (
      <>
        <div className="form-control">
          {this.onLoading()}
          <Animated animationIn="fadeIn" animationOut="fadeOut">
            <form method="post" className="form" onSubmit={this.verifyInputs}>
              <Animated
                animationIn="fadeIn"
                animationOut="fadeOut"
                animationInDelay={200}
              >
                {this.success()}
                <div className="form-div form-header">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <span style={{ margin: "-3px 0 0", color: "#fff" }}>
                      Post
                    </span>
                  </div>
                </div>
                <p className="form-error">{this.state.errMsg}</p>
                <div className="form-div">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    name="title"
                    id="title"
                    type="text"
                    className="form-input"
                    placeholder="Enter title"
                    value={this.state.title}
                    onChange={this.handleInputs}
                    onKeyUp={this.handleEnter}
                  />
                </div>
                <br />
                <div className="form-div">
                  <label htmlFor="url" className="form-label">
                    Url
                  </label>
                  <input
                    name="url"
                    id="url"
                    placeholder="Enter url"
                    className="form-input"
                    type="url"
                    value={this.state.url}
                    onChange={this.handleInputs}
                    onKeyUp={this.handleEnter}
                  />
                  {/* <p style={{ fontSize: "larger", margin: 0 }}>or</p> */}
                </div>
                <br />
                <div className="form-div">
                  <label htmlFor="text" className="form-label">
                    Text
                  </label>
                  <input
                    name="text"
                    id="text"
                    placeholder="Enter text"
                    className="form-input"
                    type="text"
                    value={this.state.text}
                    onChange={this.handleInputs}
                    onKeyUp={this.handleEnter}
                  />
                </div>
                <div
                  className="form-div"
                  style={{ textAlign: "justify", margin: ".9rem 0" }}
                >
                  <input
                    type="button"
                    value="Submit"
                    className="form-button"
                    onClick={this.verifyInputs}
                  />
                </div>
                <div className="form-div">
                  <p style={{ margin: 0, color: "white" }}>
                    Leave url blank to submit a question for discussion. If
                    there is no url, the text (if any) will appear at the top of
                    the thread.
                  </p>
                  <br />
                </div>
              </Animated>
            </form>
          </Animated>
        </div>
      </>
    );
  }

  handleInputs = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleEnter = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      this.verifyInputs();
    }
  };

  verifyInputs = () => {
    const { title, url } = this.state;
    let regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)/g;
    let matchUrl = regex.test(url.trim());
    console.log(matchUrl);
    if (title.trim() !== "" && (url.trim() === "" || matchUrl)) {
      this.postNews();
    } else if (title.trim() === "") {
      this.setState({ errMsg: "Title is required" });
    } else if (!matchUrl) {
      this.setState({ errMsg: "Incorrect Url" });
    }
  };

  postNews = () => {
    this.setState({ isLoading: true, success: false });
    let { title, url, text } = this.state;
    axios
      .post("/news/newsPost", {
        title,
        url,
        text,
      })
      .then((res) =>
        res.data.success
          ? this.setState({ isLoading: false, success: true })
          : this.setState({
              errMsg: res.data.errMsg,
              isLoading: false,
              success: false,
            }),
      )
      .catch((_) =>
        this.setState({
          errMsg: "!Oops Server Not Responding",
          isLoading: false,
        }),
      );
  };

  onLoading = (_) => {
    return this.state.isLoading ? <>{loader.ClipLoader()}</> : "";
  };

  success = () => {
    let { success } = this.state;
    return (
      success && (
        <ReactModal
          isOpen={success}
          routeTo={`/`}
          onRequestClose={() => console.log(success)}
        >
          <p
            style={{
              color: "lime",
              fontSize: "2rem",
              fontWeight: "600",
              margin: "15px",
            }}
          >
            Posted Successfully...
          </p>
        </ReactModal>
      )
    );
  };
}

export default withRouter(Post);
