import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const Home = ({ forms }) => (
  <div>
    <Typography>All Forms</Typography>
    <ul>
      {forms.map((form) => (
        <li key={form._id}>
          <Link to={`/form/${form._id}`}>{form.title}</Link>
        </li>
      ))}
    </ul>
    <Link to="/form/create">
      <button>Create Form</button>
    </Link>
  </div>
);

export default Home;
