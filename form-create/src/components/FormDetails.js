// FormDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, TextField, Button } from '@mui/material';

const FormDetail = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/forms/${formId}`);
        console.log('Form Detail API Response:', response.data);
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching form detail:', error);
      }
    };

    fetchData();
  }, [formId]);

  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography variant="h5">{form.title}</Typography>
      <form>
        {form.inputs.map((input, index) => (
          <div key={index}>
            <TextField
              type={input.type}
              label={input.title}
              placeholder={input.placeholder}
              fullWidth
              margin="normal"
            />
          </div>
        ))}
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default FormDetail;
