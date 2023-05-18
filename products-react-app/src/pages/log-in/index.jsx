import './style.css'
import {useState} from "react";
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from 'react-redux';

const LogIn = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }


  const handleClick = async () => {
    const response = await axios.get("https://crudcrud.com/api/54b7434fe7b8437b854d954f91ddf9c4/registration");
    const registrationData = response.data;
    dispatch({type: "LOGIN_SUCCESS", payload: registrationData});

    const matchingUser = registrationData.find((user) => user.password === formData.password && user.email === formData.email);
    console.log(registrationData)
    if (matchingUser) {
      localStorage.setItem("test-token", matchingUser._id);
      window.location.reload();
    } else {
      alert("Invalid email or password.");
    }
  }

  return <div className='P-login-block'>
    <div className='P-login-box'>
      <label>
        <input name={'email'} onChange={handleChange} type="text" placeholder='email'/>
      </label>
      <label>
        <input name={'password'} onChange={handleChange} type="password" placeholder={'Password'}/>
      </label>
      <button onClick={handleClick}>Log in</button>
      <p>Not a member? <NavLink to={'/registration'}>Registration</NavLink></p>
    </div>
  </div>
}
export default LogIn