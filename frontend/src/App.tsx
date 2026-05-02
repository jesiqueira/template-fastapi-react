import { AuthProvider } from '@/contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>{/* Suas rotas aqui */}</AuthProvider>
    </BrowserRouter>
  )
}

export default App