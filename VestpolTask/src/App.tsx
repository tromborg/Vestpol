import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import productsData from "./data/products.json";

type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: string;
  inStock: boolean;
  tags: string[];
  image: string;
  createdAt: string;
  description: string;
  specs: Record<string, string | number | string[] | number[] | undefined>;
};

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow hover:shadow-md transition p-4"
            >
              <h3 className="font-semibold text-xl">{p.name}</h3>
              <p>{p.category}</p>
              <img
                src="/public/images/camera.png"
                alt={p.name}
                className="rounded-lg mb-3 h-40 object-cover mx-auto"
              />

              <p className="font-bold">{p.price} Kr.</p>
              <p className="text-yellow-500 text-sm">⭐ {p.rating}</p>
              <p className={`${p.inStock ? `text-green-500` : `text-red-500`}`}>
                {p.inStock ? "In storage" : "Not in storage"}
              </p>
              <button
                onClick={() => addRemoveCompareList(p)}
                className={`mx-auto px-4 py-2 ${
                  compareList.find((c) => c.id === p.id)
                    ? `!bg-red-400 hover:!bg-red-500`
                    : `!bg-blue-400 hover:!bg-blue-500`
                }`}
              >
                {compareList.find((c) => c.id === p.id)
                  ? "Remove from compare"
                  : "Add to compare"}
              </button>
            </div>
          ))}
        </div>
      </main>
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Compare Products</h2>
          <div className="flex gap-4 overflow-x-auto justify-center">
            {compareList.length > 0 && (
              <div className="fixed bottom-0 bg-white left-0 right-0 shadow-lg p-4 border-t overflow-x-auto">
                <h2 className="mb-4 text-lg font-semibold text-gray-700">
                  Compare Products
                </h2>
                <div className="flex gap-4 justify-center">
                  {compareList.map((p) => (
                    <div
                      key={p.id}
                      className="min-w-[250px] bg-gray-100 rounded-lg p-3 shadow-sm flex gap-3 items-center"
                    >
                      <img
                        src={"/public/images/camera.png"}
                        alt={p.name}
                        className="w-24 h-24 object-contain rounded-lg bg-white flex-shrink-0"
                      />
                      <div className="flex flex-col justify-center">
                        <h3 className="font-bold">{p.name}</h3>
                        <p className="text-gray-600">{p.category}</p>
                        <p className="font-semibold">{p.price} kr.</p>
                        <p className="text-yellow-500">⭐ {p.rating}</p>
                        <p
                          className={`${
                            p.inStock ? "text-green-600" : "text-red-500"
                          }`}
                        >
                          {p.inStock ? "In Stock" : "Out of Stock"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
