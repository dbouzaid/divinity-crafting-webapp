"use client";

import { useState } from "react";
import { Item } from "../types/Item";
import ItemCard from "./ItemCard";
import { Recipe } from "../types/Recipe";

interface ItemCategoryContainerProps {
  categoryName: string;
  items: Item[];
}

const ItemCategoryContainer: React.FC<ItemCategoryContainerProps> = ({
  categoryName,
  items,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-700 mb-4 bg-gray-800">
      <button
        className="w-full flex justify-between items-center p-4 bg-gray-700 cursor-pointer focus:outline-none"
        onClick={toggleAccordion}
      >
        <h2 className="text-xl font-semibold text-white">{categoryName}</h2>
        <svg
          className={`w-6 h-6 text-white transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => {
            item.imageUri =
              "https://placehold.co/32x32/030712/FFFFFF?text=" +
              item.name.slice(0, 2);
            return <ItemCard key={item.id} item={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ItemCategoryContainer;
