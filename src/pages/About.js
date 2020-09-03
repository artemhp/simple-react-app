import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import useFetch from '../common/hooks/useFetch';
import getAbout from '../common/api/getAbout';
import LoadingSpinner from '../components/LoadingSpinner';
import RequestStatus from '../components/RequestStatus';

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
      {!isLoading && data && ReactHtmlParser(documentToHtmlString(data.content))}
    </div>
  );
}

export default About;
