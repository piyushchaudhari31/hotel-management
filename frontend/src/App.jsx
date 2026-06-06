import React, { useEffect } from 'react'
import Layout from './utils/layouts/Layout'
import Home from './page/home/landing/Home'
import Room from './page/home/room/Room'
import About from './page/home/aboutUs/About'
import Contact from './page/home/contactUs/Contact'
import { Route, Routes } from 'react-router-dom'
import Login from './page/auth/login/Login'
import Register from './page/auth/register/Register'
import { useDispatch } from 'react-redux'
import { currentUser } from './store/thunk/AuthThunk'
import { getRoom } from './store/thunk/RoomThunks'
import Setting from './page/customer/setting/Setting'
import MyBooking from './page/customer/myBooking/MyBooking'
import GetRoomById from './page/home/roomById/GetRoomById'

import PaymentSuccess from "./page/payment/PaymentSuceess";
import ProtectedAuth from './utils/protectsFolder/protectedAuth/ProtectedAuth'
import Dashboard from './page/Admin/Dashboard/Dashboard'
import AppAdmin from './page/Admin/appAdmin/AppAdmin'
import UserDeatil from './page/Admin/user/UserDeatil'
import Booking from './page/Admin/booking/Booking'
import ProtectedAdmin from './utils/protectsFolder/protecteRouteAdmin/ProtectedAdmin'
import AdminLayout from './utils/adminLayout/AdminLayout'


const App = () => {

  const disPatch = useDispatch()
  useEffect(() => {
    disPatch(currentUser())
    disPatch(getRoom())
  }, [disPatch])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="room" element={<Room />}></Route>
        <Route path="about-us" element={<About />}></Route>
        <Route path="contact-us" element={<Contact />}></Route>
      </Route>

      
      <Route path="/login" element={<ProtectedAuth><Login /></ProtectedAuth>}></Route>
      <Route path="/register" element={<ProtectedAuth><Register /></ProtectedAuth>}></Route>

      <Route path="/setting" element={<Setting />}></Route>
      <Route path="/my-booking" element={<MyBooking />}></Route>
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="room/:id" element={<GetRoomById />}></Route>

      <Route path="/payment-success" element={<PaymentSuccess />} />


      <Route path="/admin-Dashboard" element={<ProtectedAdmin><AdminLayout /></ProtectedAdmin>}>
        <Route index element={<Dashboard />} />
        <Route path="detail" element={<AppAdmin />} />
        <Route path="user" element={<UserDeatil />} />
        <Route path="booking" element={<Booking />} />
      </Route>
    </Routes>
  )
}

export default App
