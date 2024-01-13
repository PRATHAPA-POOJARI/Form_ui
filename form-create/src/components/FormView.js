import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FormView = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/form/create`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setForm(data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchFormData();
  }, [id]);

  const handleInputChange = (input, value) => {
    // Update the form data in local state
    setFormData((prevFormData) => ({
      ...prevFormData,
      [input.title]: value,
    }));
  };

  const handleSubmit = async () => {
    // Implement form submission logic here
    console.log('Form data submitted:', formData);
    // You can use formData for further processing or send it to the server
  };

  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{form.title}</h1>
      <form>
        <h2>Form Inputs</h2>
        {form.inputs.map((input, index) => (
          <div key={index}>
            <label>{input.title}:</label>
            <input
              type={input.type}
              value={formData[input.title] || ''}
              onChange={(e) => handleInputChange(input, e.target.value)}
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
