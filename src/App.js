import Home from './Home'
import { PeraChallengeProvider } from './context/PeraChallengeContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <PeraChallengeProvider>
      <Home />
      <ToastContainer />
    </PeraChallengeProvider>
  )
}

export default App