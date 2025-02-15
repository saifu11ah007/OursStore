import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import '../styles/SignupPage.css';
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../components/loader.jsx';
import { useRegisterMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/login';
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    if (userInfo) {
      navigate(redirect); // Use the `redirect` parameter
    }
  }, [userInfo, redirect, navigate]);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validate email and password fields
    if (!email || !password || !name) {
      setErrorMessage('Invalid email or password');
      return;
    }
    if (password !== confirmpassword) {
      setErrorMessage('Password doesnt match');
      return;
    }
    else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res, }));
        navigate(redirect);
      } catch (err) {
        alert(err?.data?.message || err.error);
      }
    }

  }
  return (
    <div className="signup-container">
      {/* Decorative Background Elements */}
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
      <div className="circle circle-3"></div>

      {/* Signup Card */}
      <div className="signup-card">
        <h2 className="brand-name">sneat</h2>
        <h3 className="signup-heading">Welcome Aboard! 🚀</h3>
        <p className="subtext">Sign up to experience exclusive perks and the best deals!</p>

        {/* Name Field */}
        <Form onSubmit={submitHandler}>
          <div className="input-container">
            <Form.Group controlId="name" className="mb-3">
              <Form.Control type="text" className="form-control input-field" placeholder="" value={name} onChange={(e) => { setname(e.target.value) }}></Form.Control>
              <Form.Label className="form-label input-label"><label> Name</label></Form.Label>
            </Form.Group>
          </div>

          {/* Email Field */}
          <div className="input-container">
          <Form.Group controlId="email" className="mb-3">
              <Form.Control type="email" className="form-control input-field" placeholder="" value={email} onChange={(e) => { setEmail(e.target.value) }}></Form.Control>
              <Form.Label className="form-label input-label"><label> Email</label></Form.Label>
            </Form.Group>
          </div>

          {/* Password Field */}
          <div className="input-container">
          <Form.Group controlId="password" className="mb-3">
              <Form.Control type="password" className="form-control input-field" placeholder="" value={password} onChange={(e) => { setpassword(e.target.value) }}></Form.Control>
              <Form.Label className="form-label input-label"><label> Password</label></Form.Label>
            </Form.Group>

          </div>

          {/* Confirm Password Field */}
          <div className="input-container">
          <Form.Group controlId="confirmpassowrd" className="mb-3">
              <Form.Control type="password" className="form-control input-field" placeholder="" value={confirmpassword} onChange={(e) => { setconfirmpassword(e.target.value) }}></Form.Control>
              <Form.Label className="form-label input-label"><label> Confirm Password</label></Form.Label>
            </Form.Group>

          </div>
          {errorMessage && (
    <div className="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  )}
          {/* Signup Button */}
          <Button type="submit" variant='primary' className="btn btn-primary w-100" disabled={isLoading}>Sign Up</Button>
          {isLoading && <Loader/>}
        </Form>
        {/* OR Divider */}
        <div className="or-divider">
          <span>or</span>
        </div>

        {/* Social Login Buttons */}
        <div className="social-login">
          <button className="social-btn"><FaGoogle /></button>
          <button className="social-btn"><FaFacebook /></button>
          <button className="social-btn"><FaTwitter /></button>
        </div>

        {/* Already have an account? */}
        <p className="login-link">
          Already a member? <Link to={'/login'}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupScreen;
