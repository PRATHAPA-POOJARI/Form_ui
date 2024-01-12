import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ forms }) => (
  <div>
    <h1>All Forms</h1>
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
