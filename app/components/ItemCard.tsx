import Image from "next/image";
import { Item } from "../types/Item";
import Link from "next/link";

type ItemCardProps = {
  item: Item;
};

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <Link href={`/items/${item.id}`}>
      <div className="border-1 dark:border-slate-950 border-slate-200 dark:bg-slate-900 bg-slate-300 gap-2 flex items-center dark:hover:bg-slate-700 hover:bg-slate-200 transition-colors duration-200">
        <Image
                    src={`/items/${item.id}.webp`}
                    alt={item.name}
                    width={43}
                    height={43}
                    unoptimized
                    className="m-2 h-full bg-gray-700 text-white"
                  />
        <span className="dark:text-white text-black">{item.name}</span>
      </div>
    </Link>
  );
}
