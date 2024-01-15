import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Typography, Button } from '@mui/material';

const FormView = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/forms');
        console.log('API Response:', response.data);

        if (Array.isArray(response.data)) {
          console.log('Setting forms:', response.data);
          setForms(response.data);
        } else {
          console.error('Invalid API response format:', response.data);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching form data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async (formId) => {
    try {
      // Make an HTTP request to delete the form
      await axios.delete(`http://localhost:3000/forms/${formId}`);

      // Remove the deleted form from the state
      setForms((prevForms) => prevForms.filter((form) => form._id !== formId));
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (forms.length === 0) {
    return <div>No forms available.</div>;
  }

  return (
    <div>
      <Typography variant="h5">Form Data</Typography>
      {forms.map((form) => (
        <div key={form._id} style={{ padding: 10, maxWidth: 400, margin: 'auto', marginTop: 10, border: '1px solid #ccc', borderRadius: 8 }}>
          <Typography variant="h4">{form.title}</Typography>
          <Typography variant="body1">{`Number of Inputs: ${form.inputs.length}`}</Typography>

          {/* Display each input in the form */}
          <ul>
            {form.inputs.map((input, index) => (
              <li key={index}>
                Type: {input.type}, Title: {input.title}, Placeholder: {input.placeholder}
              </li>
            ))}
          </ul>

          {/* Use MUI Button for consistent styling */}
          <Button component={Link} to={`/form/view/${form._id}`} variant="outlined" color="primary">
            View Form
          </Button>

          <Button component={Link} to={`/form/${form._id}/edit`} variant="outlined" color="secondary">
            Edit Form
          </Button>

          {/* Delete Button */}
          <Button onClick={() => handleDelete(form._id)} variant="outlined" color="error">
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default FormView;
