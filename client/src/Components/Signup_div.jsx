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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { SignupApi } from '../Apis/user_api';
const theme = createTheme();

export default function Signup() {

    const navigate = useNavigate()

    const [ firstName, setFirstName ] = React.useState(false)
    const [ firstNameError, setFirstNameError ] = React.useState('')
    const [ email, setEmail ] = React.useState(false)
    const [ emailError, setEmailError ] = React.useState('')
    const [ password, setPassword ] = React.useState(false)
    const [ passwordError, setPasswordError ] = React.useState('')
    const [ totalRequired, setTotalRequired ] = React.useState('')
    const [ phoneNo, setPhoneNo ] = React.useState(false)
    const [ phoneNoError, setPhoneNoError ] = React.useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    data = {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        password: data.get('password'),
        phoneNo: data.get('phoneNo'),
    }
    if(data.firstName && data.email && data.password && data.phoneNo){
        let regName =/^[a-zA-Z]+$/;
        let regPhone =/^[0-9]+$/;
        let regEmail =/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
        let regPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/
        setTotalRequired('')
        if(regName.test(data.firstName)){
            setFirstName(false)
            setFirstNameError('')
            if (data.firstName.length >= 5) {
                setFirstName(false)
                setFirstNameError('')
                if(regEmail.test(data.email)){
                    setEmail(false)
                    setEmailError('')
                    if( data.password.length >= 5 ){
                        setPassword(false)
                        setPasswordError('')
                        if (regPassword.test(data.password)) {
                            setPassword(false)
                            setPasswordError('')
                            if(regPhone.test(data.phoneNo)){
                                setPhoneNo(false)
                                setPhoneNoError('')
                                if(data.phoneNo.length === 10){
                                    setPhoneNo(false)
                                    setPhoneNoError('')
                                    const res = await SignupApi(data)
                                    if (res.status === "success") {
                                        toast.success("Registered", {
                                            position: "top-center",
                                            autoClose: 2000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "colored",
                                        });
                                        setTimeout(() => {
                                            localStorage.setItem("usertoken", res.token);
                                            navigate('/')
                                        }, 2000);
                                    } else if (res.status === "failed") {
                                        toast.error("This email is already registered!", {
                                            position: "top-center",
                                            autoClose: 3000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "colored",
                                        });
                                    } else {
                                      toast.error(res.message, {
                                        position: "top-center",
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "colored",
                                      });
                                    }
                                }else{
                                    setPhoneNo(true)
                                    setPhoneNoError('Please enter 10 digit')
                                }
                            }else{
                                setPhoneNo(true)
                                setPhoneNoError('Enter valid phone no')
                            }
                        } else {
                            setPassword(true)
                            setPasswordError('Must have Uppercase,Number,special character')
                        }
                    }else{
                        setPassword(true)
                        setPasswordError('Enter Minimum 5 character')
                    }
                }else{
                    setEmail(true)
                    setEmailError('Please enter valid Email')
                }
            } else {
                setFirstName(true)
                setFirstNameError('Enter Minimum 5 letter')
            }
       }else{
        setFirstName(true)
        setFirstNameError('Please enter valid Name')
       }
      }else{
        setTotalRequired('Please enter your Details')
      }
  };

  return (
    <ThemeProvider theme={theme}>
     <ToastContainer />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SIGNUP
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Box sx={{ backgroundColor:'#ffc5c5' , borderRadius:'3px' , pl:2 }}>
            <p style={{ color:'red' }}>{totalRequired}</p>
          </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={firstName}
                  helperText={firstNameError}
                  autoFocus
                  defaultValue={'Aakif'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  defaultValue={'KC'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  error={email}
                  helperText={emailError}
                  autoComplete="email"
                  defaultValue={'akifrahman90442@gmail.com'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={password}
                  helperText={passwordError}
                  autoComplete="new-password"
                  defaultValue={'Akif@20'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                margin="normal"
                required
                fullWidth
                name="phoneNo"
                label="Phone No"
                type="phoneNo"
                id="phoneNo"
                error={phoneNo}
                helperText={phoneNoError}
                defaultValue={'9562696976'}
                />
              </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Signup
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}