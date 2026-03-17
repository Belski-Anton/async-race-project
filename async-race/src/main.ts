import './style.css'
import { createApp } from './app.ts'
const root = document.querySelector('div')

if (!(root instanceof HTMLDivElement)) {
  throw new Error('App root not found')
}

root.append(createApp())
