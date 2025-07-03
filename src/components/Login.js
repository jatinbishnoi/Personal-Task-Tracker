import React, { useState } from "react";

function Login({ onLogin }) {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    profilePic: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, username, email } = form;
    if (fullName && username && email) {
      onLogin(form);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Task Tracker</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="profilePic"
          placeholder="Profile Picture URL (optional)"
          value={form.profilePic}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
