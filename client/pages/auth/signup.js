import { useState, useEffect } from 'react';
import axios from 'axios';
export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const submit = async (event) => {
    event.preventDefault();
    console.log(email, password);

    try {
      const res = await axios.post('/api/user/signup', {
        email,
        password,
      });
    } catch (e) {
      setErrors(e.response.data.errors);
    }
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
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <h4>Oops!!</h4>
          <ul className="my-0">
            {errors.map((e) => (
              <li key={e.message}>{e.message}</li>
            ))}
          </ul>
        </div>
      )}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
