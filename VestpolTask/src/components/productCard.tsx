import React from "react";
import type { Product } from "../types/Product";
import { AiTwotoneExclamationCircle } from "react-icons/ai";

type ProductCardProps = {
  product: Product;
  compareList: Product[];
  onCompareToggle: (product: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  compareList,
  onCompareToggle,
}) => {
  const inCompare = compareList.find((p) => p.id === product.id);

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition p-4 relative">
      <div className="absolute top-2 right-2">
        <div className="group">
          <AiTwotoneExclamationCircle
            className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer"
            fill="black"
          />
          <div className="absolute right-0 top-8 w-56 bg-gray-800 text-white text-sm p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            {product.description}
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-xl">{product.name}</h3>
      <p>{product.category}</p>
      <img
        src={"/public/images/camera.png"}
        alt={product.name}
        className="rounded-lg mb-3 h-40 object-cover mx-auto"
      />
      <p className="font-bold">{product.price} Kr.</p>
      <p className="text-yellow-500 text-sm">⭐ {product.rating}</p>
      <p className={`${product.inStock ? "text-green-500" : "text-red-500"}`}>
        {product.inStock ? "In Stock" : "Out of Stock"}
      </p>
      <button
        onClick={() => onCompareToggle(product)}
        className={`mx-auto px-4 py-2 mt-2 rounded-md text-white ${
          inCompare
            ? "!bg-red-400 hover:!bg-red-500"
            : "!bg-blue-400 hover:!bg-blue-500"
        }`}
      >
        {inCompare ? "Remove from compare" : "Add to compare"}
      </button>
    </div>
  );
};

export default ProductCard;
