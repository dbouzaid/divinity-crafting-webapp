import recipes from "@/app/api/recipes.json";
import RecipeCard from "@/app/components/RecipeCard";
import { Item } from "@/app/types/Item";
import { Recipe } from "@/app/types/Recipe";
import Link from "next/link";
import Image from "next/image";

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
        <>
            <h2 className="text-2xl font-semibold mb-4 mt-8">{title}</h2>
            {recipes.map((recipe) => {
            return <RecipeCard key={recipe.recipe_id} recipe={recipe}/>;
            })}
        </>
    )
}


  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/items" className="text-blue-500 hover:underline">
          &larr; Back to Items
        </Link>
      </div>
      <div className="flex justify-between mb-2 align items-center">
          <div>
              <h1 className="text-4xl font-bold mb-2">{item.name}</h1>
              <p className="text-lg text-gray-400 mb-4">Category: {item.category}</p>
          </div>
          <Image
                      src={`/items/${item.id}.webp`}
                      alt={item.name}
                      width={75}
                      height={75}
                      unoptimized
                      className="h-full "
                    />
      </div>
      <div className="bg-gray-800 p-6">
        <p className="mb-4">{item.description}</p>
        {item.consumeEffect && (
          <>
            <p className="mb-4">Consume Effect:</p>
            <p className="mb-4">{item.consumeEffect}</p>
          </>
        )}
        <p className="text-right font-semibold">Base Price: {item.basePrice}</p>
      </div>
      
        <div className="mt-8">
          {recipesProductOf.length > 0 && generateItemCards(recipesProductOf, "Product of")}
          {recipesUsedIn.length > 0 && generateItemCards(recipesUsedIn, "Used in")}
        </div>
    </main>
  );
}
