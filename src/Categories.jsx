function Categories (categories, onSelectCategory)  {
    return (
        <div>
          <Categories categories={categories} onSelectCategory={setSelectedCategory} />
    
          <h1>Products</h1>
          <ul>
            {products.map((product) => (
              <li key={product.id}>{product.title}</li>
              
            ))} 
          </ul>
        </div>
      );
    }
export default Categories;