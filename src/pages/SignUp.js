import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import Notification from "../components/Notification";

export default function SignUp() {
  const [notification, setNotification] = useState({
    message: '',
    visible: false,
    bgColor: 'var(--color-success-darker)'
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    let passwordValidation = /^(?=.*[az])(?=.*[AZ])(?=.*\d)(?=.*[@.#$!%*?&^])[ A-Za-z\d@.#$!%*?&]{8,15}$/;
    
    if (!emailValidation.test(data.get('email'))) {
      setNotification({
        message: "Email must have in format abc@sample.com ...",
        visible: true,
        bgColor: 'var(--color-alert-darker)'
      })
      return;
    }

    if (!passwordValidation.test(data.get('password'))) {
      setNotification({
        message: "Password must include at least 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special letter, and in range 8 - 15 characters",
        visible: true,
        bgColor: 'var(--color-alert-darker)',
      })
    }

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return <SignUpWrapper>
    <Notification message={notification.message} visible={notification.visible} bgColor={notification.bgColor} onClose={() => setNotification({...notification, visible: false})}/>
    <img src="assets/logo.png" alt="LOGO" />
    <SignUpForm elevation={6} style={{ padding: '16px', marginTop: '20px' }}>
      <Typography variant="h5" align="center">
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="re-password"
          label="Password Again"
          type="password"
          id="re-password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
        >
          Sign Up
        </Button>
        <Grid container style={{marginTop: "10px"}}>
          <Grid item>
            <Link to="/sign-in" variant="body2">
              Have an account? Sign In
            </Link>
          </Grid>
        </Grid>
      </form>
    </SignUpForm>
  </SignUpWrapper>
}

const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Đảm bảo các nội dung con được căn giữa theo chiều dọc */
  position: relative;
  top: 10vh;
  font-weight: bold;
`

const SignUpForm = styled(Paper)`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 20px;
    width: 100%; 
    max-width: 500px;
    height: auto;
    margin: auto;
  }
`
