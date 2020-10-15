import React from 'react';
import PropTypes from 'prop-types';

const InputForm = React.forwardRef(({ name, required, value, type, options, placeholder, onChange, onBlur }, ref) => {
  return (
    <div className="field">
      <div className="control">
        {type !== 'select' && (
          <input
            ref={ref}
            required={required}
            className="input"
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            placeholder={placeholder}
          />
        )}
        {type === 'select' && (
          <div className="select" style={{ width: '100%' }}>
            <select ref={ref} value={value} onChange={onChange} name={name} style={{ width: '100%' }}>
              <option value="">Select {placeholder}</option>
              {options.map(value => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
});

InputForm.propTypes = {
  name: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  type: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

export default InputForm;
