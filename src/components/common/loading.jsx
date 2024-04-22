import React from "react";
import gif from "../../assets/images/loading.gif";

const Loading = ({ message }) => {
  return (
    <>
      {message ? (
        <div className="loading message">
          <img src={gif} alt="Loading" />
          <h3>{message}</h3>
        </div>
      ) : (
        <div className="loading">
          <img src={gif} alt="Loading" />
        </div>
      )}
    </>
  );
};

export default Loading;
