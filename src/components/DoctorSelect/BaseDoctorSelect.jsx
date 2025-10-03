import React, { useState, useEffect, useMemo } from 'react';
import DoctorSelect from './DoctorSelect';
import { runComponentActionFetch } from '../../services/FetchData/FetchData';

const BaseDoctorSelect = ({ 
  component, 
  action, 
  value = '', 
  onChange, 
  placeholder, 
  csrfToken, 
  signedParameters 
}) => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch options when component mounts or dependencies change
  useEffect(() => {
    let isMounted = true;
    
    const fetchOptions = async () => {
      try {
        setIsLoading(true);
        
        const response = await runComponentActionFetch({
          component,
          mode: 'class',
          action,
          signedParameters,
          params: { csrfToken }
        });
        
        if (!isMounted) return;
        
        const data = Array.isArray(response) 
          ? response 
          : Object.entries(response);
          
        const formattedOptions = data.map(item => ({
          value: item.value || item.id || item[0],
          label: item.label || item.name || item[1]
        }));
        
        setOptions(formattedOptions);
      } catch (error) {
        console.error('Error fetching select options:', error);
        if (isMounted) {
          setOptions([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchOptions();
    
    return () => {
      isMounted = false;
    };
  }, [component, action, csrfToken, signedParameters]);

  const selectedOption = useMemo(() => {
    if (!value) return null;    
    if (typeof value === 'object' && value !== null && 'value' in value) {
      return value;
    }
    // Use loose equality to handle string/number type mismatches
    return options.find(option => option.value == value) || null;
  }, [value, options]);

  return (
    <DoctorSelect
      options={options}
      value={selectedOption}
      onChange={onChange}
      placeholder={placeholder}
      isLoading={isLoading}
    />
  );
};

export default BaseDoctorSelect;
