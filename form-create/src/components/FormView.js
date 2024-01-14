import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Paper } from '@mui/material';

const FormView = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/form/${id}`);
        console.log('API Response:', response.data);
        setForm(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    fetchData();  // Corrected placement
  
  }, [id]);
  


  useEffect(() => {
    console.log('Form:', form);
    console.log('FormData:', formData);
  }, [form, formData]);

  const handleInputChange = (input, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [input._id]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log('Form data submitted:', formData);
    // You can use formData for further processing or send it to the server
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!form) {
    return <div>Error loading form data.</div>;
  }

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, margin: 'auto', marginTop: 10 }}>
      <div>
        <h1>{form.title}</h1>
        <form>
          <h2>Form Inputs</h2>
          {form.inputs.map((input, index) => (
            <div key={index}>
              <label>{input.title}:</label>
              <input
                type="text"
                value={formData[input._id] || ''}
                onChange={(e) => handleInputChange(input, e.target.value)}
              />
            </div>
          ))}
          <button type="button" onClick={handleSubmit}>
            Submit Form
          </button>
        </form>

        {/* Buttons for editing and viewing */}
        <Link to={`/form/edit/${form._id}`}>
          <button>Edit Form</button>
        </Link>
        <Link to={`/form/view/${form._id}`}>
          <button>View Form</button>
        </Link>
      </div>
    </Paper>
  );
};

export default FormView;
