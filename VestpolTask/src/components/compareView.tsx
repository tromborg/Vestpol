import React from "react";
import type { Product } from "../types/Product";
type CompareSectionProps = {
  compareList: Product[];
};

const CompareView: React.FC<CompareSectionProps> = ({ compareList }) => {
  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-2">Compare Products</h2>
      <div className="flex gap-4 justify-center">
        {compareList.map((p) => (
          <div
            key={p.id}
            className="min-w-[250px] bg-gray-100 rounded-lg p-3 shadow-sm flex gap-3 items-center"
          >
            <img
              src={"public/images/camera.png"}
              alt={p.name}
              className="w-24 h-24 object-contain rounded-lg bg-white flex-shrink-0"
            />
            <div className="flex flex-col">
              <h3 className="font-bold">{p.name}</h3>
              <p className="text-gray-600">{p.category}</p>
              <p className="font-semibold">{p.price} kr.</p>
              <p className="text-yellow-500">⭐ {p.rating}</p>
              <div className=" w-full">
                <h4 className="font-semibold mb-1">Specs</h4>
                <ul className="text-sm">
                  {Object.entries(p.specs).map(([key, value]) => (
                    <li key={key} className="flex justify-between">
                      <span className="capitalize">{key}:</span>
                      <span>
                        {Array.isArray(value) ? value.join(", ") : value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompareView;
