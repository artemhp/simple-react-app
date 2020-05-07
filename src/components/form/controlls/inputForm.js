import React from 'react';
import PropTypes from 'prop-types';

InputForm.propTypes = {

};

function InputForm({name, required, value, type, placeholder, onChange}) {
    return (
        <div className="field">
            <div className="control">
                <input
                    required={required}
                    className="input"
                    name={name}
                    value={value}
                    onChange={onChange}
                    type={type}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}

export default React.memo(InputForm);