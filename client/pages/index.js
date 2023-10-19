import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  return (
    <h2>{`Hello This is first page ${
      currentUser ? JSON.stringify(currentUser) : 'not signed in broooooo'
    }`}</h2>
  );
};

LandingPage.getInitialProps = async (context) => {
  console.log('not even getting used now');
  const { data } = await buildClient(context).get('/api/user/currentUser');
  return data;
};

export default LandingPage;
