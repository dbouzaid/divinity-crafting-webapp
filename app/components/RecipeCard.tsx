import { Recipe } from "../types/Recipe";
import { Item } from "../types/Item";
import Link from "next/link";
import Image from "next/image";
import ItemCard from "./ItemCard";

type RecipeCardProps = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {

  const { result_item: resultItem, ingredients: recipeIngredients } = recipe;
    
  return (
    <div className="border dark:border-gray-700 dark:bg-gray-800 bg-slate-400 border-slate-500 p-4 mb-4">
      <div className="flex items-center mb-2">
        
          <Image
            src={`/items/${resultItem.id}.webp`}
            alt={resultItem.name}
            width={75}
            height={75}
            unoptimized
            className="mr-4 h-full bg-gray-700 text-white"
          />
        <h3 className="text-xl font-semibold text-black dark:text-white">
          <Link href={`/items/${resultItem.id}`} className="hover:underline">
            {resultItem ? resultItem.name : "Unknown Result"}
          </Link>
        </h3>
      </div>
      <div className="mb-2">
        <p className="dark:text-gray-300 text-slate-800 font-semibold mb-2">Ingredients:{" "}</p>
        <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col gap-2">
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
