import { useEffect, useState } from "react";
import DropDownFilter from "./DropDownFilter";
const FilterProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    const url = "https://api.escuelajs.co/api/v1/products";
    const fetchData = async () => {
      try {
        const res = await fetch(url, { cache: "force-cache" });
        if (!res.ok) {
          return "Error in fetching data";
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log("fetch error: ", error);
      }
    };
    fetchData();
  }, []);

  const filtredProduct = products.filter(prod=>{
    const matchedCategory = selectedCategory === "All" || prod.category.name === selectedCategory
    return matchedCategory
  })

   return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
  <div className="max-w-7xl mx-auto">
    {/* Page Header */}
    <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
      Our Products
    </h1>

    {/* Filter Section */}
    <DropDownFilter products={products} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
    {/* Product Grid */}
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {filtredProduct.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
        >
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-56 w-full object-cover"
          />

          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {product.title}
            </h2>
            <p className="text-gray-600 mt-2">
              {product.description.slice(0, 100)}...
            </p>

            <div className="flex items-center justify-between mt-6">
              <span className="text-xl font-bold text-indigo-600">
                {product.price}
              </span>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
  );
};

export default FilterProducts;
