import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import FormCreate from './components/FormCreate';
import FormView from './components/FormView';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function App() {
  const [forms, setForms] = useState([]); // State to hold forms data

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
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Home forms={forms} />} />
          <Route path="/form/create" element={<FormCreate />} />
          <Route path="/form/:id" element={<FormView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
