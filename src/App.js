import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductDetails from './ProductDetails';

function Categories({ categories, onSelectCategory }) {
  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category} onClick={() => onSelectCategory(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts(selectedCategory)
      .then((products) => setProducts(products))
      .catch((error) => setError(error.message));
  }, [selectedCategory]);

  useEffect(() => {
    fetchCategories()
      .then((categories) => setCategories(categories))
      .catch((error) => setError(error.message));
  }, []);

  async function fetchCategories() {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const categories = await response.json();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  async function fetchProducts(category) {
    try {
      setLoader(true);
      let url = 'https://fakestoreapi.com/products';
      if (category) {
        url += '/category/' + category;
      }
      const response = await fetch(url);
      const products = await response.json();
      setLoader(false);
      return products;
    } catch (error) {
      throw error;
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>
      <div>
        {error && <p>Error: {error}</p>}
        <Categories categories={categories} onSelectCategory={setSelectedCategory} />

        <h1>Products</h1>
        {loader ? (
          <p>Loading your products...</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img src={product.image} alt={product.title} />
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;









































// import React, { useState, useEffect } from "react";

// export default function App() {
//   const [resourceType, setResourceType] = useState('posts')

//   useEffect(() => {
//     fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
//       .then(response => response.json())
//       .then(json => console.log(json))
//   }, [resourceType])

//   return (
//     <div>
//       <button onClick={() => setResourceType('posts')}>Posts</button>
//       <button onClick={() => setResourceType('users')}>Users</button>
//       <button onClick={() => setResourceType('comments')}>Comments</button>
//     </div>
//   );
// }





// // USE STATE EXAMPLE
// function App() {
//   const [count, setCount] = useState(4)

//   function decrementCount() {
//     setCount(prevCount => prevCount - 1)
    
//   }

//   function incrementCount() {
//     setCount(prevCount => prevCount + 1)
//   }
//   return ( 
//   <>
//     <button onClick={decrementCount} > - </button>
//      <span > {count} </span> 
//      <button onClick={incrementCount} > + </button>

//     </>
//   );
// }

// export default App;

