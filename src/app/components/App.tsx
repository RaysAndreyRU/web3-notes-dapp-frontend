import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { router } from '@src/app/router'

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="bottom-right"
        richColors
      />
    </>
  )
}
