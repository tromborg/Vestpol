import { useState } from "react";
import "./App.css";
import productsData from "./data/products.json";
import ProductCard from "./components/productCard";
import CompareView from "./components/compareView";
import type { Product } from "./types/Product";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const [compareList, setCompareList] = useState<Product[]>([]);

  const products: Product[] = productsData;

  const addRemoveCompareList = (product: Product) => {
    setCompareList((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const filteredProducts = products
    .filter(
      (p: Product) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p: Product) =>
      category === "All" ? true : p.category === category
    )
    .filter(
      (p: Product) =>
        (minPrice === "" || p.price >= Number(minPrice)) &&
        (maxPrice === "" || p.price <= Number(maxPrice))
    )
    .filter((p: Product) =>
      minRating === "" ? true : p.rating >= Number(minRating)
    )
    .filter((p: Product) => (inStockOnly ? p.inStock : true))
    .sort((a: Product, b: Product) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-dec") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      return 0;
    });

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("");
    setMinPrice("");
    setMaxPrice("");
    setMinRating("");
    setInStockOnly(false);
  };

  return (
    <div className=" flex gap-6">
      <aside className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-sm h-fit min-w-2/12 justify-center h-fit sticky top-4">
        <h2 className="font-semibold">Filters</h2>
        <label className="block font-medium mb-1">Categories</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border w-full border-gray-300 px-4 py-2 mb-1 rounded-md shadow:md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Categories</option>
          <option value="Audio">Audio</option>
          <option value="Power">Power</option>
          <option value="Home">Home</option>
          <option value="Peripherals">Peripherals</option>
        </select>
        <label className="block font-medium mb-1">Min. rating</label>
        <input
          type="number"
          placeholder="Min rating"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <div className="mb-4">
          <label className="block font-medium mb-1">Price range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2 border border-gray-300 px-2 py-1 rounded-md"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2 border border-gray-300 px-2 py-1 rounded-md"
            />
          </div>
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
          />
          In Stock Only
        </label>
        <button
          className="mt-6 !bg-blue-400 hover:!bg-blue-500 text-white font-semibold py-2 px-4 rounded-md transition sticky bottom-4"
          onClick={resetFilters}
        >
          Reset filters
        </button>
      </aside>
      <main className="flex-1 min-h-screen min-w-5xl bg-gray-50 p-4 rounded-lg ">
        <h1 className="font-bold mb-4">Product List</h1>
        <div className="flex justify-between w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name/description"
            className="border border-gray-300 px-4 py-2 mb-4 rounded-md shadow:md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 px-4 py-2 mb-4 rounded-md shadow:md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">No sorting</option>
              <option value="price-asc">Price (Low → High)</option>
              <option value="price-dec">Price (High → Low)</option>
              <option value="rating">Rating (High → Low)</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                compareList={compareList}
                onCompareToggle={addRemoveCompareList}
              />
            ))}
          </div>
        ) : (
          <h3 className="text-red-500">No results</h3>
        )}
      </main>

      {compareList.length > 0 && (
        <div className="fixed bottom-0 bg-white left-0 right-0 shadow-lg p-4 border-t overflow-x-auto">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            Compare Products
          </h2>
          <div className="flex gap-4 justify-center">
            {compareList.map((p) => (
              <CompareView key={p.id} compareList={compareList} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
