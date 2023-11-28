import React from 'react'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App