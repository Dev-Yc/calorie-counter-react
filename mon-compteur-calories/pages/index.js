import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:5000/products');
    const today = new Date().toISOString().split('T')[0];
  
    const todaysProducts = response.data.filter(product => product.date === today);
  
    setProducts(todaysProducts);
    setTotalCalories(todaysProducts.reduce((sum, product) => sum + parseInt(product.calories), 0));
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
      date: new Date().toISOString().split('T')[0],
    };
    await axios.post('http://localhost:5000/products', newProduct);
    fetchProducts();
  };

  const editProduct = (product) => {
    setEditingProduct(product);
  };

  const updateProduct = async (event) => {
    event.preventDefault();
    const updatedProduct = {
      ...editingProduct,
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
      <h2>Total des calories aujourd'hui : {totalCalories}</h2>
      <form onSubmit={editingProduct ? updateProduct : addProduct} className="product-form">
      <input type="text" placeholder="Nom du produit" defaultValue={editingProduct?.name} />
        <input type="number" placeholder="Calories" defaultValue={editingProduct?.calories} />
        <input type="number" placeholder="Matières grasses (g)" defaultValue={editingProduct?.fats} />
        <input type="number" placeholder="Glucides (g)" defaultValue={editingProduct?.carbs} />
        <input type="number" placeholder="Protéines (g)" defaultValue={editingProduct?.proteins} />
        <input type="number" placeholder="Fibres alimentaires (g)" defaultValue={editingProduct?.fibers} />
        <input type="number" placeholder="Poids (g)" defaultValue={editingProduct?.weight} />
        <button type="submit">{editingProduct ? 'Mettre à jour' : 'Ajouter'}</button>
        <button type="submit">{editingProduct ? 'Mettre à jour' : 'Ajouter'}</button>
      </form>
      <div className="card-container">
        {products.map((product, index) => (
          <div key={index} className="card">
      <div className="card-title">{product.name}</div>
      <div className="card-details">
        <div className="card-detail">Calories: {product.calories}</div>
        <div className="card-detail">Fats: {product.fats}</div>
        <div className="card-detail">Carbs: {product.carbs}</div>
        <div className="card-detail">Proteins: {product.proteins}</div>
        <div className="card-detail">Fibers: {product.fibers}</div>
        <div className="card-detail">Weight: {product.weight}</div>
      </div>
            <button className="card-button" onClick={() => editProduct(product)}>Modifier</button>
            <button className="card-button" onClick={() => deleteProduct(product.id)}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

