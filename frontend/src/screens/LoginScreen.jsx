import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import "../styles/LoginPage.css"; // Custom CSS for extra styling
import { useState,useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../components/loader.jsx';
import { useLoginMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  const dispatch=useDispatch();
  const navigate= useNavigate();
  
  const [login, {isLoading}]=useLoginMutation();

  const {userInfo}=useSelector((state)=>state.auth);
  const {search}=useLocation();
  const sp=new URLSearchParams(search);
  const redirect=sp.get('redirect') || '/';
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(()=>{
    if(userInfo){
      navigate(redirect);
    }
  },[userInfo, redirect, navigate]);

  const submitHandler = async(e) => {
    e.preventDefault();
    setErrorMessage('');

  // Validate email and password fields
  if (!email || !password) {
    setErrorMessage('Invalid email or password');
    return;
  }
    try {
      const res=await login({email, password}).unwrap();
      dispatch(setCredentials({...res, }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }
  return (
    <div className="login-container">
      {/* Left Section with Text & Logo */}
      <div className="left-section">

        <h1 className="title">Style Up <br /><span>Curated Just For You</span> <br />Shop Now!</h1>
        <div className="theme-selection">

          <span className="theme-arrow">🛍️</span>

          <span className="theme-text">Ours STORE</span>
          <span className="theme-arrow">▼</span>
        </div>
      </div>

      {/* Right Section - Login Box */}
      <div className="login-box shadow-lg p-4 rounded">
        <h2 className="brand-name">🛍️</h2>
        <h5 className="text-center mt-2">Welcome to Ours Store! 👋</h5>
        <p className="text-center text-muted">
          Please sign-in to continue!!
        </p>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            {/* Email Input */}
            <Form.Group controlId="email" className="mb-3">
              <Form.Label className="form-label"><label>Email</label></Form.Label>
              <Form.Control type="email" className="form-control" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value) }}></Form.Control>
            </Form.Group>
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <Form.Group controlId="password" className="mb-3">
              <Form.Label className="form-label">Password</Form.Label>
              <div className="password-wrapper">
                <Form.Control type="password" className="form-control" placeholder="Enter your Password" value={password} onChange={(e) => { setpassword(e.target.value) }}></Form.Control>
                <a href="/" className="forgot-password">Forgot Password?</a>
              </div>
            </Form.Group>
          </div>
          {errorMessage && (
    <div className="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  )}
          {/* Remember Me Checkbox */}
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
          </div>
          {/* Sign-in Button */} 
          <Button type="submit" variant="primary" className="btn btn-primary w-100" disabled={isLoading}>Sign in</Button>
          {isLoading && <Loader/>}
        </Form>




        {/* Create Account Link */}
        <p className="text-center mt-3">
          New on our platform? 
          <Link to={redirect ? `/signup?redirect=${redirect}` : '/signup'}>Create an account</Link>

        </p>

        {/* OR Divider */}
        <div className="or-divider">
          <span>or</span>
        </div>

        {/* Social Login Icons */}
        <div className="social-login d-flex justify-content-center gap-3">
          <button className="social-btn"><FaGoogle /></button>
          <button className="social-btn"><FaFacebook /></button>
          <button className="social-btn"><FaTwitter /></button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
