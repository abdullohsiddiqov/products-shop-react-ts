import { BrowserRouter as Router, Route as ReactRoute, Routes} from 'react-router-dom';
import { AuthProvider } from '../contexts/auth/useAuthContext';
import { CartsProvider } from '../contexts/cart/useCartsContext';
import { Navbar } from '../pages/navbar';
import { Login } from '../auth/login';
import { Favorites } from '../pages/favorites';
import { Basket } from '../pages/basket';
import { Popular } from '../pages/popular';
import { About } from '../pages/aboutUs';
import { Products } from '../pages/products';
import SingleProduct from '../pages/single.product';
import { Profile } from '../pages/profile';

export function Routers(){ 
    return( 
    <Router>
      <AuthProvider>
        <CartsProvider>
          <Routes>
            <ReactRoute path='/' element={<Navbar/>}/>
            <ReactRoute path="/auth/sign-up" element={<Login />} />
            <ReactRoute path="/page/favorites" element={<Favorites />} />
            <ReactRoute path="/page/user/korzina" element={<Basket />} />
            <ReactRoute path="/page/popular/list" element={<Popular />} />
            <ReactRoute path="/page/products/list" element={<Products />} />
            <ReactRoute path="/page/products/:id" element={<SingleProduct />} />
            <ReactRoute path="/page/about-us" element={<About />} />
            <ReactRoute path="/user/profile" element={<Profile />} />
          </Routes>
        </CartsProvider>
      </AuthProvider>
    </Router>
    )
}