import recipes from "@/app/api/recipes.json";
import RecipeCard from "@/app/components/RecipeCard";
import { Item } from "@/app/types/Item";
import { Recipe } from "@/app/types/Recipe";
import Link from "next/link";
import Image from "next/image";
import Thumbnail from "@/app/components/Thumbnail";

type ItemPageProps = {
  params: {
    itemId: string;
  };
};


const getAllItems = (): Item[] => {
  const allItems = new Map<string, Item>();
  (recipes as Recipe[]).forEach((recipe) => {
    if (!allItems.has(recipe.result_item.id)) {
      allItems.set(recipe.result_item.id, recipe.result_item);
    }
    recipe.ingredients.forEach((ingredient) => {
      if (!allItems.has(ingredient.id)) {
        allItems.set(ingredient.id, ingredient);
      }
    });
  });
  return Array.from(allItems.values());
};

const allItems = getAllItems();

const fetchItem = (id: string): Item | undefined => {
  return allItems.find((item) => item.id === id);
};

const fetchRecipesThatCraftItem = (itemId: string): Recipe[] => {
  return (recipes as Recipe[]).filter((recipe) => recipe.result_item.id === itemId);
};

const fetchRecipesThatUseItem = (itemId: string): Recipe[] => {
  return (recipes as Recipe[]).filter((recipe) =>
    recipe.ingredients.some(ingredient => ingredient.id === itemId)
  );
};

export default async function ItemPage({ params }: ItemPageProps) {
    const {itemId} = await params;

  const item = fetchItem(itemId);
  const recipesUsedIn = fetchRecipesThatUseItem(itemId);
  const recipesProductOf = fetchRecipesThatCraftItem(itemId);

  if (!item) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl mb-4">Item not found</h1>
        <Link href="/items" className="text-blue-500 hover:underline">
          &larr; Back to Items
        </Link>
      </main>
    );
  }

  function generateItemCards(recipes: Recipe[], title: string){
    return (
        <div className="border dark:border-gray-700 dark:bg-gray-800 bg-slate-400 border-slate-500 p-4 mb-4">
            <h2 className="text-2xl font-semibold mb-4 mt-8">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recipes.map((recipe) => {
            return <RecipeCard key={recipe.recipe_id} recipe={recipe}/>;
            })}
            </div>
        </div>
    )
}


  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/items" className="text-slate-800 dark:text-slate-100 hover:underline">
          &larr; Back to Items
        </Link>
      </div>
      <div className="flex justify-between mb-2 align items-center">
          <div>
              <h1 className="text-4xl font-bold mb-2">{item.name}</h1>
              <p className="text-lg font-semibold text-slate-800 dark:text-gray-400 mb-4">Category: {item.category}</p>
          </div>
          <Thumbnail id={item.id} name={item.name} width={100} height={100}/>
      </div>
      <div className="border dark:border-gray-700 dark:bg-gray-800 bg-slate-400 border-slate-500 p-4 mb-4">
        <p className="mb-4">{item.description}</p>
        {item.consumeEffect && (
          <>
            <p className="mb-4">Consume Effect:</p>
            <p className="mb-4">{item.consumeEffect}</p>
          </>
        )}
        <p className="text-right dark:text-white text-black font-semibold">Base Price: {item.basePrice}</p>
      </div>
      
        <div className="mt-8">
          {recipesProductOf.length > 0 && generateItemCards(recipesProductOf, "Product of")}
          {recipesUsedIn.length > 0 && generateItemCards(recipesUsedIn, "Used in")}
        </div>
    </main>
  );
}
