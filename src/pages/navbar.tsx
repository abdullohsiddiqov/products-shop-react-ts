import logoutIcon from '../assets/images/logout.svg';
import favoriteIcon from '../assets/images/favorites.svg';
import korzinaIcon from '../assets/images/korzina.svg';
import { useAuth } from "../contexts/auth/useAuthContext";
import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <>
        <nav className='nav'>
            <Link to='/' className='icon'>
            <div className="icon">
                M.A
            </div>
            </Link>
                <ul className='nav-elements'>
                    <li>
                        Products
                    </li>
                    <li>
                        About us
                    </li>
                    <li>
                        Popular
                    </li>
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
