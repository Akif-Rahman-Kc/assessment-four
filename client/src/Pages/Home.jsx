import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import { GetProfile } from "../Apis/user_api";

const Home = () => {

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
                    }
                }
            } else {
                setLogged(false)
            }
        }
        invoke()
    },[])
    
    return (
        <>
            <Navbar logged={logged}/>
            <Banner userData={userData} logged={logged}/>
        </>
     );
}
 
export default Home;