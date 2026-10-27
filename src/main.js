import './style.css'
import { renderPage, enableNavigation } from './router.js'

    
const app = document.querySelector('#app')

renderPage (app)

enableNavigation (app)