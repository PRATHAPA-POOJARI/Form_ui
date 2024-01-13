import React from 'react';

const FormDataView = ({ formData }) => {
  return (
    <div>
      <h1>Form Data</h1>
      {/* Display form data here */}
      <ul>
        {Object.entries(formData).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormDataView;