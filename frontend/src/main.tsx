import { Command } from "cmdk"; // Add this import
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import queryClient from "./config/queryClient.ts";
import { Toaster } from "sonner";

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
   
      <Command>
        <Toaster />
        <App />
        <ReactQueryDevtools position="bottom" initialIsOpen={false} />
      </Command>
    </BrowserRouter>
  </QueryClientProvider>
)
