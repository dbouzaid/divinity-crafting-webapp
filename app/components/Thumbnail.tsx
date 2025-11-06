import Image from "next/image";

interface ThumbnailProps {
  id: string;
  name: string;
  width: number;
  height: number;
}

export default function Thumbnail({ id, name, width, height }: ThumbnailProps) {
  return (
    <Image
      src={`/items/${id}.webp`}
      alt={name}
      width={width}
      height={height}
      unoptimized
      className="h-full dark:bg-gray-900 dark:text-white text-black bg-slate-200"
    />
  );
}
