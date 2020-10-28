import React, { useState, useEffect } from "react";

const A = ({ initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    fetch(
      //"https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=d54ec84027d54a8a8bfa0e78fed4bcb7"
      "https://newsapi.org/v2/top-headlines?sources=time&apiKey=d54ec84027d54a8a8bfa0e78fed4bcb7"
    )
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
    count > 0 ? (document.title = count) : (document.title = "Hooks");
  });

  useEffect(() => {
    const handleResize = _ => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <div>{width}</div>
      <div></div>
    </div>
  );
};

export default A;
