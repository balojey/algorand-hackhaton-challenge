import Home from './Home.tsx'
import { PeraChallengeProvider } from './context/PeraChallengeContext.tsx'

function App() {
  return (
    <PeraChallengeProvider>
      <Home />
    </PeraChallengeProvider>
  )
}

export default App
