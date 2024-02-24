

import Navbar from './Components/Navbar'
import {Routes, Route} from 'react-router-dom'
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
import Profile from './Components/Profile'
import Home from './Components/Home'


function App() {
  

  return (
    <div className='app'>
      <Navbar/>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/signup' element={<SignUp/>}/>
  <Route path='/signin' element={<SignIn/>}/>
  <Route path='/profile' element={<Profile/>}/>
</Routes>
    </div>
  )
}

export default App
