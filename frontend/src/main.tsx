import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom' 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import  ReactDOM  from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {GoogleOAuthProvider} from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
         <App />
      </QueryClientProvider>
    </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
