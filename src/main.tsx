import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout.tsx'
import HomePage from './pages/HomePage.tsx'
import CountryDetail from './pages/CountryDetailPage.tsx'

const route = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/:countryName',
        element: <CountryDetail />
      },
    ],
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>,
)
