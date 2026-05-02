import { AuthProvider } from '@/contexts/AuthContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<h1>Hospedafe Online - Vite + React</h1>} />
          {/* Futuras rotas aqui */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
