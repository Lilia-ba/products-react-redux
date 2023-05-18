import './App.css';
import React, { useEffect,useState } from 'react';
import AdminComponent from "./components/admin-component";
import GuestComponent from "./components/guest-component";

function App() {

const token = localStorage.getItem('test-token')

return token ? <AdminComponent/> : <GuestComponent/>

}

export default App;
