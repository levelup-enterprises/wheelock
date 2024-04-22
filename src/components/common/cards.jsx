/* eslint-disable import/no-anonymous-default-export */
import React from "react";

const Card = ({ img, title, text, link, linkText, ...rest }) => (
  <div className="card" {...rest}>
    <img src={img} alt={title} />
    <h3>{title}</h3>
    <p>{text}</p>
    <a href={link}>{linkText}</a>
  </div>
);

const Box = ({ img, title, text, link, linkText, ...rest }) => (
  <div className="card-box" {...rest}>
    <img src={img} alt={title} />
    <h3 className="all-caps">{title}</h3>
    <p>{text}</p>
    <a href={link}>{linkText}</a>
  </div>
);

const Quote = ({ img, quote, owner, title, ...rest }) => (
  <div className="card-quote" {...rest}>
    <img className="round-mask" src={img} alt={title} />
    <p className="quote">{quote}</p>
    <h3>{owner}</h3>
    <p className="light mt-0">{title}</p>
  </div>
);

const Section = ({
  img,
  title,
  subTitle,
  subject,
  subjectSubTitle,
  text,
  button,
  buttonClass,
  link,
  background,
  swap,
  ...rest
}) => {
  return (
    <div
      className={`card-section flex-around ${swap ? "swap" : ""} ${
        background ? background : "transparent"
      }`}
      {...rest}
    >
      <div className="title-wrapper">
        <img className="top-round-mask" src={img} alt={title} />
        {(title || subTitle) && (
          <div className="title-container">
            <h4 className="all-caps mb-1">{title}</h4>
            <p className="mt-0">{subTitle}</p>
          </div>
        )}
      </div>
      <div className="feature-wrapper">
        <h1 className="all-caps">{subject}</h1>
        <p className="mt-0">{subjectSubTitle}</p>
        <p>{text}</p>
        <a
          href={link}
          className={`btn ${buttonClass ? buttonClass : "bw"} ${
            swap ? "mb-3" : ""
          }`}
        >
          {button}
        </a>
      </div>
    </div>
  );
};

const SectionList = ({
  img,
  list,
  title,
  subTitle,
  subject,
  text,
  button,
  buttonClass,
  link,
  background,
  swap,
  ...rest
}) => {
  return (
    <div
      className={`card-section flex-around card-list ${swap ? "swap" : ""} ${
        background ? background : "transparent"
      }`}
      {...rest}
    >
      <div className="title-wrapper">
        <img className="top-round-mask" src={img} alt={title} />
        {(title || subTitle) && (
          <div className="title-container">
            <h4 className="all-caps mb-1">{title}</h4>
            <p className="mt-0">{subTitle}</p>
          </div>
        )}
      </div>
      <div className="feature-wrapper">
        <h1 className="all-caps">{subject}</h1>
        <p>{text}</p>
        {list && (
          <ul>
            {list.map((v, i) => (
              <li key={i}>{v}</li>
            ))}
          </ul>
        )}
        {button && (
          <a
            href={link}
            className={`btn ${buttonClass ? buttonClass : "bw"} ${
              swap ? "mb-3" : ""
            }`}
          >
            {button}
          </a>
        )}
      </div>
    </div>
  );
};

export default {
  Card,
  Box,
  Quote,
  Section,
  SectionList,
};
