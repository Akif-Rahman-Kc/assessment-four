import { UserApi } from "../Constants/Constant";

/////////////////////////////////////////////////////////////////////////////

export const SignupApi = async (formData) => {
    try {
        const { data } = await UserApi.post('/api/auth/signup', formData)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const LoginApi = async (formData) => {
    try {
        const { data } = await UserApi.post('/api/auth/login', formData)
        return data;
    } catch (error) {
        return false
    }
}

/////////////////////////////////////////////////////////////////////////////

export const GetProfile = async (Token) => {
    try {
        const { data } = await UserApi.post('/profile',{}, {headers:{"usertoken":Token}})
        return data;
    } catch (error) {
        return false
    }
}