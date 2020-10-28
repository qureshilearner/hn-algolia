import React from "react";
import { withRouter } from "react-router-dom";
import { Animated } from "react-animated-css";
import {
  Points,
  Time,
  Hide,
  Comments,
  Discuss,
  Favourite,
  Past,
  Web,
} from "../options/allOptions";

const Meta = ({
  _id,
  points,
  author,
  post_at,
  noOfComments,
  visibility,
  search,
}) => {
  // console.log(visibility);
  let {
    _points,
    _pointsClickAble,
    _time,
    _comments,
    _hide,
    _discuss,
    _favourite,
    _past,
    _web,
  } = visibility;
  return (
    <Animated
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInDelay={250}
    >
      <div className="news_meta" style={{ padding: "0 4.2rem" }}>
        <Points
          _id={_id}
          points={points}
          clickAble={_pointsClickAble}
          author={author}
          visible={_points}
        />
        <Time dateTime={post_at} _id={_id} visible={_time} />
        <Hide _id={_id} visible={_hide} />
        <Favourite _id={_id} visible={_favourite} />
        <Past visible={_past} query={search} />
        <Web visible={_web} query={search} />
        <Discuss _id={_id} visible={_discuss} />
        <Comments _id={_id} commentsCount={noOfComments} visible={_comments} />
      </div>
    </Animated>
  );
};

export default withRouter(Meta);
