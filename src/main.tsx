import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomeLayout from './layouts/HomeLayout.tsx'
import HomePage from './pages/HomePage/index.tsx'
import CountryDetailPage from './pages/CountryDetailPage/index.tsx'
import { changeDarkModeByCondition } from './lib/utils.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CountryDetailLoading from './pages/CountryDetailPage/loading.tsx'

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
        element: (
          <Suspense fallback={<CountryDetailLoading />}>
            <CountryDetailPage />
          </Suspense>
        ),
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
