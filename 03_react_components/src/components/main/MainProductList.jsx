const MainProductList = () => {
  const products = ["商品01", "商品02", "商品03", "商品04"];

  return (
    <>
      <h2>商品列表</h2>
      <ul>
        {products.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default MainProductList;
