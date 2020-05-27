import React from "react";
import PropTypes from "prop-types";
import useFetch from "../common/useFetch";
import getAbout from "../common/api/getAbout";
import ReactHtmlParser from "react-html-parser";
import LoadingSpinner from "../components/LoadingSpinner";
import RequestStatus from "../components/RequestStatus";

About.propTypes = {};

function About(props) {
  const { isLoading, data, status } = useFetch(getAbout, []);
  return (
    <div className="content">
      <LoadingSpinner isLoading={isLoading} />
      <RequestStatus status={status} />
      {ReactHtmlParser(data.content)}
    </div>
  );
}

export default About;
