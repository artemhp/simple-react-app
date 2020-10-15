import React from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import ReactHtmlParser from 'react-html-parser';
import useFetch from '../../common/hooks/useFetch';
import getFooter from '../../common/api/getFooter';

function Footer() {
  const { data } = useFetch(getFooter, { onMount: true });
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        {data && ReactHtmlParser(documentToHtmlString(data.content))}
      </div>
    </footer>
  );
}

export default Footer;
