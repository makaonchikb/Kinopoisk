import React, { useState, useEffect } from 'react'
import { RouterProvider } from 'react-router/dom'
import { router } from './router'


export function App(): React.ReactElement {
  return (
    <>
          <RouterProvider router={router} />
    </>
  )

}