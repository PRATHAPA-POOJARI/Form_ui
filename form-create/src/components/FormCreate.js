import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button ,Box} from '@mui/material';

const FormCreate = ({ history }) => {
  const [form, setForm] = useState({ title: '', inputs: [] });

  const handleInputChange = (index, property, value) => {
    const updatedInputs = [...form.inputs];
    updatedInputs[index][property] = value;
    setForm({ ...form, inputs: updatedInputs });
  };

  const addInput = () => {
    if (form.inputs.length < 20) {
      setForm({ ...form, inputs: [...form.inputs, { type: '', title: '', placeholder: '' }] });
    }
  };

  const deleteInput = (index) => {
    const updatedInputs = [...form.inputs];
    updatedInputs.splice(index, 1);
    setForm({ ...form, inputs: updatedInputs });
  };

  const saveForm = () => {
    // Implement save to the database logic here
    // ...

    // Redirect to the home page after saving
    history.push('/');
  };

  return (
    <div>

<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Create Form</h1>
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
            {/* Add similar input fields for title and placeholder */}

            <button type="button" onClick={() => deleteInput(index)}>
              Delete Input
            </button>
          </div>
        ))}

        <button type="button" onClick={addInput}>
          Add Input
        </button>

        <button type="button" onClick={saveForm}>
          Save Form
        </button>
      </form>
      </Box>
    </div>
  );
};

export default FormCreate;
