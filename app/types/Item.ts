import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type Item = {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  imageUri?: string | StaticImport;
  consumeEffect?: string;
};
