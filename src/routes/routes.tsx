import { BrowserRouter as Router, Route as ReactRoute, Routes} from 'react-router-dom';
import { AuthProvider } from '../contexts/auth/useAuthContext';
import { CartsProvider } from '../contexts/cart/useCartsContext';
import { Navbar } from '../pages/navbar';
import { Login } from '../auth/login';
import { Favorites } from '../pages/favorites';
import { Korzina } from '../pages/korzina';

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
          </Routes>
        </CartsProvider>
      </AuthProvider>
    </Router>
    )
}
