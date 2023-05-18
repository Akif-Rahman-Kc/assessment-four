import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

export default function Navbar({ logged }) {

    const navigate = useNavigate()

    const logout = () => {
        Swal.fire({
            title: "Are You Sure",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            showCancelButton: true,
            customClass: "swal-wide",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("usertoken");
                navigate('/login');
            }
        });
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        SpotLet Solutions
                    </Typography>
                    {
                        logged ? 
                        <>
                            <Button onClick={()=>navigate('/profile')} color="inherit">Profile</Button>/
                            <Button onClick={logout} color="inherit">Logout</Button>
                        </>
                        :
                        <>
                            <Button onClick={()=>navigate('/signup')} color="inherit">Signup</Button>/
                            <Button onClick={()=>navigate('/login')} color="inherit">Login</Button>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}