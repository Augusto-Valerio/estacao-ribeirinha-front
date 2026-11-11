import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { HistoryPage } from '../pages/HistoryPage'
import { ManagementPage } from '../pages/ManagementPage'
import { NoticesPage } from '../pages/NoticesPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { OverviewPage } from '../pages/OverviewPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: 'historico', element: <HistoryPage /> },
      { path: 'avisos', element: <NoticesPage /> },
      { path: 'gestao', element: <ManagementPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
