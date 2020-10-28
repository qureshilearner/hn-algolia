import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Animated } from "react-animated-css";

const AddCommentForm = ({ history, isLoggedIn }) => {
  let [showForm, setshowForm] = useState(false);
  let color = isLoggedIn ? "blue" : "red";
  return (
    <>
      <div className="fluid ui labeled button rf" tabIndex="0">
        <div
          className={`fluid ui button ${color}`}
          onClick={() =>
            isLoggedIn ? setshowForm(!showForm) : history.push("author/login")
          }
        >
          <i
            className={`${isLoggedIn ? "edit" : "sign-in"} icon`}
            style={{
              color: "white",
              opacity: ".97",
            }}
          ></i>
          {isLoggedIn ? (
            "Add Comment"
          ) : (
            <>
              You are not logged in.
              <span style={{ color: "#d3eeff" }}>Login here...</span>
            </>
          )}
        </div>
        <a className={`ui basic left pointing label ${color}`}>1,048</a>
      </div>
      {showForm && (
        <Animated animationIn="fadeIn">
          <form
            className="ui reply form rf"
            style={{ marginTop: "2px !important" }}
          >
            <div className="field">
              <textarea placeholder="type comment..." autoFocus></textarea>
            </div>
            <div className="ui blue labeled submit icon button">
              <i className="icon edit"></i> Add Reply
            </div>
          </form>
        </Animated>
      )}
    </>
  );
};

export default withRouter(AddCommentForm);
