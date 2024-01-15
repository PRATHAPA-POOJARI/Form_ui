import React, { useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Box,
  Button,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Alert,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const FormCreate = ({ history }) => {
  const initialFormState = { title: '', inputs: [] };
  const [form, setForm] = useState(initialFormState);
  const [newInputType, setNewInputType] = useState('');
  const [showSelectInputType, setShowSelectInputType] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (index, property, value) => {
    const updatedInputs = [...form.inputs];
    updatedInputs[index][property] = value;
    setForm({ ...form, inputs: updatedInputs });
  };

  const addInput = () => {
    if (!showSelectInputType && form.inputs.length < 20) {
      setNewInputType('');
      setForm({
        ...form,
        inputs: [
          ...form.inputs,
          { type: newInputType, title: '', placeholder: '' },
        ],
      });
    }
    setShowSelectInputType(false);
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
      setNewInputType('');
    }
    setShowSelectInputType(false);
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

      const response = await axios.post('http://localhost:3000/forms', form);

      // Axios automatically parses JSON responses, so no need to call response.json()
      console.log('Form saved successfully:', response.data);

      // Set success state to true
      setSuccess(true);

      // Clear success message after 3 seconds (adjust as needed)
      setTimeout(() => setSuccess(false), 3000);
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
          {success && (
            <Alert severity="success" sx={{ marginBottom: 2 }}>
              Form saved successfully!
            </Alert>
          )}
          <form>
            <TextField
              id="standard-basic"
              label="Please Enter Form Name"
              variant="standard"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <h2>Form Inputs</h2>
            {form.inputs.map((input, index) => (
              <Box sx={{ marginTop: 2 }} key={index}>
                <label>Type:</label>
                <input
                  type="text"
                  value={input.type}
                  onChange={(e) => handleInputChange(index, 'type', e.target.value)}
                />

                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  sx={{ marginTop: 2 }}
                  value={input.title}
                  onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                />
                <TextField
                  id="outlined-basic"
                  label="Placeholder"
                  variant="outlined"
                  sx={{ marginTop: 2 }}
                  value={input.placeholder}
                  onChange={(e) => handleInputChange(index, 'placeholder', e.target.value)}
                />

                <DeleteForeverIcon
                  sx={{ backgroundColor: 'white', color: 'green', marginLeft: 2 }}
                  onClick={() => deleteInput(index)}
                />
              </Box>
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
                    <MenuItem value="age">Age</MenuItem>
                    <MenuItem value="address">Address</MenuItem>
                    
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
