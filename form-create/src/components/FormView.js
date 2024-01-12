import React, { useState } from 'react';

const FormView = ({ form }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (input, value) => {
    // Implement input validation if needed

    setFormData({ ...formData, [input.title]: value });
  };

  const handleSubmit = () => {
    // Implement form submission logic if needed
    // ...

    console.log('Form data submitted:', formData);
  };

  return (
    <div>
      <h1>View Form</h1>
      <form>
        <h2>Form Inputs</h2>
        {form.inputs.map((input, index) => (
          <div key={index}>
            <label>{input.title}:</label>
            <input
              type={input.type}
              value={formData[input.title] || ''}
              onChange={(e) => handleInputChange(input, e.target.value)}
              readOnly
            />
          </div>
        ))}

        <button type="button" onClick={handleSubmit}>
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default FormView;
