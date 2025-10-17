import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-family": [
        "font-sans",
        // Poppins fonts
        "font-poppins-bold",
        "font-poppins-italic",
        "font-poppins-medium",
        "font-poppins-regular",
        // RecoletaAlt fonts
        "font-recoleta-semibold",
        "font-recoleta-bold",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
