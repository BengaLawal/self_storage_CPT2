import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import Home from './pages/home/home'

export default function App() {
  return (<>
    <section id='home'>
      <Home />
    </section>
  </>
  )
}

