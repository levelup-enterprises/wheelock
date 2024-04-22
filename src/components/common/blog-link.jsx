import React from "react";
import { Link } from "@reach/router";

const BlogLink = ({ title, date, link }) => {
  return (
    <div className="blog-link">
      <Link to={link}>{title}</Link>
      <p>{date}</p>
    </div>
  );
};

export default BlogLink;
