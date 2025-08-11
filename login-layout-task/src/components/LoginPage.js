import '../style/loginStyle.css'
import { useState } from 'react';
import { RegisterPage } from './RegisterPage';

export const LoginPage = () => {

  const email = "abc123@gmail.com";
  const firstLetter = email.charAt(0).toUpperCase()
  const password = "abc123";

  // holds values from email password input fields
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  
  // for managing invalid inputs
  const [emailStatus, setEmailStatus] = useState(false);
  const [passStatus, setPassStatus] = useState(false);

  // for rendering register page
  const [registerPage, setRegisterStatus] = useState(false);

  const[emailLogo, setEmailLogo] = useState(firstLetter)

  const emailValidation = () => {

    if(userEmail === email && userPassword === password) {
      setRegisterStatus(!registerPage);
    }
    else if(userEmail !== email) {
      setEmailStatus(!emailStatus);
    }
    else if(userPassword !== password) {
      setPassStatus(!passStatus);
    }
  }

  return (
    <>
      {
        registerPage ? 
        (<RegisterPage emailLogo={emailLogo} />) : (
            <div className='loginGlobal'>
        <div className='loginLogo'>
            <h1>Login Layout Task</h1>
            <i className="fa-solid fa-right-to-bracket"></i>
        </div>
        <div className='loginArea'>
          <h1>Login Page</h1>

          {
            emailStatus ? <p className='error-message'>*Please check your email</p> : <p>Email</p>
          }
          <input
            type="text"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className={emailStatus ? 'email-error':'input'}
          />

          {
            passStatus ? <p className='error-message'>*Please check your password</p> : <p>Password</p>
          }
          <input
            type="text"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className={passStatus ? 'pass-error':'input'}
          />
          <button
            onClick={emailValidation}
            disabled={!userEmail || !userPassword}
            className={!userEmail || !userPassword ? 'btn-disabled':'btn-active'} 
          >Login</button>
        </div>
    </div>
        )
      }
    </>
  )
}