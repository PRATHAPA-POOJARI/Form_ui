import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import FormCreate from './components/FormCreate';
import FormView from './components/FormView';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function App() {
  const [forms, setForms] = useState([]); // State to hold forms data

  const addForm = (newForm) => {
    setForms([...forms, newForm]);
  };

  return (
    <div>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Your App Name
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/form/create">
              Create Form
            </Button>
            <Button color="inherit" component={Link} to="/forms/all">
  View All Forms
</Button>

          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Home forms={forms} />} />
          <Route
            path="/form/create"
            element={<FormCreate addForm={addForm} />} // Pass the addForm function to FormCreate
          />
          <Route path="/forms" element={<FormView forms={forms} />} />
          {/* <Route path="/form/:id" element={<FormView forms={forms} />} /> */}
          {/* <Route path="/form/:id" component={FormView} /> */}
          
          {/* <Route path="/forms/:id" component={FormView} /> */}
          <Route path="/forms/all" element={<FormView forms={forms} />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
