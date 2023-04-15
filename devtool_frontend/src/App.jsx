import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Activity from './screen/Activity'
import Login from './screen/Login'
import Signup from './screen/Signup'
import Splash from './screen/Splash'
import Activity_detail from './screen/Activity_detail'
import Complete from './screen/Activity_com'
import Profile from './screen/Profile'
import Interested from './screen/Interest'
import Create_Activity from './screen/Create_Activity'
import Admin_detail from './screen/Admin_detail'
import Ongoing from './screen/Ongoing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Splash/>}/>
        <Route path='/Activity' element={<Activity/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='/Interested' element={<Interested/>}/>
        <Route path='/Ongoing' element={<Ongoing/>}/>
        <Route path='/Create' element={<Create_Activity/>}/>
        <Route path='/Activity_complete' element={<Complete/>}/>
        <Route path='/Activity_detail'>
          <Route path=":activityid" element={<Activity_detail/>}/>
        </Route>
        <Route path='/Admin_detail'>
          <Route path=":activityid" element={<Admin_detail/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
