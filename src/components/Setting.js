// Settings.js
import React, { useState } from 'react';

const Settings = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    // Logic to save settings (e.g., API call)
    console.log("Settings saved:", { email, password });
  };

  return (
    <div>
      <h1>Settings</h1>
      <form onSubmit={handleSave}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default Settings;
