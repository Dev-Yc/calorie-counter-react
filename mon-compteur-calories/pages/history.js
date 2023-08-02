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
    <div className="history-container">
      <h1>Historique</h1>
      <div className="history-cards">
        {history.map((day, index) => (
          <div key={index} className="history-card">
            <h2>{day.date}: {day.totalCalories} calories</h2>
            <Link href={`/details/${day.date}`} className="details-button">
              Voir les détails
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
