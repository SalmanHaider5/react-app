import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
  useMutation,
  useQueryClient
} from 'react-query';
import { isNotNil } from 'ramda';
import {
  Card,
  Container,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert
} from '@mui/material';
import { loginService } from '../../services';

const Login = () => {
  const [formType, setFormType] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user') || {};
    if(user) queryClient.setQueryData('user', user);
    const isAuthenticated = isNotNil(user.token);
    if(isAuthenticated)
      navigate('/');
  }, [])

  const loginMutation = useMutation((data) => loginService.login(data), {
    onSuccess: data => {
      localStorage.setItem('user', JSON.stringify(data));
      queryClient.setQueryData('user', data);
      navigate('/');
    },
    onError: err => {
      setAlertType('error');
      setAlertMessage('Invalid Username or Password');
      setAlertVisibility(true);
    }
  });

  const signupMutation = useMutation((data) => loginService.register(data), {
    onSuccess: data => {
      setAlertType('success');
      setAlertMessage('Successfully registered. Please login.');
      setAlertVisibility(true);
    },
    onError: err => {
      setAlertType('error');
      setAlertMessage('Something went wrong.');
      setAlertVisibility(true);
    }
  });

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const data = {
        username,
        password
      }
      if(formType === 'login'){
        await loginMutation.mutateAsync(data);
      }else{
        await signupMutation.mutateAsync(data);
      }
      setUsername('');
      setPassword('');
      setFormType('login');
    }catch(err){
      console.error('Login failed:', err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Card>
          <CardContent>
            <Typography component="h1" variant="h5">
              {formType === 'login' ? 'Login' : 'Register'}
            </Typography>
            { alertVisibility ? 
              <Alert
                severity={alertType}
                onClose={() => {
                  setAlertVisibility(false);
                  setAlertType('');
                  setAlertMessage('');
                }}
              >
                {alertMessage}
              </Alert> :
              ''}
            <form onSubmit={handleSubmit}>
              <TextField
                required
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                value={username}
                onChange={handleUsernameChange}
              />
              <TextField
                required
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                {formType === 'login' ? 'Sign In' : 'Register'}
              </Button>
              <Button
                variant="text"
                onClick={() => setFormType(formType === 'login' ? 'register' : 'login')}
              >
                {formType === 'login' ? 'Not Registered Yet?' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default Login;