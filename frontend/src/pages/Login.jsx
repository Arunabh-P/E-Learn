import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import loginImg from '../images/banners/teacher.jpg';
import { useDispatch } from 'react-redux';
import { signIn } from '../actions/teacherActions';

const Login = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    dispatch(signIn(loginData));
  };

  return (
    <>
      <Container className="login-page">
        <div className="login-page-wrapper">
          <div
            className="login-img-div"
            style={{ backgroundImage: `url(${loginImg})` }}
          ></div>
          <div className="login-form-div">
            <div className="login-form">
              <h1 className="login-Headline text-center mb-3">Sign in</h1>
              <input
                className="mb-3 input-style-1"
                type="email"
                name="email"
                placeholder="Enter Email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
              <input
                type="password"
                name="password"
                className="mb-3 input-style-1"
                placeholder="Enter Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              {/* {isError && <div>{isError}</div>} */}
              <button onClick={handleLogin} className="login-btn">
                Login
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
