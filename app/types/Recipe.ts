import { Item } from "./Item";

export type Recipe = {
  recipe_id: string;
  result_item: Item;
  ingredients: Item[];
  crafting_station: string;
};

