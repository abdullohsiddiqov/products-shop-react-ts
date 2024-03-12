import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/auth/useAuthContext";
import { useCartsContext } from "../contexts/cart/useCartsContext";
import { Link } from "react-router-dom";
import logoutIcon from "../assets/images/logout.svg";
import favoriteIcon from "../assets/images/favorites.svg";
import korzinaIcon from "../assets/images/korzina.svg";
import clothesIcon from "../assets/images/clothes.jpg";
import iosIcon from "../assets/images/iOS.webp";
import samsungIcon from "../assets/images/samsung.webp";

export const Navbar: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cartItems } = useCartsContext();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNextSlide();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [activeSlide]);

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
    setOpacity(1);
  };

  const handlePrevSlide = () => {
    setActiveSlide(activeSlide === 0 ? 2 : activeSlide - 1);
    setOpacity(1);
  };

  const handleNextSlide = () => {
    setActiveSlide(activeSlide === 2 ? 0 : activeSlide + 1);
    setOpacity(1);
  };

  useEffect(() => {
    const opacityInterval = setInterval(() => {
      if (opacity > 0) {
        setOpacity(opacity - 0.05);
      }
    }, 100);
  
    return () => clearInterval(opacityInterval);
  }, [opacity]);
  

  return (
    <>
      <nav id="navbar">
        <Link to="/" className="iconn">
          <div className="iconn">
            <span>M.A</span>
          </div>
        </Link>
        <ul className="nav-elementss">
          <Link to="/page/products/list">
            <li>Products</li>
          </Link>
          <Link to="/page/about-us">
            <li>About</li>
          </Link>
          <Link to="/page/popular/list">
            <li>Popular</li>
          </Link>
        </ul>
        <ul className="nav-icons">
          <div className="flex">
            <li>
              <Link to="/page/favorites">
                <button className="favorites">
                  <img src={favoriteIcon} alt="" />
                </button>
              </Link>
            </li>
            <li>
              <Link to="/page/user/korzina">
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
              <Link to="/user/profile" className="user-info">
              <div className="user-info">
                {user.avatar && (
                  <img src={user.avatar} alt="Avatar" className="avatar" />
                )}
                <span style={{ color: "black" }} className="user">
                  {user.name}({isAdmin() && <span className="admin-text">ADMIN</span> || <span className="user-text">USER</span>})
                </span>
              </div>
              </Link>
              <button onClick={logout} className="logout">
                <img src={logoutIcon} alt="Logout" />
              </button>
            </>
          ) : (
            <>
              <li className="auth">
                <Link to="/auth/sign-up" className="txt">
                  <button type="button" className="btn btn-primary">
                    Sign Up
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <header>
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className={activeSlide === 0 ? "active" : ""}
              aria-current="true"
              aria-label="Slide 1"
              onClick={() => handleSlideChange(0)}
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              className={activeSlide === 1 ? "active" : ""}
              aria-label="Slide 2"
              onClick={() => handleSlideChange(1)}
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              className={activeSlide === 2 ? "active" : ""}
              aria-label="Slide 3"
              onClick={() => handleSlideChange(2)}
            ></button>
          </div>
          <div className="carousel-inner">
            <div
              className={
                activeSlide === 0 ? "carousel-item active" : "carousel-item"
              }
            >
              <img
                src={iosIcon}
                className="d-block w-100"
                alt="Colorful Icon"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Iphone 15 pro max</h5>
                <p>
                  The iPhone 15 Pro Max display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 6.69 inches diagonally (actual viewable area is less).
                </p>
              </div>
            </div>
            <div
              className={
                activeSlide === 1 ? "carousel-item active" : "carousel-item"
              }
            >
              <img
                src={clothesIcon}
                className="d-block w-100"
                alt="Clothes Icon"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Clothes</h5>
                <p>
                  Lots of clothes for your taste and color.
                </p>
              </div>
            </div>
            <div
              className={
                activeSlide === 2 ? "carousel-item active" : "carousel-item"
              }
            >
              <img
                src={samsungIcon}
                className="d-block w-100"
                alt="Recycle Icon"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Galaxy S24+ </h5>
                <p>
                  Accelerometer, Barometer, Fingerprint Sensor, Gyro Sensor, Geomagnetic Sensor, Hall Sensor, Light Sensor, Proximity Sensor
                </p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
            onClick={handlePrevSlide}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
            onClick={handleNextSlide}
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </header>
    </>
  );
};
