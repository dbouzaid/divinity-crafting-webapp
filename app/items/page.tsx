"use client";
import items from "../api/items.json";
import React, { Suspense, use, useState } from "react";
import { Item } from "../types/Item";
import ItemCategoryContainer from "../components/ItemCategoryContainer";
import FilterQueryBox from "../components/FilterQueryBox";

const fetchItems = (): Item[] => {
  return items;
};

export default function Items() {
  const itemList: Item[] = fetchItems();
  const [filterQuery, setFilterQuery] = useState("");

  const filteredItems =
    filterQuery === ""
      ? itemList
      : itemList.filter((item) =>
          item.name.toLowerCase().includes(filterQuery.toLowerCase())
        );

  const categorisedItems = filteredItems.reduce(
    (acc: { [key: string]: Item[] }, item) => {
      const category = item.category || "Uncategorised";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    },
    {}
  );

  for (const category in categorisedItems) {
    categorisedItems[category].sort((a, b) => a.name.localeCompare(b.name));
  }


  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl mb-4 dark:text-white text-black font-bold">Items</h1>
      <Suspense fallback={<h2>Fetching Items...</h2>}>
        <FilterQueryBox setFilterQuery={setFilterQuery} filterQuery={filterQuery} />
        {Object.keys(categorisedItems)
          .sort()
          .map((category) => (
            <ItemCategoryContainer
              key={category}
              categoryName={category}
              items={categorisedItems[category]}
            />
          ))}
      </Suspense>
    </main>
  );
}
