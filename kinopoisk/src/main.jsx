import { createRoot } from 'react-dom/client'
import {App} from './App.tsx'
import './styles/app.css'

createRoot(document.querySelector('#root')).render(
  <App />
)
