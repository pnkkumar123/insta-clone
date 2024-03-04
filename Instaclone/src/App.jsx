

import Navbar from './Components/Navbar'
import {Routes, Route} from 'react-router-dom'
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
import Profile from './Components/Profile'
import Home from './Components/Home'
import Modal from './Components/Modal'
import CreatePost from './Components/createPost'
import { LoginContext } from './Context/LoginContext'
import { useState } from 'react'
import {ToastContainer} from 'react-toastify'

function App() {
  const [userLogin,setUserLogin] = useState(false);
  const [modelOpen,setModelOpen]  = useState(false);
  

  return (
    <div className='app'>
    <LoginContext.Provider value={{setUserLogin,setModelOpen}} >
    <Navbar login={userLogin}/>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/signup' element={<SignUp/>}/>
  <Route path='/signin' element={<SignIn/>}/>
  <Route path='/profile' element={<Profile/>}/>
<Route path='/createpost' element={<CreatePost/>}/>
</Routes>
<ToastContainer theme="dark"/>
{modelOpen && <Modal setModelOpen={setModelOpen}></Modal>}
    </LoginContext.Provider>
    </div>
  )
}

export default App
