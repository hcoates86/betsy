import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import { useHistory } from 'react-router-dom';


function SignupFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [buttonClass, setButtonClass] = useState('');

  const [submitted, setSubmitted] = useState(false);


  const { closeModal } = useModal();


  useEffect(()=> {
    const errorObj = {};
    if (username.length < 4 || username.length > 30) errorObj["username"] = "Username must be between 4 and 30 characters";
    if (username.includes('@')) errorObj["username"] = "Username cannot be an email";
    if (email < 3 || email > 256) errorObj["email"] = "Email must be between 3 and 256 characters";
    if (!email.includes('@') || !email.includes('.')) errorObj["email"] = "Invalid email";
    if (firstName.length < 1) errorObj['firstName'] = "All fields must be filled out";
    if (lastName.length < 1) errorObj['lastName'] = "All fields must be filled out";
    if (password !== confirmPassword) errorObj['confirmPassword'] = 'Passwords must match';
    if (password.length < 6) errorObj['password'] = "Password must be at least 6 characters long";

    if (!email || !firstName || !lastName || !confirmPassword || username.length < 4 || password.length < 6 || confirmPassword.length < 6) {
        setDisabled(true)
        setButtonClass('');
      } else {
        setDisabled(false);
        setButtonClass('button-orange')
      }

    if (submitted) {
      setErrors(errorObj) 
    }
    }, [username, email, firstName, lastName, password, confirmPassword, submitted])


  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .then(history.push('/'))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className="signup-outer-box">
      <div className="signup-box">
      <h1 id='signup-h1'>Sign Up</h1>
      <form onSubmit={handleSubmit}>

       

        <label>
          <input className='signup-input'
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className='errors'>{errors.firstName}</p>}

        <label>
          <input className='signup-input'
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className='errors'>{errors.lastName}</p>}

        <label>
          <input className='signup-input'
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        
        {errors.email && <p className='errors'>{errors.email}</p>}
        <label>
          <input className='signup-input'
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className='errors'>{errors.username}</p>}
        <label>
          
          <input className='signup-input'
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className='errors'>{errors.password}</p>}
        <label>
          
          <input className='signup-input'
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p className='errors'>{errors.confirmPassword}</p>
        )}
        <button id='signup-button' className={buttonClass} type="submit" disabled={disabled}>Sign Up</button>
      </form>
    </div></div>
  );
}

export default SignupFormModal;