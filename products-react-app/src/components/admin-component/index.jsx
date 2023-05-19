import {Navigate, Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";

import './style.css'
import axios from "axios";
import {useDispatch} from "react-redux";
import AdminSidebar from "../admin-sidebar";
import PageLoader from "../page-loader";
import Category from "../../pages/category";
import Products from "../../pages/Products";

const AdminComponent = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem('test-token')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (token) {
      getUserData()
    }
  }, [])

  const getUserData = async () => {
    setIsLoading(true)
    const response = await axios.get("https://crudcrud.com/api/54b7434fe7b8437b854d954f91ddf9c4/registration");
    const registrationData = response.data;
    const matchingUser = registrationData.find((user) => user._id === token);
    if (matchingUser) {
      dispatch({type: 'SET_USER_DATA', payload: matchingUser})
      setIsLoading(false)
    } else {
      localStorage.removeItem('test-token')
      window.location.reload()
    }
  }

  if (isLoading) {
    return <PageLoader/>
  }


  return !isLoading && <div className="P-admin-component">
    <AdminSidebar/>
    <div className='P-main-pages'>
      <Routes>
        <Route element={<Category/>} path={'/category'}/>
        <Route element={<Products/>} path={'/products'}/>
        <Route element={<Navigate to={'/category'}/>} path={'/*'}/>
      </Routes>
    </div>
  </div>
}
export default AdminComponent