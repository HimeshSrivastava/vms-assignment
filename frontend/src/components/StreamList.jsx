import { Box, Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import StreamCard from './StreamCard';
import {Api_Url} from './constants/Api.jsx';


export default function StreamList() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`${Api_Url}results`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
    const interval = setInterval(fetchResults, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Analyzed Results</Typography>
      <Grid container spacing={2}>
        {results.map(({ filename, data }) => (
          <Grid item xs={12} sm={6} md={4} key={filename}>
            <StreamCard streamId={filename} data={data} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
