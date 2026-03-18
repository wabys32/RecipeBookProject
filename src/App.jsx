import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import NavBar from './components/NavBar'

const LazyHome = lazy(() => import('./pages/Home'))
const LazyRecipes = lazy(() => import('./pages/Recipes'))
const LazyProfile = lazy(() => import('./pages/Profile'))
const LazyNotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <NavBar />
      <Suspense fallback={<div className="text-center py-20 text-xl">Загружаем страницу...</div>}>
        <Routes>
          <Route path="/" element={<LazyHome />} />
          <Route path="/recipes" element={<LazyRecipes />} />
          <Route path="/profile" element={<LazyProfile />} />
          <Route path="*" element={<LazyNotFound />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App