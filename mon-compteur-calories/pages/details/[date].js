import Details from '../details.js';

const DetailsPage = ({ query }) => {
  return <Details date={query.date} />;
};

DetailsPage.getInitialProps = ({ query }) => {
  return { query };
};

export default DetailsPage;
