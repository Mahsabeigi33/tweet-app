import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom' 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import  ReactDOM  from 'react-dom/client'
import './index.css'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
         <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
