import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProductPage from './pages/ProductPage/ProductPage'
import ProductsPage from './pages/ProductsPage/ProductsPage'
import Navigation from './components/Navigation/Navigation'
import CreateProductPage from './pages/CreateProductPage/CreateProductPage'
import EditProductPage from './pages/EditProductPage/EditProductPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'

function App() {
  return (
    <div className="app">
      <Navigation />
      <Routes>
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path="/create-product" element={<CreateProductPage />} />
          <Route path="/edit-product/:id" element={<EditProductPage />} />
          <Route path='/' element={<Navigate to="/products" replace /> } />
          <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App
