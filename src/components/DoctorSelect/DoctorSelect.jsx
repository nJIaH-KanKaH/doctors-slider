import React from 'react';
import Select from 'react-select';

const DoctorSelect = ({ options, value, onChange, placeholder, isLoading }) => {
    return (
        <Select
            options={options}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            isLoading={isLoading}
            classNamePrefix="select"
            isClearable={false}
            isSearchable={true}
            // Ensure the input is cleared when dropdown opens
            blurInputOnSelect={false}
            // Compare options by value to ensure proper matching
            getOptionValue={(option) => option.value}
            getOptionLabel={(option) => option.label}
        />
    );
};

export default DoctorSelect;
