import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';

const Home = ({ forms, setForms }) => {
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch('/api/forms');

        if (response.ok) {
          const data = await response.json();
          setForms(data);
        } else {
          // Handle error
          console.error('Failed to fetch forms');
        }
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, [setForms]);

  return (
    <div>
      <Box sx={{ textAlign: 'center' }}>
        <Typography>All Forms</Typography>
        <ul>
          {forms.map((form) => (
            <li key={form._id}>
              <Link to={`/form/${form._id}`}>{form.title}</Link>
            </li>
          ))}
        </ul>
        <Link to="/form/create">
          <Button variant="contained" sx={{ backgroundColor: 'red', color: 'white' }}>
            Create Form
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default Home;
