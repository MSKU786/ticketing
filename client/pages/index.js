import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h2>Hello This is first page</h2>;
};

LandingPage.getInitialProps = async () => {
  if (typeof window === 'undefined') {
    // we are on the server!
    // requests should be made to http://ingress-nginx.ingress-nginx...laksdjfk
    const { data } = await axios
      .get(
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/user/currentUser',
        {
          headers: {
            Host: 'ticketing.dev',
          },
        }
      )
      .catch((err) => {
        console.log(err.response.data.error);
      });
    return data;
  } else {
    // we are on the browser!
    // requests can be made with a base url of ''
    const { data } = await axios.get('/api/user/currentUser');

    return data;
  }
  return {};
};

export default LandingPage;
