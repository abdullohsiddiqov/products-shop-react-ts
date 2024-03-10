import React from 'react';
import { useAuth } from "../contexts/auth/useAuthContext";
import { useCartsContext } from '../contexts/cart/useCartsContext';
import { Link } from "react-router-dom";
import logoutIcon from '../assets/images/logout.svg';
import favoriteIcon from '../assets/images/favorites.svg';
import korzinaIcon from '../assets/images/korzina.svg';
export const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCartsContext();
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <nav className='nav'>
                <Link to='/' className='icon'>
                    <div className="icon">
                        M.A
                    </div>
                </Link>
                <ul className='nav-elements'>
                    <Link to='/page/products/list'>
                        <li>
                            Products
                        </li>
                    </Link>
                    <Link to='/page/about-us'>
                        <li>
                            About us
                        </li>
                    </Link>
                    <Link to='/page/popular/list'>
                        <li>
                            Popular
                        </li>
                    </Link>
                </ul>
                <ul className="nav-icons">
                    <div className="flex">
                        <li>
                            <Link to='/page/favorites'>
                                <button className="favorites">
                                    <img src={favoriteIcon} alt="" />
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to='/page/user/korzina'>
                                <button className="korzina">
                                    <img src={korzinaIcon} alt="" />
                                    {cartItemCount > 0 && (
                                        <div className="cart-count">{cartItemCount}</div>
                                    )}
                                </button>
                            </Link>
                        </li>
                    </div>
                    {user ? (
                        <>
                            <div className="user-info">
                                {user.avatar && (
                                    <img src={user.avatar} alt="Avatar" className="avatar" />
                                )}
                                <span style={{ color: "white" }} className='user'>{user.name}</span>
                            </div>
                            <button onClick={logout} className="logout">
                                <img src={logoutIcon} alt="Logout" />
                            </button>
                        </>
                    ) : (
                        <>
                            <li className="auth">
                                <Link to="/auth/sign-up" className="txt">
                                    <button className="sign-up">
                                        Sign Up
                                    </button>
                                </Link>
                            </li>
                        </>
                    )} 
                </ul>
            </nav>
        </>
    );
};
