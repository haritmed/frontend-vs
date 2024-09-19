import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedDataComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch token from localStorage
    const token = localStorage.getItem('token');

    axios.get('/api/protected-data', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      setError('Error fetching protected data');
      console.error('Error fetching protected data', error);
    });
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div>
      {error && <p>{error}</p>}
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default ProtectedDataComponent;
