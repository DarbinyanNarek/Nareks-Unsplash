import React, {useState, useEffect} from 'react';

import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {loginIntoPage} from "../../store/actions/LoginAction";
import {toast} from "react-toastify";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useCallback} from "react";



const Login = () => {
  const token = useSelector(state => state.login.token)
  const [value, setValue] = useState({
    username: "",
    password: "",
  });




  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      navigate("/home-page");
      window.location.reload(true);

    }
  }, [token]);

  const saveButtonClick = useCallback( async (e) => {
    e.preventDefault();
    const {username, password} = value

    await dispatch(loginIntoPage({username, password}))
    if (!username || !password.length > 8) {
      toast.error("email or password is wrong or empty")
      return;
    }if  (!token){
      toast.error("email or password is wrong")
    }else {
      toast.success("you logged in!")
    }

  }, [value])


  return (
    <div className="login_container">
      <p className="login_p">Login Page</p>
      <form className="login_form" onSubmit={saveButtonClick}>
        <label htmlFor="username" className="login_label">
          Username
        </label>
        <input type="text"
               value={value.username || ""}
               onChange={(e) => setValue({...value, username: e.target.value})}
               id="username"
               className="login_input"
        />
        <label htmlFor="password" className="login_label">
          Password
        </label>
        <input type="password"
               value={value.password || ""}
               onChange={(e) => setValue({...value, password: e.target.value})}
               id="password"
               className="login_input"
        />
        <button className="login_button" onClick={saveButtonClick}>Login</button>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </form>

    </div>
  );
};

export default Login;
