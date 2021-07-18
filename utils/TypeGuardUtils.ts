import Coffee from "../models/Coffee";

const isCoffee = (item: unknown): item is Coffee => {
  const target = item as Coffee;

  return (
    "title" in target &&
    typeof target.title === "string" &&
    !!target.title &&
    "origin" in target &&
    typeof target.origin === "string" &&
    !!target.origin 
  );
};

export { isCoffee };