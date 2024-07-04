import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import { Router } from 'next/router';

const NewTicket = () => {
  const [price, setPrice] = useState();
  const [title, setTitle] = useState();

  const { doRequest, errors } = useRequest({
    url: '/api/ticket',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: (ticket) => Router.push('/'),
  });

  const onSubmit = (e) => {
    e.preventDefault();
    doRequest();
  };

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {errors}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
export default NewTicket;
