import { ThemeProvider } from 'styled-components'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import {GlobalStyle} from './styles/global'
import { theme } from './styles/theme'
import { SignIn } from './pages/Auth/Signin'
import { Signup } from './pages/Auth/Signup'
import { AuthProvider } from './context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RequireAuth } from './components/RequireAuth/RequireAuth'
import { Home } from './pages/Home/Home'

const queryClient = new QueryClient()


function App() {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<SignIn/>}/>
            <Route path='/cadastro' element={<Signup/>}/>
            <Route 
              path="/home" 
              element={
                <RequireAuth>
                  <Home/>

                </RequireAuth>
              }
            />
          </Routes>
        </AuthProvider>

      </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
