import {NavLink} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import "./style.scss"

const AdminSidebar = () => {
  function handleLogout() {
    localStorage.removeItem('test-token');
    window.location.reload();
  }
  const userData = useSelector(state=>state.registrationReducer.userData)
  return <div className='P-navigation-list'>

      <h1>{userData.firstname}</h1>
    <ul>
      <li>
        <NavLink to={'/category'}>Category</NavLink>
      </li>
      <li>
        <NavLink to={'/products'}>Products</NavLink>
      </li>
      <li>
        <button className="logout-button" onClick={handleLogout}>LogOut</button>
      </li>
    </ul>
  </div>
}
export default AdminSidebar