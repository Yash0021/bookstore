
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './Components/Authentication/Login';
import Navbar from './Components/Navbar/Navbar';
import Search from './Components/Search/Search';
import Footer from './Components/Footer/Footer';
import Register from './Components/Authentication/Register';
import ProductListing from './Components/Dashboard/ProductListing';
import Cart from './Components/Cart/Cart';
import Product from './Components/Product/Product';
import EditProduct from './Components/EditProduct/EditProduct';
import AuthContext from './Components/Context/auth_context'
import axios from 'axios';

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [userEmail, setUserEmail] = React.useState('')
  const [totalItems, setTotalItems] = React.useState(0)

  React.useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    if(userToken){
      axios.get('http://localhost:3000/profile', {
        headers: {
          Authorization: userToken
        }
      }).then(data => {
        setIsLoggedIn(true)
        setUserEmail(data.data.email)
      }).catch(err => {
        return
      })
    }

    axios.get('http://localhost:3000/my_cart', {
      headers: {
        Authorization: userToken
      }
    }).then(data => {
      setTotalItems(data.data.totalItems)
    }).catch(err => {
      return
    })
  })

  return (
    <Router>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          email: userEmail,
          totalItems: totalItems
        }}
      >
        <Navbar />
        <Search />
        <Routes>
          <Route path='/' element={<ProductListing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product' element={<Product />} />
          <Route path="/edit_product" element={<EditProduct />} />
        </Routes>
        <Footer />
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
