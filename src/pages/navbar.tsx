import React, { useState } from "react";
import { useAuth } from "../contexts/auth/useAuthContext";
import { useCartsContext } from "../contexts/cart/useCartsContext";
import { Link } from "react-router-dom";
import logoutIcon from "../assets/images/logout.svg";
import favoriteIcon from "../assets/images/favorites.svg";
import korzinaIcon from "../assets/images/korzina.svg";
import colorIcon from "../assets/images/color.jpg";
import clothesIcon from "../assets/images/clothes.jpg";
import recycleIcon from "../assets/images/recycle.jpg";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCartsContext();
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
  };

  const handlePrevSlide = () => {
    setActiveSlide(activeSlide === 0 ? 2 : activeSlide - 1);
  };

  const handleNextSlide = () => {
    setActiveSlide(activeSlide === 2 ? 0 : activeSlide + 1);
  };

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
            <li>About us</li>
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
              <div className="user-info">
                {user.avatar && (
                  <img src={user.avatar} alt="Avatar" className="avatar" />
                )}
                <span style={{ color: "black" }} className="user">
                  {user.name}
                </span>
              </div>
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
                src={colorIcon}
                className="d-block w-100"
                alt="Colorful Icon"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>
                  Some representative placeholder content for the first slide.
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
                <h5>Second slide label</h5>
                <p>
                  Some representative placeholder content for the second slide.
                </p>
              </div>
            </div>
            <div
              className={
                activeSlide === 2 ? "carousel-item active" : "carousel-item"
              }
            >
              <img
                src={recycleIcon}
                className="d-block w-100"
                alt="Recycle Icon"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>
                  Some representative placeholder content for the third slide.
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
