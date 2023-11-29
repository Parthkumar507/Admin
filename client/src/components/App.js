import React from 'react'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import LoginPage from './LoginPage'
import HomePage from './HomePage'

// import RegisterPage from './RegisterPage'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App