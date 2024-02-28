

import Navbar from './Components/Navbar'
import {Routes, Route} from 'react-router-dom'
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
import Profile from './Components/Profile'
import Home from './Components/Home'
import CreatePost from './Components/createPost'

function App() {
  

  return (
    <div className='app'>
      <Navbar/>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/signup' element={<SignUp/>}/>
  <Route path='/signin' element={<SignIn/>}/>
  <Route path='/profile' element={<Profile/>}/>
<Route path='/createpost' element={<CreatePost/>}/>
</Routes>
    </div>
  )
}

export default App
