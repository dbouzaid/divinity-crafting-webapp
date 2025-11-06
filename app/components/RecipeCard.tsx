import { Recipe } from "../types/Recipe";
import { Item } from "../types/Item";
import Link from "next/link";
import Image from "next/image";
import ItemCard from "./ItemCard";
import Thumbnail from "./Thumbnail";

type RecipeCardProps = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {

  const { result_item: resultItem, ingredients: recipeIngredients } = recipe;
    
  return (
    <div className="border dark:border-gray-800 dark:bg-slate-900 bg-slate-400 border-slate-500 p-4 mb-4">
      <div className="flex items-center mb-2 justify-between">
        <h3 className="text-xl font-semibold text-black dark:text-white">
          <Link href={`/items/${resultItem.id}`} className="hover:underline">
            {resultItem ? resultItem.name : "Unknown Result"}
          </Link>
        </h3>
          <Thumbnail
            id={resultItem.id}
            name={resultItem.name}
            width={75}
            height={75}
          />
        
      </div>
      <div className="mb-2">
        <p className="dark:text-gray-300 text-slate-800 font-semibold mb-2">Ingredients:{" "}</p>
        <div className="w-full flex flex-col gap-2">
            {recipe.ingredients
              .map((ingredient) => <ItemCard key={ingredient.id} item={ingredient}/>)
            }
        </div>
      </div>
      {recipe.crafting_station && (
        <p className="dark:text-gray-300 text-slate-800 font-semibold">
          Crafting Tool: {recipe.crafting_station}
        </p>
      )}
    </div>
  );
}
