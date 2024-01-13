
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const FormView = ({ forms }) => {
  const { id } = useParams(); // Get the form ID from the URL params
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({}); // Add this line to declare formData state

  useEffect(() => {
    // Find the form with the given ID
    const selectedForm = forms.find((f) => f._id === id);

    if (selectedForm) {
      setForm(selectedForm);
    } else {
      // Handle the case where the form is not found
      console.error('Form not found');
    }
  }, [forms, id]);
  const handleInputChange = (input, value) => {
    // Implement input validation if needed
    // You can update the form data in local state here
  };

  const handleSubmit = async () => {
    // Implement form submission logic here
  };

  if (!form) {
    return <div>Loading...</div>; // or handle the case where form is not found
  }

  return (
    <div>
      <h1>{form.title}</h1>
      <form>
        <h2>Form Inputs</h2>
        {form.inputs.map((input, index) => (
          <div key={index}>
            <label>{input.title}:</label>
            {input.type === 'text' ? (
              <input
                type={input.type}
                value={formData[input.title] || ''}
                onChange={(e) => handleInputChange(input, e.target.value)}
              />
            ) : input.type === 'email' ? (
              <input
                type={input.type}
                value={formData[input.title] || ''}
                onChange={(e) => handleInputChange(input, e.target.value)}
              />
            ) : input.type === 'phone' ? (
              <input
                type={input.type}
                value={formData[input.title] || ''}
                onChange={(e) => handleInputChange(input, e.target.value)}
              />
            ) : (
              <input
                type="text"
                value={formData[input.title] || ''}
                onChange={(e) => handleInputChange(input, e.target.value)}
              />
            )}
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
