import React, { useState } from 'react';
import { loginUser } from '../../API/server';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    
    let res = await loginUser({ email, password });
    if (!res.ok) return res?.message;

    // Save token to localStorage
    localStorage.setItem("token", JSON.stringify(res?.data?.token));
    
    console.log(res, "logindata");
    
    // Navigate to /createcourse after successful login
    navigate('/home');
  };

  return (
    <form>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </form>
  );
};

export default LoginForm;
