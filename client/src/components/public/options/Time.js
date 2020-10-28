import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";

const Time = ({ dateTime = null, _id, history }) => {
  let _at = dateTime && moment(dateTime).format("dddd, LL, h:mm a");
  let [at, setAt] = useState(moment(dateTime).fromNow());
  // console.log(
  //   moment("2020-05-20T19:57:05.268Z").format("dddd, LL, h:mm a")
  //   moment("Tuesday, May 12, 2020").format("YYYY, MM,DD"),
  //   moment(moment().format("YYYY, MM,DD")).fromNow(),
  //   moment([2020, 4, 12]).fromNow(),
  // moment(moment().format("MMMM DD YYYY, h:mm:ss a")).fromNow()
  // moment(dateTime).format("dddd, LL, h:mm a")
  // );
  useEffect(() => {
    const interval = setInterval(() => {
      setAt(moment(dateTime).fromNow());
    }, 1000);
    return () => clearInterval(interval);
  }, [dateTime]);
  return (
    <>
      <span
        className="desc"
        title={_at}
        onClick={() => history.push(`/comments?id=${_id}`)}
      >
        {at}
      </span>
    </>
  );
};

export default withRouter(Time);
