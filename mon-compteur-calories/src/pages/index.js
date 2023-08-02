import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    // Charger les produits depuis l'API au démarrage
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:5000/products');
    setProducts(response.data);
    setTotalCalories(response.data.reduce((sum, product) => sum + parseInt(product.calories), 0));
  };

  const addProduct = async (event) => {
    event.preventDefault();
    const newProduct = {
      name: event.target[0].value,
      calories: event.target[1].value,
      fats: event.target[2].value,
      carbs: event.target[3].value,
      proteins: event.target[4].value,
      fibers: event.target[5].value,
      weight: event.target[6].value,
    };
    await axios.post('http://localhost:5000/products', newProduct);
    fetchProducts();
  };

  const updateProduct = async (event) => {
    event.preventDefault();
    const updatedProduct = {
      name: event.target[0].value,
      calories: event.target[1].value,
      fats: event.target[2].value,
      carbs: event.target[3].value,
      proteins: event.target[4].value,
      fibers: event.target[5].value,
      weight: event.target[6].value,
    };
    await axios.put(`http://localhost:5000/products/${editingProduct.id}`, updatedProduct);
    setEditingProduct(null);
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    fetchProducts();
  };

  return (
    <div>
      <h1>Compteur de calories</h1>
      <Link href="/history">Voir l'historique</Link>
      <h2>Total des calories aujourd'hui : {totalCalories}</h2>
      <form onSubmit={editingProduct ? updateProduct : addProduct}>
        <input type="text" placeholder="Nom du produit" defaultValue={editingProduct?.name} />
        <input type="number" placeholder="Calories" defaultValue={editingProduct?.calories} />
        <input type="number" placeholder="Matières grasses (g)" defaultValue={editingProduct?.fats} />
        <input type="number" placeholder="Glucides (g)" defaultValue={editingProduct?.carbs} />
        <input type="number" placeholder="Protéines (g)" defaultValue={editingProduct?.proteins} />
        <input type="number" placeholder="Fibres alimentaires (g)" defaultValue={editingProduct?.fibers} />
        <input type="number" placeholder="Poids (g)" defaultValue={editingProduct?.weight} />
        <button type="submit">{editingProduct ? 'Mettre à jour' : 'Ajouter'}</button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}: {product.calories} calories, {product.fats}g matières grasses, {product.carbs}g glucides, {product.proteins}g protéines, {product.fibers}g fibres, {product.weight}g poids
            <button onClick={() => setEditingProduct(product)}>Modifier</button>
            <button onClick={() => deleteProduct(product.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
