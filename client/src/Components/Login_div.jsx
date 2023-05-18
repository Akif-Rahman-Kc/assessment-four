import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { LoginApi } from '../Apis/user_api';

const theme = createTheme();

export default function LogIn() {

    const navigate = useNavigate()
    
    const [ email, setEmail ] = React.useState(false)
    const [ emailError, setEmailError ] = React.useState('')
    const [ password, setPassword ] = React.useState(false)
    const [ passwordError, setPasswordError ] = React.useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
        email: data.get('email'),
        password: data.get('password'),
    }
    if (data.email && data.password) {
        setEmail(false)
        setEmailError('')
        setPassword(false)
        setPasswordError('')
        const res = await LoginApi(data)
        if (res.status === 'success') {
            localStorage.setItem('usertoken', res.token)
            navigate('/')
        } else {
            if (res.emailErr) {
                setEmail(true)
                setEmailError('Email is incorrect')
            } else {
                setPassword(true)
                setPasswordError('Password is incorrect')
            }
        }
    }else{
        if (data.email === '') {
            setEmail(true)
            setEmailError('Please enter phoneNo')
        }
        if (data.password === '') {
            setPassword(true)
            setPasswordError('Please enter password')
        }
    }
};

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            LOGIN
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Phone Number"
              name="email"
              autoComplete="phoneNo"
              error={email}
              helperText={emailError}
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
              error={password}
              helperText={passwordError}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              LOGIN
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}