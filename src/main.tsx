import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomeLayout from './layouts/HomeLayout.tsx'
import HomePage from './pages/HomePage.tsx'
import CountryDetailPage from './pages/CountryDetailPage.tsx'
import { changeDarkModeByCondition } from './lib/utils.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const route = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/:countryName',
        element: <CountryDetailPage />
      },
    ],
  }
])

changeDarkModeByCondition()

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={route} />
    </QueryClientProvider>
  </StrictMode>,
)
