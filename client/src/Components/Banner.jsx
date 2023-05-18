import { Box } from "@mui/material";

const Banner = ({ userData, logged }) => {
    
    return (
        <>
            {
                logged ?
                <Box className='banner-box'>
                    <Box>
                        <h2 className="banner-text">Hi {userData?.firstName + ' ' + userData?.lastName}</h2>
                        <h1 className="banner-text">Welcome to SPOTLET SOLUTIONS</h1>
                    </Box>
                </Box>
                :
                <Box className='banner-box'>
                    <Box>
                        <h1 className="banner-text">Welcome to SPOTLET SOLUTIONS</h1>
                    </Box>
                </Box>
            }
        </>
     );
}
 
export default Banner;