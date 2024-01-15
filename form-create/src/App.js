import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import FormCreate from './components/FormCreate';
import FormView from './components/FormView';
import '../styles.css';

import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {
  const [forms, setForms] = useState([]);

  const addForm = (newForm) => {
    setForms([...forms, newForm]);
  };

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Prathap Form Creation
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
          <Route path="/form/create" element={<FormCreate addForm={addForm} />} />
          <Route path="/form/:id" element={<FormView />} />
          <Route path="/forms/all" element={<FormView forms={forms} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
