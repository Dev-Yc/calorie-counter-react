import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Details = () => {
  const router = useRouter();
  const { date } = router.query;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (date) {
      fetchDetails();
    }
  }, [date]);

  const fetchDetails = async () => {
    const response = await axios.get(`http://localhost:5000/products?date=${date}`);
    setProducts(response.data);
  };

  return (
    <div>
      <h1>Détails pour {date}</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}: {product.calories} calories, {product.fats}g matières grasses, {product.carbs}g glucides, {product.proteins}g protéines, {product.fibers}g fibres, {product.weight}g poids
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Details;
