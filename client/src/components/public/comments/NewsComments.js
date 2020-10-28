import React, { useState } from "react";
import { withRouter } from "react-router-dom";
// import loader from "../Loaders";
import Title from "../navRoutes/Title";
import Meta from "../navRoutes/Meta";
import authService from "../../../services/authService";
import AddCommentForm from "./AddComment";
// import "../Style/Semantic_ui.css";

const NewsComments = ({ history }) => {
  let loggedIn = authService.getUser() !== null;
  let { search } = history.location;
  console.log(search);
  return (
    <div className="ui container">
      <div className="news_container">
        <Title _id={"36226"} desc={"title"} url={"url"} />
        <Meta
          _id={"36226"}
          visibility={{
            _points: true,
            _pointsClickAble: true,
            _time: true,
            _comments: true,
          }}
          points={20}
          author={"author"}
          post_at={"post_at"}
        />
      </div>
      <AddCommentForm isLoggedIn={loggedIn} />
      <div className="ui container large comments cc">
        {/* <loader.CommentsLoader /> */}
        <div className="comment">
          <span className="avatar uavt">m</span>
          <div className="content">
            <span className="author marg">Matt</span>
            <div className="metadata">
              <span className="date">Today at 5:42PM</span>
            </div>
            <div className="text">How artistic!</div>
            <div className="actions">
              <span className="reply marg">
                <AddCommentForm isLoggedIn={loggedIn} />
              </span>
            </div>
          </div>
        </div>
        <div className="comment">
          <span className="avatar uavt">m</span>
          <div className="content">
            <span className="author marg">Matt</span>
            <div className="metadata">
              <span className="date">Today at 5:42PM</span>
            </div>
            <div className="text">How artistic!</div>
            <div className="actions">
              <span className="reply marg">Reply</span>
            </div>
          </div>
        </div>
        <div className="comment">
          <span className="avatar uavt">m</span>
          <div className="content">
            <span className="author marg">Matt</span>
            <div className="metadata">
              <span className="date">Today at 5:42PM</span>
            </div>
            <div className="text">How artistic!</div>
            <div className="actions">
              <span className="reply marg">Reply</span>
            </div>
          </div>
        </div>
        <div className="comment">
          <span className="avatar uavt">m</span>
          <div className="content">
            <span className="author marg">Matt</span>
            <div className="metadata">
              <span className="date">Today at 5:42PM</span>
            </div>
            <div className="text">How artistic!</div>
            <div className="actions">
              <span className="reply marg">Reply</span>
            </div>
          </div>
        </div>
        {/* <div className="comment">
          <a href="#" className="avatar">
            <img alt="image" src={require("../Images/Black_bck.png")} />
          </a>
          <div className="content">
            <a href="#" className="author">
              Elliot Fu
            </a>
            <div className="metadata">
              <span className="date">Yesterday at 12:30AM</span>
            </div>
            <div className="text">
              <p>This has been very useful for my research. Thanks as well!</p>
            </div>
            <div className="actions">
              <a href="#" className="reply">
                Reply
              </a>
            </div>
          </div>
          <div className="comments">
            <div className="comment">
              <a href="#" className="avatar">
                <img alt="image" src={require("../Images/Black_bck.png")} />
              </a>
              <div className="content">
                <a href="#" className="author">
                  Jenny Hess
                </a>
                <div className="metadata">
                  <span className="date">Just now</span>
                </div>
                <div className="text">Elliot you are always so right :)</div>
                <div className="actions">
                  <a href="#" className="reply">
                    Reply
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="comment">
          <a href="#" className="avatar">
            <img alt="image" src={require("../Images/Black_bck.png")} />
          </a>
          <div className="content">
            <a href="#" className="author">
              Joe Henderson
            </a>
            <div className="metadata">
              <span className="date">5 days ago</span>
            </div>
            <div className="text">Dude, this is awesome. Thanks so much</div>
            <div className="actions">
              <a href="#" className="reply">
                Reply
              </a>
            </div>
          </div>
        </div>
         */}
      </div>
    </div>
  );
};

export default withRouter(NewsComments);
