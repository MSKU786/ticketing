const LandingPage = ({ currentUser }) => {
  return (
    <h2>{`Hello This is first page ${
      currentUser ? JSON.stringify(currentUser) : 'not signed in broooooo'
    }`}</h2>
  );
};

LandingPage.getInitialProps = async (context) => {
  return {};
};

export default LandingPage;
