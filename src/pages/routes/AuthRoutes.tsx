import { Route, Routes } from 'react-router-dom'
import Auth from "../auth"
import Verification from '../verification'
import Verified from '../verified';

const AuthRoutes = () => {
  return (
    <>
     <Routes>
      <Route path ="/register" element={<Auth type="register"/>}/>
      <Route path ="/login" element={<Auth type="login"/>}/>
      <Route path ="/verification" element={<Verification/>}/>
      <Route path ="/verify/:token" element={<Verified/>}/>
    </Routes> 
    </>
  )
}

export default AuthRoutes
