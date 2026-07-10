import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// 1. Importation globale de Bootstrap 5
import 'bootstrap/dist/css/bootstrap.min.css'

// 2. Configuration locale de Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons' 

library.add(fas) 

// 3. Importation du style personnalisé
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)