import React, { useState } from 'react';
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@mui/material';


const ViewResume = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResume = async () => {
    // Assuming you have a server endpoint that generates a resume PDF
    setLoading(true);

    try {
      const response = await fetch('https://drive.google.com/file/d/1T-kVJjVkO2lVVfK3Cya7y6xmXL8O5V1T/view', {
        method: 'GET',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        // body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        console.error('Error generating resume:', response.statusText);
      }
    } catch (error) {
      console.error('Error generating resume:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <ThemeProvider >
      <Container component="main" maxWidth="xs" style={{marginTop:"7%",marginLeft:"37%"}} >
        <CssBaseline />
        <div >
          <Typography component="h1" variant="h2">
            Resume
          </Typography>
          <Grid container spacing={2} style={{marginTop:"5%"}}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={name}
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleResume}
            disabled={loading}
            style={{marginTop:"5%"}}
          >
            {loading ? 'View...' : 'View Resume'}
          </Button>
        </div>
      </Container>
    // </ThemeProvider>
  );
};

export default ViewResume;
