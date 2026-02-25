import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light'
    setTheme(saved)
  }, [])

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header theme={theme} setTheme={setTheme} />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App