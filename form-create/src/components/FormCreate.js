import React, { useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

const FormCreate = ({ history }) => {
  const initialFormState = { title: '', inputs: [] };
  const [form, setForm] = useState(initialFormState);
  const [newInputType, setNewInputType] = useState('');
  const [showSelectInputType, setShowSelectInputType] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (index, property, value) => {
    const updatedInputs = [...form.inputs];
    updatedInputs[index][property] = value;
    setForm({ ...form, inputs: updatedInputs });
  };

  const addInput = () => {
    if (!showSelectInputType && form.inputs.length < 20) {
      setNewInputType(''); // Reset the input type
      setForm({
        ...form,
        inputs: [
          ...form.inputs,
          { type: newInputType, title: '', placeholder: '' }, // Include title and placeholder
        ],
      });
    }
    setShowSelectInputType(false); // Reset to false
  };

  const confirmInputType = () => {
    if (newInputType && form.inputs.length < 20) {
      setForm({
        ...form,
        inputs: [
          ...form.inputs,
          { type: newInputType, title: '', placeholder: '' },
        ],
      });
      setNewInputType(''); // Reset the input type after adding
    }
    setShowSelectInputType(false); // Reset to false
  };

  const deleteInput = (index) => {
    const updatedInputs = [...form.inputs];
    updatedInputs.splice(index, 1);
    setForm({ ...form, inputs: updatedInputs });
  };

  const clearForm = () => {
    setForm(initialFormState);
    setShowSelectInputType(false);
  };

  const saveForm = async () => {
    try {
      setLoading(true);
      setError(null);
  
      console.log('Form Data:', JSON.stringify(form));
  
      const response = await fetch('http://localhost:3000/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Form saved successfully:', data);
  
      // Optionally, you can redirect to another page or handle success in some way
      // history.push('/success'); // Assuming you have a success route
    } catch (error) {
      console.error('Error saving form:', error);
      setError('An error occurred while saving the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={1} sx={{ padding: 3, maxWidth: 400, margin: 'auto', marginTop: 10 }}>
          <Typography variant="h5">Create Form</Typography>
          <form>
            <label>Title:</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <h2>Form Inputs</h2>
            {form.inputs.map((input, index) => (
              <div key={index}>
                <label>Type:</label>
                <input
                  type="text"
                  value={input.type}
                  onChange={(e) => handleInputChange(index, 'type', e.target.value)}
                />
                <label>Title:</label>
                <input
                  type="text"
                  value={input.title}
                  onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                />
                <label>Placeholder:</label>
                <input
                  type="text"
                  value={input.placeholder}
                  onChange={(e) => handleInputChange(index, 'placeholder', e.target.value)}
                />
                <button type="button" onClick={() => deleteInput(index)}>
                  Delete Input
                </button>
              </div>
            ))}
            {showSelectInputType ? (
              <>
                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                  Select Input Type:
                </Typography>
                <FormControl sx={{ marginTop: 1, minWidth: 120 }}>
                  <InputLabel id="select-input-type-label">Select Input Type</InputLabel>
                  <Select
                    labelId="select-input-type-label"
                    id="select-input-type"
                    value={newInputType}
                    label="Select Input Type"
                    onChange={(e) => setNewInputType(e.target.value)}
                  >
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="phone">Phone</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                    {/* Add other input types as needed */}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: 'red', color: 'white', marginLeft: 2, marginTop: 2 }}
                  onClick={confirmInputType}
                >
                  Confirm Input Type
                </Button>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: 'red', color: 'white', marginLeft: 2, marginTop: 2 }}
                  onClick={() => setShowSelectInputType(false)}
                >
                  Close Input
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                sx={{ backgroundColor: 'red', color: 'white', marginLeft: 2, marginTop: 2 }}
                onClick={() => setShowSelectInputType(true)}
              >
                Add Input
              </Button>
            )}
            <Button
              variant="contained"
              sx={{ backgroundColor: 'red', color: 'white', marginLeft: 2, marginTop: 2 }}
              onClick={clearForm}
            >
              Clear Form
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: 'red', color: 'white', marginLeft: 2, marginTop: 2 }}
              onClick={saveForm}
            >
              Save Form
            </Button>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

export default FormCreate;
