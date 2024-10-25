import { useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Layout from './layouts/Layout/Layout';

import Home from './pages/Home/Home';
import Calculator from './pages/Calculator/Calculator';
import Components from './pages/Component/Components';
import Todo from './pages/Todo/Todo';
import Products from './pages/Product/Products';
import Carts from './pages/Cart/Carts'
import Login from './pages/Login/login';
import Animation from './pages/Animation/Animation';

import { fetchProducts } from './data/product';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import './App.css'


// HashRouter, BrowserRouter, MemoryRouter
// localhost:5173/#/<paths>   // HashRouter *compatable old
// localhost:5173/<paths>     // BrowserRouter *production
// localhost:5173             // MemoryRouter

// App -> Layout -> Navbar (buttons)
// tab -> (props)

const intTab = 'home';
function App() {
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  const [tab, setTab] = useState('');
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    setProducts(fetchProducts())
  }, [])

  useEffect(() => console.log(products), [products])

  useEffect(() => {
    setTab(intTab);
  }, []); // first load

  if (token === '') { return (<Login setToken={setToken} setRole={setRole}/>) }
  else {
    return (
      <div className='app-container'>
        <HashRouter>
          <Routes>
            <Route element={<Layout products={products} carts={carts} tab={tab} setTab={setTab} setToken={setToken} role={role} />}>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/calculator' element={<Calculator />} />
              <Route path='/Animation' element={<Animation />} />
              <Route path='/components' element={<Components />} />
              <Route path='/todo' element={<Todo />} />
              <Route path='/products' element={<Products products={products} setProducts={setProducts} carts={carts} setCarts={setCarts} />} />
              <Route path='/carts' element={<Carts carts={carts} setCarts={setCarts} />} />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    )
    }
}

export default App
