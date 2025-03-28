import './App.css'
import { Route, Routes } from 'react-router-dom'
import ProductPage from './pages/ProductPage/ProductPage'
import ProductsPage from './pages/ProductsPage/ProductsPage'
import Navigation from './components/Navigation/Navigation'
import CreateProductPage from './pages/CreateProductPage/CreateProductPage'
import EditProductPage from './pages/EditProductPage/EditProductPage'
// import ErrorPage from './pages/ErrorPage/ErrorPage'
import MainPage from './pages/MainPage/MainPage'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './store/store'
import { getUser } from './store/authSlice'
import { useEffect } from 'react'
import LoginPage from './pages/LoginPage/LoginPage'

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch]);

  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route path='/' index element={<MainPage />}  />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/auth' element={<LoginPage />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
        <Route path='*' element={<MainPage />} />
      </Routes>
    </div>
  )
}

export default App;