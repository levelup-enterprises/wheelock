import React from "react";
// Charts
import Web from "./web";
import App from "./app";
import SF from "./sf";

const Comment = ({ workspace, comments }) => {
  const buildComments = () => {
    let expand = false;
    comments.length === 1 && (expand = true);
    return comments.map((v) => {
      v.link = workspace.value + "/" + v.id;
      v.expandComment = expand;
      if (workspace.type === "mixed") {
        if (v.mobile_os) {
          return <App data={v} key={v.id} />;
        } else {
          return <Web data={v} key={v.id} />;
        }
      }
      if (workspace.type === "web") {
        return <Web data={v} key={v.id} />;
      }
      if (workspace.type === "app") {
        return <App data={v} key={v.id} />;
      }
      if (workspace.type === "sf") {
        return <SF data={v} key={v.id} />;
      }
      return <></>;
    });
  };

  return buildComments();
};

export default Comment;
