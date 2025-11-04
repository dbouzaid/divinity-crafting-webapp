import Image from "next/image";
import { Item } from "../types/Item";
import Link from "next/link";

type ItemCardProps = {
  item: Item;
};

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <Link href={`/items/${item.id}`}>
      <div className="border-1 dark:border-gray-950 dark:bg-gray-900 gap-2 flex items-center hover:bg-gray-700 transition-colors duration-200">
        <Image
                    src={`/items/${item.id}.webp`}
                    alt={item.name}
                    width={43}
                    height={43}
                    unoptimized
                    className="m-2 h-full"
                  />
        <span className="text-white">{item.name}</span>
      </div>
    </Link>
  );
}
