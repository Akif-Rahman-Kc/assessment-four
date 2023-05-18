/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Profile from "../Components/Profile_div";
import { GetProfile } from "../Apis/user_api";


const ProfilePage = () => {

    const navigate = useNavigate()

    const [ userData, setUserData] = useState({})
    const [ logged, setLogged] = useState(false)

    useEffect(()=>{
        async function invoke(){
            let token=  localStorage.getItem('usertoken')
            if (token) {
                const res = await GetProfile(token)
                if (res) {
                    if (res.auth) {
                        setLogged(true)
                        setUserData(res.userData)
                    } else {
                        setLogged(false)
                        navigate('/login')
                    }
                }
            } else {
                setLogged(false)
                navigate('/login')
            }
        }
        invoke()
    },[])
    
    return (
        <>
            <Navbar logged={logged}/>
            <Profile userData={userData}/>
        </>
     );
}
 
export default ProfilePage;