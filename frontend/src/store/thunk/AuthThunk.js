import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../utils/API/ApiConfiguration'
import toast from 'react-hot-toast'

export const userLogin = createAsyncThunk(
    "api/authlogin",
    async(user,{rejectWithValue})=>{
       try {
         const promise = axios.post('/api/auth/login',user,{withCredentials:true})

         toast.promise(promise,{
            loading:"login..",
            success:(res)=>{
                return res?.data?.message
            },
            error:(err)=>{
                return err?.response?.data.message || "Login Failed"
            }
         })

         const res = await promise
        return res.data.user
        
       } catch (error) {
        return rejectWithValue(error?.response?.data.message) || "login Failed"
       }
    }
)

export const userRegister = createAsyncThunk(
    "api/authRegister",
    async(user,{rejectWithValue})=>{
        try {     
            const promise = axios.post('/api/auth/register',user,{withCredentials:true})

            toast.promise(promise,{
                loading:"registering....",
                success:(res)=>{
                    return res?.data?.message
                },
                error:(err)=>{
                    return err?.response?.data?.message
                }
            })

            const res = await promise

            return res.data.user
        } catch (error) {

            return rejectWithValue(err?.response?.data?.message) || "Register Failed"
            
        }
    }
)

export const currentUser = createAsyncThunk(
    '/api/currentUser',
    async(_, {rejectWithValue})=>{
        try {
            const res = await axios.get('/api/auth/myInfo',{withCredentials:true})

            return res.data.user
            
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message) || "user Not Found"
        }
    }
)

export const logOutUser = createAsyncThunk(
    'auth/userLogOut',
    async(_,{rejectWithValue})=>{
        try {
            const promise = axios.post('/api/auth/logOut',{},{withCredentials:true})

            toast.promise(promise,{
                loading:"logOut user...",
                success:(res)=>{
                    return res.data.message
                },
                error:(err)=>{
                    return err?.response?.data?.message
                }
            })

            let res = await promise
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message)
        }
    }
)

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const promise = axios.put(
        "/api/auth/changePassword",
        passwordData,
        { withCredentials: true }
      );

      toast.promise(promise, {
        loading: "Changing Password...",
        success: "Password Changed Successfully",
        error: "Password Change Failed",
      });

      const res = await promise;

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const getAdminDetail = createAsyncThunk(
  "admin/getAdminDetail",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "/api/auth/AdminDashoard",
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to load admin data"
      );
    }
  }
);