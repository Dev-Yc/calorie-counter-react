import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const response = await axios.get('http://localhost:5000/products');
    const products = response.data;

    // Regrouper les produits par date et calculer le total des calories
    const groupedProducts = products.reduce((acc, product) => {
      const date = product.date;
      if (!acc[date]) {
        acc[date] = {
          date: date,
          totalCalories: 0,
          products: [],
        };
      }

      acc[date].totalCalories += parseInt(product.calories);
      acc[date].products.push(product);

      return acc;
    }, {});

    setHistory(Object.values(groupedProducts));
  };

  return (
    <div>
      <h1>Historique</h1>
      <Link href="/">Revenir à l'accueil</Link>
      <ul>
        {history.map((day, index) => (
          <li key={index}>
            {day.date}: {day.totalCalories} calories
            <Link href={`/details/${day.date}`}>Voir les détails</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
