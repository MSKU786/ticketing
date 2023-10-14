import { useState, useEffect } from 'react';
import axios from 'axios';
export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    console.log(email, password);

    const res = await axios.post('/api/user/signup', {
      email,
      password,
    });

    console.log(res.data);
  };

  return (
    <form onSubmit={submit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
