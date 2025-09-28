import React,{useState} from 'react';
import './loginPage.css';

const LoginPage =()=>{
  const[userName,setUserName] = useState('');
  const[password,setPassword] = useState('');

  const handleSubmit = async(event) =>{
        // a. Prevent the default form submission behavior (which causes a page reload).
      event.preventDefault();

       console.log('Attempting to log in with:');
    console.log('Username:', userName);
    console.log('Password:', password);

  };
  return(
    <div className="login-page">
      <h2>Admin login</h2>
      <form onSubmit = {handleSubmit} className="login=form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your Username"
            value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required 
                        /></div>
                        <div className="foem-group">
                            <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            // The input's value is controlled by the 'password' state variable.
            value={password}
            // The 'onChange' handler updates the state.
            onChange={(e) => setPassword(e.target.value)}
            required
          /></div> 
          <button type="submit" className="login-button">Login</button>

      </form>
    </div>
  );
};

export default LoginPage;