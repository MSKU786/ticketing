const OrderIndex = () => {
  return <div>OrderIndex</div>;
};

OrderIndex.getInitialProps = async (context, client) => {
  const data = await client.get('/api/orders');
  return { order: data };
};
export default OrderIndex;
