import siipBite from "@/assets/nabati/siip-bite.jpeg";
import collection from "@/assets/nabati/collection.jpeg";
import nextar from "@/assets/nabati/nextar-brownies.jpeg";
import wafers from "@/assets/nabati/wafer-range.jpeg";
import richoco from "@/assets/nabati/richoco.png";
import richeese from "@/assets/nabati/richeese.png";

export const nabatiProducts = [
  { name: "SiiP Bite", detail: "CHEESE SNACKS", file: "01", src: siipBite },
  {
    name: "The Nabati Collection",
    detail: "A WORLD OF EVERYDAY FAVOURITES",
    file: "02",
    src: collection,
  },
  { name: "Nextar Brownies", detail: "CHOCO DELIGHT", file: "03", src: nextar },
  { name: "Nabati Wafers", detail: "CRUNCHY & CREAMY DELIGHTS", file: "04", src: wafers },
  { name: "Richoco", detail: "CHOCOLATE CREAM WAFERS", file: "05", src: richoco },
  { name: "Richeese", detail: "CHEESE CREAM WAFERS", file: "06", src: richeese },
];

export const nabatiCollectionImage = nabatiProducts[1].src;
