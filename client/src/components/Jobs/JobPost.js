import React from "react";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";

const JobPost = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      // Send data to the API endpoint
      await axios.post("http://localhost/api/JobPost", data);
      // Handle success or navigate to another page
      console.log("Job posted successfully!");
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom marginTop="100px">
          Post a Job
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "100%", marginTop: "20px" }}
        >
          <TextField
            {...register("positionName")}
            label="Position Name"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            {...register("companyName")}
            label="Company Name"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            {...register("salaryStipend")}
            label="Salary/Stipend"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <label htmlFor="jobDescription" style={{ margin: "10px 0" }}>
            <Button component="span" variant="contained" color="primary">
              Upload Job Description
            </Button>
            <input
              {...register("jobDescription")}
              type="file"
              id="jobDescription"
              accept=".pdf, .doc, .docx"
              style={{ display: "none" }}
              required
            />
          </label>
          <div>       
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "50px",marginLeft:"220px" }}
          >
            Submit
          </Button>
            </div>
        </form>
      </Paper>
    </Container>
  );
};

export default JobPost;
