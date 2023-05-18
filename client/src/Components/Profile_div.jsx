import { Box } from "@mui/material";

const Profile = ({ userData }) => {
    
    return ( 
        <>
            <Box sx={{ textAlign:'center' }}>
                <h1>PROFILE</h1>
                <Box sx={{ textAlign:'center', mt:5, p:2, bgcolor:'lightgray', mx: 30, boxShadow:3, borderRadius:'10px' , minHeight:'50vh' }}>
                    <h2>{userData?.firstName + ' ' + userData?.lastName}</h2>
                    <h4>{userData?.email}</h4>
                    <h4>{userData?.phoneNo}</h4>
                </Box>
            </Box>
        </>
     );
}
 
export default Profile;