import React, { useState, useEffect } from 'react'
import { RouterProvider } from 'react-router/dom'
import { router } from './router'
import { Provider } from 'react-redux'
import { store } from './redux/store'

export function App(): React.ReactElement {
  
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )

}