import React, { memo } from 'react';
import PropTypes from 'prop-types';

const LoadingForm = memo(({isLoaded}) => {
    if (!isLoaded) return null;
    return (
        <div>Loading</div>
    );
});

LoadingForm.propTypes = {

};

export default LoadingForm;