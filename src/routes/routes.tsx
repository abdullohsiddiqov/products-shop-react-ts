import React from 'react';
import { BrowserRouter as Router, Route as ReactRoute, Routes} from 'react-router-dom';
import { AuthProvider } from '../contexts/auth/useAuthContext';
import { CartsProvider } from '../contexts/cart/useCartsContext';
import { Navbar } from '../pages/navbar';
import { Login } from '../auth/login';
import { Favorites } from '../pages/favorites';
import { Korzina } from '../pages/korzina';
import { Popular } from '../pages/popular';
import { About } from '../pages/aboutUs';
import { Products } from '../pages/products';
import SingleProduct from '../pages/single.product';

export function Routers(){ 
    return( 
    <Router>
      <AuthProvider>
        <CartsProvider>
          <Navbar/>
          <Routes>
            <ReactRoute path="/auth/sign-up" element={<Login />} />
            <ReactRoute path="/page/favorites" element={<Favorites />} />
            <ReactRoute path="/page/user/korzina" element={<Korzina />} />
            <ReactRoute path="/page/popular/list" element={<Popular />} />
            <ReactRoute path="/page/products/list" element={<Products />} />
            <ReactRoute path="/page/products/:id" element={<SingleProduct />} />
            <ReactRoute path="/page/about-us" element={<About />} />
          </Routes>
        </CartsProvider>
      </AuthProvider>
    </Router>
    )
}
