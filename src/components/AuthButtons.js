import React, { useState } from 'react';
import './AuthButtons.css';

const AuthButtons = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login:', formData);
    setShowLoginModal(false);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // TODO: Implement signup logic
    console.log('Signup:', formData);
    setShowSignupModal(false);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // TODO: Implement forgot password logic
    console.log('Forgot Password:', formData.email);
    setShowForgotPasswordModal(false);
  };

  const switchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const switchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  return (
    <div className="auth-buttons">
      <button className="auth-btn login-btn" onClick={() => setShowLoginModal(true)}>
        Login
      </button>
      <button className="auth-btn signup-btn" onClick={() => setShowSignupModal(true)}>
        Sign Up
      </button>

      {showLoginModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <div className="auth-links">
                <button 
                  type="button" 
                  className="link-button"
                  onClick={() => {
                    setShowLoginModal(false);
                    setShowForgotPasswordModal(true);
                  }}
                >
                  Forgot Password?
                </button>
                <button 
                  type="button" 
                  className="link-button"
                  onClick={switchToSignup}
                >
                  Don't have an account? Sign Up
                </button>
              </div>
              <div className="modal-buttons">
                <button type="submit">Login</button>
                <button type="button" onClick={() => setShowLoginModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSignupModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <div className="auth-links">
                <button 
                  type="button" 
                  className="link-button"
                  onClick={switchToLogin}
                >
                  Already have an account? Login
                </button>
              </div>
              <div className="modal-buttons">
                <button type="submit">Sign Up</button>
                <button type="button" onClick={() => setShowSignupModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showForgotPasswordModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Reset Password</h2>
            <form onSubmit={handleForgotPassword}>
              <p className="forgot-password-text">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <div className="auth-links">
                <button 
                  type="button" 
                  className="link-button"
                  onClick={() => {
                    setShowForgotPasswordModal(false);
                    setShowLoginModal(true);
                  }}
                >
                  Back to Login
                </button>
              </div>
              <div className="modal-buttons">
                <button type="submit">Send Reset Link</button>
                <button type="button" onClick={() => setShowForgotPasswordModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthButtons; 