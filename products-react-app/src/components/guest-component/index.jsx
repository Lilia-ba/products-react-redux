import {Navigate, Route, Routes} from "react-router-dom";
import LogIn from "../../pages/log-in";
import React from "react";
import Registration from "../../pages/registr-in";
import {NavLink, useLocation} from 'react-router-dom';
import "./style.scss"
import {useSelector} from "react-redux";
import HomePage from "../../pages/homepage";
import Cart from "../cart";

const GuestComponent = () => {
  const cartItems = useSelector((state) => state.cartReducer);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return <>
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {isHomePage ? (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          ) : null}
          <li>
            <NavLink to="/cart">Cart {totalQuantity > 0 ? totalQuantity : ""} </NavLink>
          </li>
        </ul>
      </nav>
    </header>


    <Routes>
      <Route element={<HomePage/>} path={'/'}/>
      <Route element={<Registration/>} path={'/registration'}/>
      <Route element={<LogIn/>} path={'/login'}/>
      <Route element={<Cart/>} path={'/cart'}/>
      <Route element={<Navigate to={'/'}/>} path={'/*'}/>
    </Routes>
  </>
}

export default GuestComponent