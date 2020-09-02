import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import useFetch from "../common/hooks/useFetch";
import getAbout from "../common/api/getAbout";
import ReactHtmlParser from "react-html-parser";
import LoadingSpinner from "../components/LoadingSpinner";
import RequestStatus from "../components/RequestStatus";

About.propTypes = {};

function About(props) {
  const { isLoading, data, status, send } = useFetch(getAbout);
  useEffect(() => {
    send();
  }, []);
  return (
    <div className="content">
      <LoadingSpinner isLoading={isLoading} />
      <RequestStatus status={status} />
      {!isLoading && data && ReactHtmlParser(data.content)}
    </div>
  );
}

export default About;
