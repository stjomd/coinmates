import './App.scss'
import image from '../assets/friends.svg'

function App() {
  return (
    <div className='center'>
      <div className='flex-container'>
        <div className='left-part'>
          <h1 id='title'>coinmates</h1>
          <div className='description'>
            <p>track and split expenses with your friends and family.</p>
            <p>create an account for free to receive and send payments today.</p>
          </div>
        </div>
        <img src={image} id='image'/>
      </div>
    </div>
  )
}

export default App
