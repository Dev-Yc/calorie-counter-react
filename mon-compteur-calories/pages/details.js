import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Details = ({ date }) => {
  const [products, setProducts] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    const response = await axios.get(`http://localhost:5000/products?date=${date}`);
    const productsData = response.data;
    setProducts(productsData);

    const sumCalories = productsData.reduce((sum, product) => sum + parseInt(product.calories), 0);
    setTotalCalories(sumCalories);
  };

  return (
    <div className="details-container">
      <h1>Détails pour {date}</h1>
      <h2>Total des calories : {totalCalories}</h2>
      <Link href="/history">Retour à l'historique</Link>
      <div className="details-cards">
        {products.map((product, index) => (
          <div key={index} className="details-card">
            <h2>{product.name}</h2>
            <p>Calories: {product.calories}</p>
            <p>Matières grasses: {product.fats}g</p>
            <p>Glucides: {product.carbs}g</p>
            <p>Protéines: {product.proteins}g</p>
            <p>Fibres alimentaires: {product.fibers}g</p>
            <p>Poids: {product.weight}g</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
