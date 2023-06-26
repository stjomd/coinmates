import './App.scss'
import Landing from '../landing/Landing'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../login/Login';

function App() {
  return (
    <Router>
      <div className='flexbox-container'>
        <Routes>
          {/* home page */}
          <Route path="/" element={
            <div className="centered gradient">
              <Landing/>
            </div>
          }></Route>
          {/* login page */}
          <Route path="/login" element={
            <div className='centered'>
              <Login/>
            </div>
          }></Route>
        </Routes>
        <footer id='footer'>
          2023 coinmates
        </footer>
      </div>
    </Router>
  )
}

export default App
