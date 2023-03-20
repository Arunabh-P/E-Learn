import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import loginImg from '../images/banners/teacher.jpg';
import { useNavigate } from 'react-router-dom';
import { useTeacherContext } from '../context/teacherContext';

const Login = () => {
  const { state, login } = useTeacherContext();
  const { teacherInfo, isError } = state;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    if (teacherInfo) {
      navigate('/teacher');
    }
  }, [teacherInfo, navigate]);

  return (
    <>
      <Container className="login-page">
        <div className="login-page-wrapper">
          <div
            className="login-img-div"
            style={{ backgroundImage: `url(${loginImg})` }}
          ></div>
          <div className="login-form-div">
            <form onSubmit={submitHandler} className="login-form">
              <h1 className="login-Headline text-center mb-3">Sign in</h1>
              <input
                className="mb-3 login-input"
                type="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                className="mb-3 login-input"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isError && <div>{isError}</div>}
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
