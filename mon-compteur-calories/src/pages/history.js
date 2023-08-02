import axios from "axios";
import { useEffect, useState } from "react";

const History = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get('http://localhost:5000/products');
    setProducts(response.data);
  };

  return (
    <div>
      <h1>Historique des calories consommées</h1>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.date}</p>
          <p>Calories: {product.calories}</p>
        </div>
      ))}
    </div>
  );
};

export default History;
