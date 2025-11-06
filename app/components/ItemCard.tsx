import Image from "next/image";
import { Item } from "../types/Item";
import Link from "next/link";
import Thumbnail from "./Thumbnail";

type ItemCardProps = {
  item: Item;
};

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <Link href={`/items/${item.id}`}>
      <div className=" dark:bg-slate-900 bg-slate-300 gap-2 flex items-center dark:hover:bg-slate-700 hover:bg-slate-200 transition-colors duration-200">
        <Thumbnail id={item.id} name={item.name} width={43} height={43} />
        <span className="dark:text-white text-black">{item.name}</span>
      </div>
    </Link>
  );
}
