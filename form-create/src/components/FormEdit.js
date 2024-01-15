// FormEdit.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, TextField, Button } from '@mui/material';

const FormEdit = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/forms/${formId}`);
        console.log('Form Edit API Response:', response.data);
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching form for edit:', error);
      }
    };

    fetchData();
  }, [formId]);

  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography variant="h5">Edit Form: {form.title}</Typography>
      <form>
        <TextField
          label="Form Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          fullWidth
          margin="normal"
        />
        {form.inputs.map((input, index) => (
          <div key={index}>
            <TextField
              label={`Input ${index + 1} Title`}
              value={input.title}
              onChange={(e) => {
                const updatedInputs = [...form.inputs];
                updatedInputs[index] = { ...input, title: e.target.value };
                setForm({ ...form, inputs: updatedInputs });
              }}
              fullWidth
              margin="normal"
            />
            <TextField
              label={`Input ${index + 1} Placeholder`}
              value={input.placeholder}
              onChange={(e) => {
                const updatedInputs = [...form.inputs];
                updatedInputs[index] = { ...input, placeholder: e.target.value };
                setForm({ ...form, inputs: updatedInputs });
              }}
              fullWidth
              margin="normal"
            />
          </div>
        ))}
        <Button variant="contained" color="primary" type="submit">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default FormEdit;
