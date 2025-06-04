import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { App } from './App'
import { reportWebVitals } from './reportWebVitals'
import { worker } from './fakeBackend/worker'
import { IntlWrapper } from './intl/IntlContext'

import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

worker.start()

const root = ReactDOM.createRoot(document.getElementById('root'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5,
    },
  },
})
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <IntlWrapper>
        <App />
      </IntlWrapper>
    </BrowserRouter>
  </QueryClientProvider>,
  // </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
