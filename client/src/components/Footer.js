import React, { useEffect } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import ReactHtmlParser from 'react-html-parser';
import useFetch from '../common/hooks/useFetch';
import getFooter from '../common/api/getFooter';

function Footer() {
  const { data, send } = useFetch(getFooter);
  useEffect(() => {
    send();
  }, []);
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>{data && ReactHtmlParser(documentToHtmlString(data.content))}</p>
      </div>
    </footer>
  );
}

export default Footer;
