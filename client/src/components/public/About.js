import React, { Component } from "react";
import axios from "axios";

class About extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      request: "amsna",
      resData: [],
    };
  }

  componentDidMount() {
    document.title = "About Us";
    this._isMounted = true;
    if (this._isMounted)
      axios
        .get("/author/5da4577da4814f16584badb1")
        .then((res) => {
          if (this._isMounted) this.setState({ resData: [res.data] });
        })
        .catch((err) => this.setState({ resData: [err] }));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ request: e.target.value });
    console.log(this.state.request);
  };

  render() {
    return (
      <div>
        <h1>About</h1>
        <a onClick={this.handleSubmit} href="/d=3">
          Request
        </a>
        {this.state.resData[0]
          ? this.state.resData.map(({ _id, id, express }) => (
              <div key={_id}>
                {_id} {id} {express}
              </div>
            ))
          : "No Data Found"}
      </div>
    );
  }
}

export default About;
