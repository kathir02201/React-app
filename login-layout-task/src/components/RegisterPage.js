import React, { useState } from 'react'
import '../style/RegisterStyle.css';

export const RegisterPage = ({emailLogo}) => {
  
  // holds values from all input fields
  const [registerData, setRegisterData] = useState({
    name:"",
    age:"",
    mobile:"",
    email:"",
    adhaar:"",
    address:"",
    gender:""
  })

  // holds error messages for each field
  const [errors, setErrors] = useState({});

  // user details pop-up
  const [userDetails, setUserDetails] = useState(false)

  // Handling input changes
  const handleChange = (e) => {
    const { value, name ,id} = e.target;
    const key = name || id;

    setRegisterData((registerData)=>({
      ...registerData,
      [key]:value
    }));  

    validateField(key, value);
  };

  // Validation 
const validateField = (field, value) => {
  let errorMsg = "";

  switch (field) {
    case "name":
      if (!/^[A-Za-z\s]+$/.test(value)) {
        errorMsg = "*Name must contain only letters & spaces";
      }
      break;

    case "age":
      if (!value) {
        errorMsg = "Age is required";
      }
      break;

    case "mobile":
      if (!/^[0-9]{10}$/.test(value)) {
        errorMsg = "Enter a valid 10-digit mobile number";
      }
      break;

    case "email":
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMsg = "Invalid email address";
      }
      break;

    case "adhaar":
      if (!/^\d{12}$/.test(value)) {
        errorMsg = "Adhaar must be a 12-digit number";
      }
      break;

    case "address":
      if (!value.trim()) {
        errorMsg = "Address is required";
      }
      break;

    case "gender":
      if (!value) {
        errorMsg = "Please select gender";
      }
      break;

    default:
      break;
  }

  setErrors((registerData) => ({
    ...registerData,
    [field]: errorMsg
  }));
};

  // handle change
  const handleSubmit = (e) => {
    e.preventDefault();
      setUserDetails(!userDetails);
  };
  
  return (
    <>
    <div className='register-global'>
        <div className='register-box'>
            <h1>Register Page</h1>

            
            {/* -----------name input--------------- */}
            
            {errors.name ? <label className='error-message'>{errors.name}</label> : <label htmlFor="name">Name</label>}
            <input 
              type="text" 
              id="name"
              name='name'
              value={registerData.name}
              onChange={handleChange}
              placeholder='eg., Harry Potter'
              required
            />

            {/* -----------age input------------------ */}

            {errors.age ? <label className='error-message'>{errors.age}</label> : <label htmlFor="age">Age</label>}
            <select 
              id="age" 
              value={registerData.age} 
              onChange={handleChange}>
              {/* <option value="">-- Select Age --</option>
                {Array.from({ length: 48 }, (_, i) => i + 18).map((num) => (
              <option key={num} value={num}>{num}</option> */}
              <option value="">-- Select Age Group --</option>
              <option value="18-25">18–25</option>
              <option value="26-35">26–35</option>
              <option value="36-45">36–45</option>
              <option value="46+">46 and above</option>
            ))
            </select>

            {/* --------------mobile input----------------- */}

            {errors.mobile ? <label className='error-message'>{errors.mobile}</label> : <label htmlFor="mobile">Mobile Number</label>}
            <input
              type="tel" 
              id='mobile'
              name='mobile'
              value={registerData.mobile}
              onChange={
                (e) => {
                  const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) {
                      handleChange(e);
                  }
                }
              }
              placeholder='eg., 9876543210'
              required
            />

            {/* ------------email input------------------- */}
            
            {errors.email ? <label className='error-message'>{errors.email}</label> : <label htmlFor="email">Email Id</label>}
            <input 
              type="email" 
              id='email'
              name='email'
              value={registerData.email}
              onChange={handleChange}
              placeholder='Enter your valid email'
              required
            />

              {/* ------------adhaar input---------------- */}

            {errors.adhaar ? <label className='error-message'>{errors.adhaar}</label> : <label htmlFor="adhaar">Adhaar Number</label>}
            <input 
              type="adhaar" 
              id='adhaar'
              name='adhaar'
              value={registerData.adhaar}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,12}$/.test(value)) {
                  handleChange(e);
                }
              }}
              placeholder='eg., 777766665555'
              required
            />

            {/* ------------------address input--------------- */}

            {errors.address ? <label className='error-message'>{errors.address}</label> : <label htmlFor="address">Address</label>}
            <textarea 
              id="address" 
              name='address'
              rows="4"
              value={registerData.address}
              onChange={handleChange}
              placeholder='Door No, Street, City, State, Pin No.'
            />

            {/* ------------------gender input------------------ */}
            {/* {errors.gender && <label className='error-message'>{errors.gender}</label>} */}
            <div className='gender-input'>
              <div>
                <input 
                  type="radio" 
                  id='male' 
                  name='gender' 
                  value='male'
                  onChange={handleChange}
                  checked={registerData.gender === "male"}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div>
                <input 
                  type="radio" 
                  id='female' 
                  name='gender'
                  value='female'
                  onChange={handleChange}
                  checked={registerData.gender === "female"}
                />
                <label htmlFor="female">Female</label>
              </div> 

            </div>

            <button 
              onClick={handleSubmit}
              disabled={ 
                !registerData.name ||
                !registerData.age ||
                !registerData.mobile ||
                !registerData.email ||
                !registerData.adhaar ||
                !registerData.address ||
                !registerData.gender
              }
            >Submit</button>
        </div>
    {
      userDetails && <div className='userDetail-display'>
        <div className='popup-box' style={{background:"white"}}>
          {/* <h1 className='email-logo'>{emailLogo}</h1> */}
          <h2>Registration Successfull</h2>
          <h3>Your Details:</h3>
          <h4>Name : {registerData.name}</h4>
          <h4>Age : {registerData.age}</h4>
          <h4>Gender : {registerData.gender}</h4>
          <h4>Mobile : {registerData.mobile}</h4>
          <h4>Email : {registerData.email}</h4>
          <h4>Adhaar : {registerData.adhaar}</h4>
          <h4>Address : {registerData.address}</h4>
        </div>
      </div>
    }
    </div>
    </>
  )
}
