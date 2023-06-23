import './App.scss'
import Landing from './landing/Landing'
// import image from '../assets/friends.svg'

function App() {
  return (
    <div className='flexbox-container'>
      <div id='landing'>
        <Landing/>
      </div>
      <footer id='footer'>
        2023 coinmates
      </footer>
    </div>
  )
}

export default App
