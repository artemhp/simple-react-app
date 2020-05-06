import React from 'react';
import PropTypes from 'prop-types';

StatusForm.propTypes = {

};

function StatusForm({formSubmitStatus}) {
    if (!formSubmitStatus.status) { return null; }
    return <section> {formSubmitStatus.status} </section>
}

export default React.memo(StatusForm);