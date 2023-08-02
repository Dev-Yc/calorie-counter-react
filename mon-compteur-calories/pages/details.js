import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Details = () => {
  const router = useRouter();
  const { date } = router.query; // Extraire la date de l'URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (date) fetchProducts(); 
  }, [date]);

  const fetchProducts = async () => {
    const response = await axios.get(`http://localhost:5000/products?date=${date}`);
    setProducts(response.data);
  };

  return (
    <div>
      <h1>Détails pour {date}</h1>
      <Link href="/history">Revenir à l'historique</Link>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name}: {product.calories} calories

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Details;
