import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h2>Hello This is first page</h2>;
};

LandingPage.getInitialProps = async () => {
  const res = await axios.get('/api/user/currentUser');
  console.log(res.data);
  return res.data;
};

export default LandingPage;
