"use client";

import React, { use, Suspense, useState } from "react";
import FilterQueryBox from "./FilterQueryBox";
import ItemCard from "./ItemCard";
import { Item } from "../types/Item";

type FilterableItemListProps = {
  itemList: Item[];
};

export default function FilterableIngredientsList({
  itemList,
}: FilterableItemListProps) {
  const [filterQuery, setFilterQuery] = useState("");

  const filteredItemList = itemList.filter((item) =>
    item.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <>
      <FilterQueryBox
        setFilterQuery={setFilterQuery}
        filterQuery={filterQuery}
      />
      <Suspense fallback={<h2>Fetching Ingredients...</h2>}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {filteredItemList.map((item) => {

          item.imageUri = 
                "https://placehold.co/32x32/ffcccc/990000?text=" +
                item.name.slice(0, 2);
          return (
            <ItemCard
              key={item.id}
              item={item}
            />
          );
        })}
        </div>
      </Suspense>
    </>
  );
}
